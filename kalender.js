const calendarGrid = document.querySelector('.calendar-grid');
const currentMonth = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let date = new Date();

function renderCalendar() {
    calendarGrid.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    currentMonth.textContent = date.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' });

    // Justera första dagen (svenska veckor börjar på måndag)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Fyll tomma rutor för dagar innan månadens första dag
    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        calendarGrid.appendChild(emptyDiv);
    }

    // Fyll rutor för varje dag i månaden
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.setAttribute('data-day', day); // Lägg till siffran för dagen
        calendarGrid.appendChild(dayDiv);
    }
}

prevMonthBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
