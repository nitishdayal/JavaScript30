(() => {
  const player = document.querySelector('.player'),
    video = player.querySelector('.viewer'),
    progress = player.querySelector('.progress'),
    progressBar = player.querySelector('.progress__filled'),
    toggle = player.querySelector('.toggle'),
    skipButtons = player.querySelectorAll('[data-skip]'),
    ranges = player.querySelectorAll('.player__slider')

  let togglePlay = () => video[video.paused ? 'play' : 'pause'](),
    updateButton = () => toggle.textContent = video.paused ? '►' : '❚ ❚',
    handleProgress = () => progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`,
    scrub = (e) => video.currentTime = ((e.offsetX / progress.offsetWidth) * video.duration)

  video.addEventListener('click', togglePlay)
  video.addEventListener('play', updateButton)
  video.addEventListener('pause', updateButton)
  video.addEventListener('timeupdate', handleProgress)

  toggle.addEventListener('click', togglePlay)

  let mousedown = false
  progress.addEventListener('click', scrub)
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
  progress.addEventListener('mousedown', () => mousedown = true)
  progress.addEventListener('mouseup', () => mousedown = false)

  skipButtons.forEach(button => {
    button.addEventListener('click', () => video.currentTime += parseFloat(button.dataset.skip))
  })

  ranges.forEach(range => {
    range.addEventListener('change', () => video[range.name] = range.value)
    range.addEventListener('mousemove', () => video[range.name] = range.value)
  })
})();
