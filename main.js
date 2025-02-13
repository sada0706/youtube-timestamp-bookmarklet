(async function () {
  let config;
  try {
    let response = await fetch(
      "https://github.com/sada0706/youtube-timestamp-bookmarklet/config.json"
    );
    config = await response.json();
  } catch (error) {
    console.error("設定ファイルの読み込みに失敗:", error);
    return;
  }

  let stopTimes = config.stopTimes.map(timeToSeconds);
  const video = document.querySelector("video");

  if (!video) {
    alert("動画が見つかりません");
    return;
  }

  let preventStopUntil = 0;
  let lastPausedTime = -1;
  let wasPlayingBeforePause = false;
  let lastSeekTime = video.currentTime;

  function timeToSeconds(timeStr) {
    const parts = timeStr.split(":").map(Number);
    return parts.length === 3
      ? parts[0] * 3600 + parts[1] * 60 + parts[2]
      : parts[0] * 60 + parts[1];
  }

  // シークを監視し、リセット
  video.addEventListener("seeked", () => {
    lastSeekTime = video.currentTime;
    lastPausedTime = -1;
  });

  // 一定時間ごとにチェックし、停止する
  const interval = setInterval(() => {
    if (!video) {
      clearInterval(interval);
      return;
    }

    const currentTime = Math.floor(video.currentTime);
    if (currentTime < preventStopUntil) return;

    if (stopTimes.includes(currentTime) && lastPausedTime !== currentTime) {
      wasPlayingBeforePause = !video.paused;
      video.pause();
      console.log(`動画を ${currentTime} 秒で停止しました。`);
      lastPausedTime = currentTime;
    }
  }, 500);

  // UIを読み込む
  let script = document.createElement("script");
  script.src =
    "https://github.com/sada0706/youtube-timestamp-bookmarklet/ui.js";
  document.body.appendChild(script);
})();
