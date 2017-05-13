(() => {
  const video = document.querySelector(".player"),
    canvas = document.querySelector(".photo"),
    ctx = canvas.getContext("2d"),
    strip = document.querySelector(".strip"),
    snap = document.querySelector(".snap");

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        video.srcObject = localMediaStream;
        video.play();
      })
      .catch(err => {
        console.error(`OH NO!!! ${err}`);
      });
  };

  const paintToCanavas = () => {
    const { videoWidth: width, videoHeight: height } = video;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);

      let pixels = ctx.getImageData(0, 0, width, height);

      pixels = greenScreen(pixels);

      ctx.putImageData(pixels, 0, 0);
    }, 16);
  };

  const takePhoto = () => {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");

    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firsChild);
  };

  const greenScreen = pixels => {
    const levels = {};

    document.querySelectorAll(".rgb input").forEach(input => {
      levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i += 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];

      if (
        red >= levels.rmin &&
        green >= levels.gmin &&
        blue >= levels.bmin &&
        red <= levels.rmax &&
        green <= levels.gmax &&
        blue <= levels.bmax
      ) {
        pixels.data[i + 3] = 0;
      }
    }
    return pixels;
  };

  getVideo();

  video.addEventListener("canplay", paintToCanavas);
  document.querySelector(".takePhoto").addEventListener("click", takePhoto);
})();
