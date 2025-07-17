// Initialize AOS
AOS.init();

// Global variables
let currentDate = new Date();
let markedDates = {};
let currentTheme = 0;

// DOM Elements
const welcomeSection = document.getElementById('welcome');
const calendarSection = document.getElementById('calendar');
const calendarBody = document.getElementById('calendar-body');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const themeBtn = document.getElementById('theme-btn');

// Event Listeners
document.getElementById('start-btn').addEventListener('click', showCalendar);
prevBtn.addEventListener('click', prevMonth);
nextBtn.addEventListener('click', nextMonth);
themeBtn.addEventListener('click', changeTheme);

// Show calendar function
function showCalendar() {
  welcomeSection.style.display = 'none';
  calendarSection.style.display = 'block';
  showWelcomeNotification();
  generateCalendar();
  startHeartAnimation();
}

// Welcome notification
function showWelcomeNotification() {
  Swal.fire({
    title: '🌸 Welcome Queen! 🌸',
    html: '<b>Plan your days, shine your way! 💖✨</b>',
    imageUrl: 'images/pic2.jpg',
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Flower Image',
    background: '#fff0f5',
    confirmButtonColor: '#ff69b4',
    confirmButtonText: 'Let\'s Go! 🌸'
  });
}

// Generate calendar
function generateCalendar() {
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

  let calendarHTML = `
    <h3>${month} ${year}</h3>
    <table>
      <tr>
        ${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `<th>${day}</th>`).join('')}
      </tr>
      <tr>
  `;

  // Empty cells for days before 1st of month
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += `<td></td>`;
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${currentDate.getMonth()+1}-${day}`;
    const markedEvent = markedDates[dateKey] || '';
    
    if ((day + firstDay - 1) % 7 === 0 && day !== 1) {
      calendarHTML += `</tr><tr>`;
    }

    calendarHTML += `
      <td class="calendar-day" 
          onclick="markDate(this, ${day})"
          style="${markedEvent ? 'background-color: #ffb6c1; border-radius: 10px;' : ''}">
          ${day}${markedEvent ? `<br>${markedEvent}` : ''}
      </td>
    `;
  }

  calendarHTML += `</tr></table>`;
  calendarBody.innerHTML = calendarHTML;
}

// Mark date function
function markDate(cell, day) {
  Swal.fire({
    title: 'Mark this day! 🌸',
    input: 'select',
    inputOptions: {
      'Period Start': '🩸 Period Start',
      'Period End': '🌸 Period End',
      'Important Meeting': '📅 Important Meeting',
      'Custom Note': '📝 Custom Note'
    },
    inputPlaceholder: 'Select one',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      markedDates[dateKey] = result.value;
      
      cell.innerHTML = `${day}<br>${result.value}`;
      cell.style.backgroundColor = "#ffb6c1";
      cell.style.borderRadius = "10px";
    }
  });
}

// Month navigation
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar();
}

// Theme changer
function changeTheme() {
  const themes = ['', 'theme-blue', 'theme-green', 'theme-purple'];
  document.body.classList.remove(themes[currentTheme]);
  currentTheme = (currentTheme + 1) % themes.length;
  document.body.classList.add(themes[currentTheme]);
}

// Heart animation
function startHeartAnimation() {
  setInterval(createHeart, 500);
}

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 3) + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}