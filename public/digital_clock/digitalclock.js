const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const ampmEl = document.getElementById("ampm");

const dayNameEl = document.getElementById("day-name");
const fullDateEl = document.getElementById("full-date");

const timezoneLabel = document.getElementById("timezone-label");

const toast = document.getElementById("toast");

const alarmStatus = document.getElementById("alarm-status");

const alarmSound = document.getElementById("alarm-sound");

const alarmPopup = document.getElementById("alarm-popup");

let alarms =
  JSON.parse(localStorage.getItem("alarms")) || [];

let activeAlarm = null;

let alarmTriggered = false;

let alarmHistory =
  JSON.parse(localStorage.getItem("alarmHistory")) || [];

let alarmTriggered = false;

function updateClock() {

const timezoneSelect =
  document.getElementById("timezone");

if (!timezoneSelect.value) {

  timezoneSelect.value =
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone;
}

const timezone =
  timezoneSelect.value;

  let now = new Date();

  if (timezone !== "local") {

    now = new Date(
      now.toLocaleString("en-US", {
        timeZone: timezone
      })
    );
  }

  let hours = now.getHours();

  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";

const currentHours = now.getHours();

const rawHours =
  String(currentHours).padStart(2, "0");
  

  const rawMinutes =
    String(minutes).padStart(2, "0");

  const currentTime =
    `${rawHours}:${rawMinutes}`;

  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  hoursEl.textContent =
    String(hours).padStart(2, "0");

  minutesEl.textContent =
    String(minutes).padStart(2, "0");

  secondsEl.textContent =
    String(seconds).padStart(2, "0");

  ampmEl.textContent = ampm;

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  dayNameEl.textContent =
    days[now.getDay()];

  fullDateEl.textContent =
    `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

const selectedZone =
  document.getElementById("timezone")
  .selectedOptions[0].text;

const offset =
  new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    timeZoneName: "short"
  })
  .format(now)
  .split(" ")
  .pop();

timezoneLabel.textContent =
  `${selectedZone} (${offset})`;
  checkAlarm(currentTime);
}

function setTheme(theme) {

  const root =
    document.documentElement;

  const label =
    document.getElementById("theme-label");

  const buttons =
    document.querySelectorAll(".theme-btn");

  buttons.forEach(btn =>
    btn.classList.remove("active")
  );

  if (theme === "classic") {

    root.style.setProperty(
      "--primary",
      "#00ff99"
    );

    label.textContent =
      "CLASSIC MODE";

    document
      .querySelector(".classic-btn")
      .classList.add("active");
  }

  else if (theme === "modern") {

    root.style.setProperty(
      "--primary",
      "#3b82f6"
    );

    label.textContent =
      "MODERN MODE";

    document
      .querySelector(".modern-btn")
      .classList.add("active");
  }

  else {

    root.style.setProperty(
      "--primary",
      "#ec4899"
    );

    label.textContent =
      "FUTURISTIC MODE";

    document
      .querySelector(".futuristic-btn")
      .classList.add("active");
  }

  localStorage.setItem(
    "clockTheme",
    theme
  );
}

function toggleAlarmSection() {

  document
    .getElementById("alarm-controls")
    .classList.toggle("hidden");
}
function setAlarm() {

  const input =
    document.getElementById("alarm-time");

  if (!input.value) {

    showToast("Select alarm time");
    return;
  }

  const newAlarm = {
    id: Date.now(),
    time: input.value,
    enabled: true
  };

  alarms.push(newAlarm);

  localStorage.setItem(
    "alarms",
    JSON.stringify(alarms)
  );

  renderAlarms();

  showToast(
    `Alarm added for ${input.value}`
  );
}

function renderAlarms() {

  const list =
    document.getElementById("alarm-list");

  list.innerHTML = "";

  if (alarms.length === 0) {

    alarmStatus.textContent =
      "No Active Alarm";

    return;
  }

  alarms.forEach(alarm => {

    const div =
      document.createElement("div");

    div.className =
      "alarm-item";

    div.innerHTML = `
      <span>${alarm.time}</span>

      <div class="alarm-buttons">

        <button onclick="toggleAlarm(${alarm.id})">
          ${alarm.enabled ? "ON" : "OFF"}
        </button>

        <button onclick="deleteAlarm(${alarm.id})">
          Delete
        </button>

      </div>
    `;

    list.appendChild(div);
  });

  alarmStatus.textContent =
    `${alarms.length} Alarm(s) Active`;
}

function toggleAlarm(id) {

  alarms = alarms.map(alarm => {

    if (alarm.id === id) {

      alarm.enabled =
        !alarm.enabled;
    }

    return alarm;
  });

  localStorage.setItem(
    "alarms",
    JSON.stringify(alarms)
  );

  renderAlarms();
}


function deleteAlarm(id) {

  alarms =
    alarms.filter(
      alarm => alarm.id !== id
    );

  localStorage.setItem(
    "alarms",
    JSON.stringify(alarms)
  );

  renderAlarms();

  showToast("Alarm deleted");
}

function setTheme(theme) {

  const root =
    document.documentElement;

  const label =
    document.getElementById("theme-label");

  const buttons =
    document.querySelectorAll(".theme-btn");

  const body =
    document.body;

  const card =
    document.querySelector(".clock-card");

  buttons.forEach(btn =>
    btn.classList.remove("active")
  );

  // Remove old themes
  body.classList.remove(
    "classic-theme",
    "modern-theme",
    "future-theme"
  );

  card.classList.remove(
    "classic-clock",
    "modern-clock",
    "future-clock"
  );

  if (theme === "classic") {

    root.style.setProperty(
      "--primary",
      "#00ff99"
    );

    label.textContent =
      "CLASSIC MODE";

    document
      .querySelector(".classic-btn")
      .classList.add("active");

    body.classList.add(
      "classic-theme"
    );

    card.classList.add(
      "classic-clock"
    );
  }

  else if (theme === "modern") {

    root.style.setProperty(
      "--primary",
      "#3b82f6"
    );

    label.textContent =
      "MODERN MODE";

    document
      .querySelector(".modern-btn")
      .classList.add("active");

    body.classList.add(
      "modern-theme"
    );

    card.classList.add(
      "modern-clock"
    );
  }

  else if (theme === "futuristic") {

    root.style.setProperty(
      "--primary",
      "#ec4899"
    );

    label.textContent =
      "FUTURISTIC MODE";

    document
      .querySelector(".futuristic-btn")
      .classList.add("active");

    body.classList.add(
      "future-theme"
    );

    card.classList.add(
      "future-clock"
    );
  }

  localStorage.setItem(
    "clockTheme",
    theme
  );
}


function clearAlarm() {

  localStorage.removeItem(
    "alarmTime"
  );

  alarmTime = null;

  alarmTriggered = false;

  alarmStatus.textContent =
    "Not Set";

  showToast("Alarm cleared");
}
function checkAlarm(currentTime) {

  alarms.forEach(alarm => {

    if (
      alarm.enabled &&
      alarm.time === currentTime &&
      activeAlarm !== alarm.id
    ) {

      activeAlarm = alarm.id;

      triggerAlarm();

      saveAlarmHistory(alarm.time);

      if (navigator.vibrate) {

        navigator.vibrate([
          500,
          300,
          500
        ]);
      }
    }
  });
}

function saveAlarmHistory(time) {

  alarmHistory.unshift({
    time,
    triggeredAt:
      new Date().toLocaleString()
  });

  alarmHistory =
    alarmHistory.slice(0, 10);

  localStorage.setItem(
    "alarmHistory",
    JSON.stringify(alarmHistory)
  );
}

function snoozeAlarm() {

  alarmPopup.classList.add(
    "hidden"
  );

  alarmSound.pause();

  alarmSound.currentTime = 0;

  const now = new Date();

  now.setMinutes(
    now.getMinutes() + 5
  );

  const snoozeTime =
    `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;

  alarms.push({
    id: Date.now(),
    time: snoozeTime,
    enabled: true
  });

  localStorage.setItem(
    "alarms",
    JSON.stringify(alarms)
  );

  renderAlarms();

  showToast(
    `Snoozed to ${snoozeTime}`
  );
}


function triggerAlarm() {

  alarmPopup.classList.remove(
    "hidden"
  );

  alarmSound.loop = true;

  alarmSound.volume = 1;

const playPromise = alarmSound.play();

if (playPromise !== undefined) {
  playPromise.catch(() => {
    showToast("Click anywhere to enable alarm audio");
  });
}
}

function stopAlarm() {

  alarmPopup.classList.add(
    "hidden"
  );

  alarmSound.pause();

  alarmSound.currentTime = 0;

  alarmTriggered = false;

  // Remove saved alarm
  localStorage.removeItem("alarmTime");

  alarmTime = null;

  // Update UI
  alarmStatus.textContent =
    "Not Set";

  showToast("Alarm stopped");
}

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);
}

const savedTheme =
  localStorage.getItem("clockTheme")
  || "classic";

setTheme(savedTheme);

if (alarmTime) {

  alarmStatus.textContent =
    alarmTime;
}

updateClock();

setInterval(updateClock, 1000);