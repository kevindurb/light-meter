// https://en.wikipedia.org/wiki/Exposure_value#Relationship_of_EV_to_lighting_conditions
// (N^2) / t = (L * S) / K
// N = aperture
// t = shutter speed
// L = luminance
// S = ISO
// K = meter calibration constant (12.5?)

import { ControlsView } from './ControlsView.js';
import { LuminanceWatcher } from './LuminanceWatcher.js';

const controlsView = new ControlsView();
const luminanceWatcher = new LuminanceWatcher();
const calibrationConstant = 12.5;
const $startButton = document.getElementById('start-button');

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getShutterSpeed(luminance, iso, aperture) {
  return (Math.pow(aperture, 2) * calibrationConstant) / (luminance * iso);
}

function getAperture(luminance, iso, speed) {
  return Math.sqrt(((luminance * iso) / calibrationConstant) * speed);
}

function getISO(luminance, aperture, speed) {
  return ((Math.pow(aperture, 2) / speed) * calibrationConstant) / luminance;
}

function render() {
  const luminance = luminanceWatcher.getAverageLuminance();
  controlsView.setLuminanceValue(luminance);

  const iso = parseFloat(controlsView.getISOValue());
  const speed = 1 / parseFloat(controlsView.getSpeedValue());
  const aperture = parseFloat(controlsView.getApertureValue());

  if (!controlsView.getISOIsUnlocked()) {
    controlsView.setISOValue(getISO(luminance, aperture, speed));
  }

  if (!controlsView.getSpeedIsUnlocked()) {
    controlsView.setSpeedValue(1.0 / getShutterSpeed(luminance, iso, aperture));
  }

  if (!controlsView.getApertureIsUnlocked()) {
    controlsView.setApertureValue(getAperture(luminance, iso, speed));
  }
}

function loop() {
  render();
  window.requestAnimationFrame(() => loop());
}

function start() {
  luminanceWatcher.start();
  loop();
}

$startButton.addEventListener('click', start);
