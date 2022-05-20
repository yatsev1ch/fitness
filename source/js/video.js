const videoContainer = document.querySelector('.gym__video-container');
const playButton = document.querySelector('.gym__play-button');

const video = document.createElement('iframe');
video.classList.add('gym__video');
video.src = 'https://youtube.com/embed/9TZXsZItgdw?autoplay=1&mute=1';
video.tabIndex = -1;

playButton.addEventListener('click', () => {
  videoContainer.removeChild(playButton);
  videoContainer.append(video);
});
