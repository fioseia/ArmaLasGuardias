let arraySectores = [];
let arrayGrupos = ["ninguno"];
let arrayMedicos = [];
const gruposMedicos = new Array(arrayGrupos.length);
const arrayDias = new Array();
let noDiaLibre;
let tieneGuardias;
let esSuDiaFijo;
let arrayMedicosFinal = [];
let diaDeLaSemana;
let disponiblesFinde = 0;
let disponiblesSemana = 0;
const arrayHolidays = [];
const GETURL = 'https://calendarific.com/api/v2/holidays?api_key=5f181a6795fac4ffcc25af69f96693d98175ec56&country=AR&year=2021&type=national'
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
