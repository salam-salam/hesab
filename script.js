const jalaali = window.jalaali;

const months = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const events = {
  '1404-02-01': ['روز بزرگداشت سعدی'],
  '1404-02-02': ['تأسیس سپاه پاسداران'],
  '1404-02-03': ['بزرگداشت شیخ بهایی'],
  '1404-02-04': ['شهادت امام جعفر صادق (ع)'],
  '1404-02-10': ['روز ملی خلیج فارس'],
  '1404-02-15': ['روز معلم'],
  '1404-02-25': ['روز بزرگداشت فردوسی']
};

const monthYearEl = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentDateEl = document.getElementById('currentDate');
const eventsContainer = document.getElementById('eventsContainer');

let currentYear = 1404;
let currentMonth = 2;

function init() {
  updateCurrentDate();
  setupEventListeners();
}

function updateCurrentDate() {
  const now = new Date();
  const jNow = jalaali.toJalaali(now);
  const options = { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const dateStr = now.toLocaleDateString('fa-IR', options);
  const timeStr = now.toLocaleTimeString('fa-IR');
  currentDateEl.textContent = `امروز ${dateStr} - ساعت ${timeStr}`;
}

function setupEventListeners() {
  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth === 0) {
      currentMonth = 12;
      currentYear--;
    }
    updateMonthYearDisplay();
    updateEventsDisplay();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth === 13) {
      currentMonth = 1;
      currentYear++;
    }
    updateMonthYearDisplay();
    updateEventsDisplay();
  });
}

function updateMonthYearDisplay() {
  monthYearEl.textContent = `${months[currentMonth-1]} ${currentYear}`;
}

function updateEventsDisplay() {
  const monthEvents = [];
  const daysInMonth = jalaali.jalaaliMonthLength(currentYear, currentMonth);
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (events[dateKey]) {
      monthEvents.push({
        day: day,
        events: events[dateKey]
      });
    }
  }
  
  if (monthEvents.length > 0) {
    let eventsHTML = `
      <h3 class="events-title">مناسبت‌های ${months[currentMonth-1]}</h3>
      <ul class="event-list">
    `;
    
    monthEvents.forEach(item => {
      item.events.forEach(event => {
        eventsHTML += `
          <li>
            <strong>${item.day} ${months[currentMonth-1]}:</strong> ${event}
          </li>
        `;
      });
    });
    
    eventsHTML += `</ul>`;
    eventsContainer.innerHTML = eventsHTML;
  } else {
    eventsContainer.innerHTML = `
      <h3 class="events-title">مناسبت‌های ${months[currentMonth-1]}</h3>
      <p>مناسبت خاصی در این ماه ثبت نشده است</p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', init);