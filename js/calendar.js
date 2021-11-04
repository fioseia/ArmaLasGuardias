
// Me conecto con el DOM //
let calendarYear = document.getElementById('calendarYear');
let calendarMonth = document.getElementById('calendarMonth');
let calendarDay = document.getElementById('calendarDay');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

calendarMonth.textContent = monthArray[currentMonth];
calendarYear.textContent = currentYear.toString();

// - Crear calendario segun mes seleccionado.

prevMonthDOM.addEventListener('click', lastMonth);
nextMonthDOM.addEventListener('click', nextMonth);
writeMonth(currentMonth);
isWeekend(currentMonth);
const diasFinales = new Array(currentMonth);