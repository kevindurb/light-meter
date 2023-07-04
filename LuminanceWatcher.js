export class LuminanceWatcher {
  $video = document.getElementById('video');
  $canvas = document.createElement('canvas');

  width = 320;
  height = 0;

  constructor() {
    this.$video.addEventListener(
      'canplay',
      () => {
        if (!this.height) {
          this.height =
            (this.$video.videoHeight / this.$video.videoWidth) * this.width;

          this.$video.setAttribute('width', this.width);
          this.$video.setAttribute('height', this.height);
          this.$canvas.setAttribute('width', this.width);
          this.$canvas.setAttribute('height', this.height);
        }
      },
      false,
    );
  }

  async start() {
    const cameraStream = await this.getCameraStream();
    this.$video.srcObject = cameraStream;
    this.$video.play();
  }

  async getCameraStream() {
    return await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    });
  }

  drawVideoToCanvas() {
    if (!this.width || !this.height) return;
    const context = this.$canvas.getContext('2d');
    if (!context) return;

    this.$canvas.width = this.width;
    this.$canvas.height = this.height;
    context.drawImage(this.$video, 0, 0, this.width, this.height);
  }

  getAverageRGB() {
    if (!this.width || !this.height) return;
    const context = this.$canvas.getContext('2d');
    if (!context) return;

    const { data } = context.getImageData(0, 0, this.width, this.height);
    const blockSize = 5;
    let count = 0;
    let i = -4;
    let r = 0;
    let g = 0;
    let b = 0;
    while ((i += blockSize * 4) < data.length) {
      ++count;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    return { r: r / count, g: g / count, b: b / count };
  }

  // https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
  getAverageLuminance() {
    this.drawVideoToCanvas();
    const rgb = this.getAverageRGB();
    if (!rgb) return;

    const { r, g, b } = rgb;

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
}
