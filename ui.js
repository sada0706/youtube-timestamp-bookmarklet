(function () {
  function createUI(stopTimes, video) {
    let container = document.getElementById("timestamp-links");
    if (container) container.remove();

    container = document.createElement("div");
    container.id = "timestamp-links";
    container.style.position = "fixed";
    container.style.top = "50px";
    container.style.right = "10px";
    container.style.backgroundColor = "rgba(30, 30, 30, 0.9)";
    container.style.color = "#fff";
    container.style.padding = "10px";
    container.style.borderRadius = "5px";
    container.style.fontSize = "14px";
    container.style.width = "250px";
    container.style.maxHeight = "80vh";
    container.style.overflowY = "auto";
    container.style.zIndex = "9999";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.paddingBottom = "5px";
    header.style.borderBottom = "1px solid #ccc";

    const title = document.createElement("div");
    title.innerText = "🔹 タイムスタンプ";
    title.style.fontWeight = "bold";
    header.appendChild(title);

    const closeBtn = document.createElement("div");
    closeBtn.innerText = "❌";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.fontSize = "16px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.onclick = () => container.remove();
    header.appendChild(closeBtn);

    container.appendChild(header);

    stopTimes.forEach((time, index) => {
      const link = document.createElement("a");
      link.href = "javascript:void(0)";
      link.innerText = `▶ ${time}`;
      link.style.display = "block";
      link.style.color = "#FFD700";
      link.style.fontWeight = "bold";
      link.style.marginBottom = "5px";
      link.style.cursor = "pointer";
      link.onclick = () => {
        video.currentTime = stopTimes[index];
        video.play();
        preventStopUntil = stopTimes[index] + 1;
        lastPausedTime = -1;
        lastSeekTime = stopTimes[index];
      };
      container.appendChild(link);
    });

    document.body.appendChild(container);
  }

  createUI(window.stopTimes, document.querySelector("video"));
})();
