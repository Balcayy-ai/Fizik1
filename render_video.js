const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function render() {
  const outDir = path.join(__dirname, 'out');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const htmlPath = 'file:///' + path.join(__dirname, 'video.html').replace(/\\/g, '/') + '?headless=1';

  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  console.log('Loading video.html...');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Wait for Google fonts to load
  await page.evaluateHandle('document.fonts.ready');
  console.log('Fonts ready. Taking sample preview frames...');

  // 1. Capture sample keyframes for visual verification
  const previewTimes = [2.0, 7.0, 12.0, 17.5, 22.0];
  for (let i = 0; i < previewTimes.length; i++) {
    const t = previewTimes[i];
    await page.evaluate((time) => window.seek(time), t);
    const buf = await page.screenshot({ type: 'png' });
    const pPath = path.join(outDir, `preview_scene_${i + 1}_${t}s.png`);
    fs.writeFileSync(pPath, buf);
    console.log(`Saved keyframe: ${pPath}`);
  }

  // 2. Render entire 24 seconds at 30 fps (720 frames total)
  const fps = 30;
  const duration = 24.0;
  const totalFrames = Math.floor(duration * fps);
  const mp4Path = path.join(outDir, 'final.mp4');

  const soundtrackPath = path.join(outDir, 'soundtrack.wav');
  console.log(`Starting MP4 render with audio: ${totalFrames} frames -> ${mp4Path}`);

  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(fps),
    '-i', '-',
    '-i', soundtrackPath,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '18',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    mp4Path
  ]);

  ffmpeg.stderr.on('data', (d) => {
    // console.log(d.toString());
  });

  let ffmpegErr = null;
  ffmpeg.on('error', (err) => { ffmpegErr = err; });

  for (let f = 0; f < totalFrames; f++) {
    const t = f / fps;
    await page.evaluate((time) => window.seek(time), t);
    const frameBuf = await page.screenshot({ type: 'png' });

    // write to ffmpeg stdin
    const ok = ffmpeg.stdin.write(frameBuf);
    if (!ok) {
      await new Promise((res) => ffmpeg.stdin.once('drain', res));
    }

    if (f % 60 === 0 || f === totalFrames - 1) {
      const pct = ((f / totalFrames) * 100).toFixed(1);
      process.stdout.write(`\rEncoding progress: ${f}/${totalFrames} frames (${pct}%) [${t.toFixed(1)}s]`);
    }
  }

  console.log('\nFinalizing MP4 file...');
  ffmpeg.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  await browser.close();
  console.log(`\nSUCCESS! Video rendered to: ${mp4Path}`);
}

render().catch((err) => {
  console.error('Render error:', err);
  process.exit(1);
});
