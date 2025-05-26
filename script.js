// Handle event fee display on event selection
document.getElementById('eventType').addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const fee = selectedOption.getAttribute('data-fee');
  document.getElementById('feeOutput').textContent = fee ? `Event fee: $${fee}` : '';
  localStorage.setItem('preferredEvent', this.value);
});

// Load preferred event type from localStorage on page load
window.onload = () => {
  const preferredEvent = localStorage.getItem('preferredEvent');
  if (preferredEvent) {
    const select = document.getElementById('eventType');
    select.value = preferredEvent;
    const event = new Event('change');
    select.dispatchEvent(event);
  }
};

// Validate phone number on blur
document.getElementById('phone').addEventListener('blur', function () {
  const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
  if (this.value && !phonePattern.test(this.value)) {
    alert('Phone number must be in the format 123-456-7890');
    this.focus();
  }
});

// Submit button click confirmation
document.getElementById('submitBtn').addEventListener('click', function (e) {
  e.preventDefault();
  const form = document.getElementById('registrationForm');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  document.getElementById('confirmationMessage').textContent = 'Thank you for registering!';
  form.reset();
  document.getElementById('feeOutput').textContent = '';
  localStorage.removeItem('preferredEvent');
});

// Double-click image to enlarge
document.querySelectorAll('.event-image').forEach(img => {
  img.addEventListener('dblclick', () => {
    if (img.style.width === '300px') {
      img.style.width = '150px';
      img.style.height = '100px';
    } else {
      img.style.width = '300px';
      img.style.height = '200px';
    }
  });
});

// Feedback textarea key events
const feedback = document.getElementById('feedback');
const charCount = document.getElementById('charCount');
feedback.addEventListener('keyup', () => {
  charCount.textContent = feedback.value.length;
});

// Video oncanplay event
function videoReady() {
  document.getElementById('videoMessage').textContent = 'Video ready to play';
}

// Warn user on leaving page with unsaved form
window.onbeforeunload = function () {
  const form = document.getElementById('registrationForm');
  if (form && (form.name.value || form.email.value || form.date.value || form.eventType.value)) {
    return 'You have unsaved changes. Are you sure you want to leave?';
  }
};

// Geolocation
document.getElementById('locateBtn').addEventListener('click', () => {
  const output = document.getElementById('locationResult');
  if (!navigator.geolocation) {
    output.textContent = 'Geolocation is not supported by your browser.';
    return;
  }

  output.textContent = 'Locating...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      output.textContent = `Latitude: ${position.coords.latitude.toFixed(4)}, Longitude: ${position.coords.longitude.toFixed(4)}`;
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          output.textContent = 'Permission denied. Please allow location access.';
          break;
        case error.POSITION_UNAVAILABLE:
          output.textContent = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          output.textContent = 'The request timed out.';
          break;
        default:
          output.textContent = 'An unknown error occurred.';
          break;
      }
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
});

// Clear preferences button
document.getElementById('clearPrefs').addEventListener('click', () => {
  localStorage.clear();
  sessionStorage.clear();
  alert('Preferences cleared!');
});
