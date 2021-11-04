let arraySectores = [];
let arrayGrupos = ["ninguno"];
let arrayMedicosLimpio = [];
let arrayMedicos;
const arrayDiasLimpio = new Array();
let arrayDias;
let diaDeLaSemana;
let disponiblesFinde = 0;
let disponiblesSemana = 0;
let arrayHolidays = [];
const GETURL = 'https://calendarific.com/api/v2/holidays?api_key=43ac4ef62abc887dc928b448369b660a7f68589c&country=AR&year=2021&type=national'
let feriadosDelMes;

// CALENDARIO
// Tomo año actual para setear disposicion de próximos meses
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let diaSemana;
let dia1;
const monthArray = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
