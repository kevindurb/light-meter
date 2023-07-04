export class ControlsView {
  $isoValue = document.getElementById('iso-value');
  $speedValue = document.getElementById('speed-value');
  $apertureValue = document.getElementById('aperture-value');

  $isoUnlocked = document.getElementById('iso-unlocked');
  $speedUnlocked = document.getElementById('speed-unlocked');
  $apertureUnlocked = document.getElementById('aperture-unlocked');

  $isoDisplay = document.getElementById('iso-display');
  $speedDisplay = document.getElementById('speed-display');
  $apertureDisplay = document.getElementById('aperture-display');
  $luminanceDisplay = document.getElementById('luminance-display');

  constructor() {
    this.$isoValue.addEventListener('input', this.updateISO);
    this.$speedValue.addEventListener('input', this.updateSpeed);
    this.$apertureValue.addEventListener('input', this.updateAperture);

    this.$isoUnlocked.addEventListener('change', this.updateUnlocked);
    this.$speedUnlocked.addEventListener('change', this.updateUnlocked);
    this.$apertureUnlocked.addEventListener('change', this.updateUnlocked);

    this.updateISO();
    this.updateSpeed();
    this.updateAperture();
  }

  updateUnlocked = (event) => {
    const $currentCheckbox = event.currentTarget;

    if (!$currentCheckbox.checked) {
      if (this.$isoUnlocked === $currentCheckbox) {
        this.$speedUnlocked.checked = true;
        this.$apertureUnlocked.checked = true;
      }
      if (this.$speedUnlocked === $currentCheckbox) {
        this.$isoUnlocked.checked = true;
        this.$apertureUnlocked.checked = true;
      }
      if (this.$apertureUnlocked === $currentCheckbox) {
        this.$isoUnlocked.checked = true;
        this.$speedUnlocked.checked = true;
      }
    }

    this.updateISO();
    this.updateSpeed();
    this.updateAperture();
  };

  updateISO = () => {
    this.$isoDisplay.textContent = this.$isoValue.value;
    if (this.$isoUnlocked.checked) {
      this.$isoValue.removeAttribute('disabled');
    } else {
      this.$isoValue.setAttribute('disabled', 'disabled');
    }
  };

  updateSpeed = () => {
    this.$speedDisplay.textContent = `1/${this.$speedValue.value}`;
    if (this.$speedUnlocked.checked) {
      this.$speedValue.removeAttribute('disabled');
    } else {
      this.$speedValue.setAttribute('disabled', 'disabled');
    }
  };

  updateAperture = () => {
    this.$apertureDisplay.textContent = parseFloat(
      this.$apertureValue.value,
    ).toFixed(1);
    if (this.$apertureUnlocked.checked) {
      this.$apertureValue.removeAttribute('disabled');
    } else {
      this.$apertureValue.setAttribute('disabled', 'disabled');
    }
  };

  getISOIsUnlocked = () => this.$isoUnlocked.checked;
  getSpeedIsUnlocked = () => this.$speedUnlocked.checked;
  getApertureIsUnlocked = () => this.$apertureUnlocked.checked;

  getISOValue = () => this.$isoValue.value;
  getSpeedValue = () => this.$speedValue.value;
  getApertureValue = () => this.$apertureValue.value;

  setISOValue = (value) => {
    this.$isoValue.value = value;
    this.updateISO();
  };
  setSpeedValue = (value) => {
    this.$speedValue.value = value;
    this.updateSpeed();
  };
  setApertureValue = (value) => {
    this.$apertureValue.value = value;
    this.updateAperture();
  };
  setLuminanceValue = (value) => {
    this.$luminanceDisplay.textContent = parseFloat(value).toFixed(2);
  };
}
