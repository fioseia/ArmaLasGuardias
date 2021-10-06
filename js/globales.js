let arraySectores = [];
let arrayGrupos = [];
let arrayMedicos = [];
const gruposMedicos = new Array(arrayGrupos.length);
let fecha = new Date();

// CALENDARIO
// Tomo año actual para setear disposicion de próximos meses
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let diaSemana;
let dia1;
const monthArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
