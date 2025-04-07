const calendarGrid = document.querySelector('.calendar-grid');
const currentMonth = document.getElementById('current-month');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let date = new Date();

// Exempeldata för transaktioner
const transactions = {
    "2023-03-01": [
        { type: "expense", amount: 200, description: "Matinköp" },
        { type: "income", amount: 500, description: "Lön" }
    ],
    "2023-03-05": [
        { type: "expense", amount: 100, description: "Transport" }
    ],
    "2023-03-10": [
        { type: "income", amount: 300, description: "Freelance-jobb" }
    ]
};

// Modal-element
const modal = document.getElementById('day-details-modal');
const modalDate = document.getElementById('modal-date');
const transactionsList = document.getElementById('transactions-list');
const closeButton = document.querySelector('.close-button');

// Visa modal med transaktioner för en vald dag
function showDayDetails(date) {
    modalDate.textContent = date;
    transactionsList.innerHTML = '';

    const dayTransactions = transactions[date] || [];
    if (dayTransactions.length === 0) {
        transactionsList.innerHTML = '<li>Inga transaktioner för denna dag.</li>';
    } else {
        dayTransactions.forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = `${transaction.type === 'income' ? '+' : '-'}${transaction.amount} Kr - ${transaction.description}`;
            li.style.color = transaction.type === 'income' ? 'green' : 'red';
            transactionsList.appendChild(li);
        });
    }

    modal.style.display = 'flex';
}

// Stäng modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Stäng modal när man klickar utanför innehållet
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

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
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayDiv.setAttribute('data-day', day); // Lägg till siffran för dagen
        dayDiv.addEventListener('click', () => showDayDetails(formattedDate));
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
