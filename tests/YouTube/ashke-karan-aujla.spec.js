import { chromium, expect, test } from '@playwright/test';

test('searches for Ashke by Karan Aujla, plays it to completion, and closes the browser', async () => {
  test.setTimeout(7 * 60 * 1000);

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/results?search_query=Aske+by+Karan+Aujla');

    const result = page.getByRole('link', {
      name: /Ashke \(Music Video\) Karan Aujla \| Mxrci \| Aujla Szn 1/,
    }).first();
    await expect(result).toBeVisible();

    const resultUrl = new URL(await result.getAttribute('href') ?? '', page.url());
    const videoId = resultUrl.searchParams.get('v');
    expect(videoId).toBeTruthy();

    await page.goto(`https://www.youtube.com/watch?v=${videoId}`);
    await expect(page).toHaveTitle(/Ashke.*Karan Aujla/i);

    const video = page.locator('video');
    await expect(video).toBeVisible();
    await page.waitForFunction(() => {
      const player = document.querySelector('video');
      return player !== null && player.readyState >= 2 && player.duration > 180;
    }, null, { timeout: 60 * 1000 });

    await video.evaluate(player => {
      const markCompleted = () => {
        if (player.ended || player.currentTime >= player.duration - 1) {
          document.documentElement.dataset.ashkePlaybackCompleted = 'true';
          player.removeEventListener('timeupdate', markCompleted);
        }
      };

      player.addEventListener('ended', markCompleted, { once: true });
      player.addEventListener('timeupdate', markCompleted);
    });

    if (await video.evaluate(player => player.paused)) {
      await page.locator('button.ytp-play-button').click();
    }

    await page.waitForFunction(() => {
      const player = document.querySelector('video');
      return player !== null && !player.paused && player.currentTime > 0;
    }, null, { timeout: 60 * 1000 });
    await page.waitForFunction(() => {
      return document.documentElement.dataset.ashkePlaybackCompleted === 'true';
    }, null, { timeout: 5 * 60 * 1000 });
  } finally {
    await browser.close();
  }
});
