const { get } = require("http");

function numberSectores(value) {
    return parseInt(value)
};

function crearGrupos() {
    for (grupo of arrayGrupos) {
        let i = arrayGrupos.indexOf(grupo);
        gruposMedicos[i] = new Array();
        gruposMedicos[i].push(grupo)
        arrayMedicos.filter(function (element) {
            if (element.grupo == grupo) {
                gruposMedicos[i].push(element.nombre)
            }
        })
    }
}

function sumarGuardiasDia() {
    let medicosPorSector = 0;
    arraySectores.forEach(element => {
        medicosPorSector += element.numeroMedicos
    })
    return medicosPorSector

};

function guardiasDisponiblesFinde() {
    disponiblesFinde = 0;
    arrayMedicos.forEach(element => disponiblesFinde += element.guardiasFinde)
    return disponiblesFinde;
}

function guardiasDisponiblesSemana() {
    disponiblesSemana = 0;
    arrayMedicos.forEach(element => disponiblesSemana += element.guardiasSemana)
    return disponiblesSemana
}

function elegirMedicoAleatorio(array) {
    return array[Math.floor(Math.random() * array.length)]
}


function comprobarCondiciones(i) {
    let dia = (i - 1);
    console.log(dia);
    diaDeLaSemana = arrayDias[dia][2]
    let medico = elegirMedicoAleatorio(arrayMedicos)
    console.log(medico);
    let yaEstaDeGuardias = estaDeGuardia(medico, dia);
    console.log(yaEstaDeGuardias);
    let yaEstaDiaAnterior = diaAnterior(medico, dia)
    console.log(yaEstaDiaAnterior);
    let mismoGrupo = grupos(medico, dia);
    console.log(mismoGrupo);
    let guardiasTotales = medico.guardiasFinde + medico.guardiasSemana
    if (guardiasTotales > 0) {
        if (medico.diaLibre != (dia + 1)) {
            console.log('No es su dia libre');
            if (diaDeLaSemana == 'feriado') {
                console.log('Es finde o feriado');
                let disponiblesF = guardiasDisponiblesFinde()
                console.log(disponiblesF);
                if (disponiblesF > 0) {
                    console.log('Hay medicos con findes disponibles');
                    if (medico.guardiasFinde > 0) {
                        console.log('Tiene guardias de Finde');
                        if (yaEstaDiaAnterior == false) {
                            console.log('No esta el dia anterior');
                            if (yaEstaDeGuardias == false) {
                                console.log('No esta de guardia el mismo dia');
                                if (mismoGrupo == false) {
                                    console.log("No hay nadie del mismo grupo");
                                    arrayDias[dia][3].push(medico)
                                    arrayDias[dia][1]++;
                                    restarGuardias(medico, diaDeLaSemana)
                                    console.log('pusheado');
                                } else {
                                    console.log('Hay alguien del mismo grupo');
                                    comprobarCondiciones(i)
                                }
                            } else {
                                console.log('Ya esta el mismo dia');
                                comprobarCondiciones(i)
                            }
                        } else {
                            console.log("Ya esta el dia anterior");
                            comprobarCondiciones(i)
                        }
                    } else {
                        console.log('No tiene guardias de finde')
                        comprobarCondiciones(i)
                    }

                } else {
                    console.log('No quedan medicos con findes disponibles');
                }

            } else {
                console.log('Es dia habil');
                let disponiblesS = guardiasDisponiblesSemana()
                console.log(disponiblesS);
                if (disponiblesS > 0) {
                    console.log('Hay medicos con semana disponibles');
                    if (medico.guardiasSemana > 0) {
                        console.log('Tiene guardias de semana');
                        if (yaEstaDiaAnterior == false) {
                            console.log('No esta el dia anterior');
                            if (yaEstaDeGuardias == false) {
                                console.log('No esta mismo dia');
                                if (mismoGrupo == false) {
                                    console.log("No hay nadie del mismo grupo");
                                    console.log("No hay nadie del mismo grupo");
                                    arrayDias[dia][3].push(medico)
                                    arrayDias[dia][1]++;
                                    restarGuardias(medico, diaDeLaSemana)
                                    console.log('pusheado');
                                } else {
                                    console.log('Hay alguien del mismo grupo');
                                    comprobarCondiciones(i)
                                }
                            } else {
                                console.log('Esta el mismo dia');
                                comprobarCondiciones(i)
                            }
                        } else {
                            console.log('Ya esta el dia anterior');
                            comprobarCondiciones(i)
                        }
                    } else {
                        console.log('No tiene guardias de semana');
                        comprobarCondiciones(i)
                    }
                } else {
                    console.log('No quedan medicos con semana disponible');
                }
            }
        } else {
            console.log('Es su dia libre');
            comprobarCondiciones(i)
        }
    } else {
        console.log('No tiene mas guardias');
        comprobarCondiciones(i)
    }
}

function restarGuardias(medico, dia) {
    if (dia == 'feriado') {
        medico.guardiasFinde--;
    } else {
        medico.guardiasSemana--;
    };
};

function armarSectores(d) {
    let dia = d;
    for (let i = 0; i < arraySectores.length; i++) {
        comprobarCondiciones(dia)
    };
};

function diaAnterior(medico, i) {
    if (i >= 1) {
        let diaAnterior = (i - 1)
        return arrayDias[diaAnterior][3].includes(medico)
    } else if (i == 0) {
        return false
    }
}

function estaDeGuardia(medico, i) {
    return arrayDias[i][3].includes(medico)
}

function grupos(medico, i) {
    if (medico.grupo != "ninguno") {
        return arrayDias[i][3].some(element => element.grupo == medico.grupo)
    } else {
        console.log('ningun grupo');
        return false

    }
}



// FUNCIONES CALENDARIO //
// Funciones para diseñar mes

function isLeap() {
    return ((currentYear % 100 !== 0) && (currentYear % 4 == 0) || currentYear % 400 == 0);
};

function startDay() {
    let start = new Date(currentYear, currentMonth, 1);
    if ((start.getDay() - 1) == -1) {
        return 6;
    } else {
        return ((start.getDay()) - 1);
    }
};

function lastMonth() {
    if (currentMonth !== 0) {
        currentMonth--;
    } else {
        currentMonth = 11;
        currentYear--;
    };

    setNewDate();
    getHolidays();

};

function nextMonth() {
    if (currentMonth !== 11) {
        currentMonth++;
    } else {
        currentMonth = 0;
        currentYear++;
    };
    setNewDate();
    getHolidays();

};

function setNewDate() {
    currentDate.setFullYear(currentYear, currentMonth, currentDay);
    calendarMonth.textContent = monthArray[currentMonth];
    calendarYear.textContent = currentYear.toString();
    calendarDay.textContent = "";
    writeMonth(currentMonth);
    isWeekend(currentMonth);
};

function getTotalDays(month) {
    if (month === -1) {
        month = 11;
    }

    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        case 1:
            if (isLeap() == true) {
                return 29;
            } else {
                return 28;
            }
    }
};

function writeMonth(month) {
    arrayDias.length = 0;
    for (let i = startDay(); i > 0; i--) {
        calendarDay.innerHTML += `<div class= "calendar__item"></div>`;
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        calendarDay.innerHTML += `<div class= "calendar__day calendar__item" id="day${i}">${i}</div>`
        arrayDias.push([i, 0]);
    }
};

// Reconocer dias de semana y finde
function isWeekend(month) {
    for (let i = 1; i <= getTotalDays(month); i++) {
        currentDate.setFullYear(currentYear, currentMonth, i);
        diaSemana = currentDate.getDay();
        if (diaSemana == 0 || diaSemana == 6) {
            arrayDias[i - 1][2] = 'feriado'
        } else {
            arrayDias[i - 1][2] = 'habil'
        }

        arrayDias[i - 1][3] = [];
        if (diaSemana == 0 || diaSemana == 6) {
            let weekendDay = document.getElementById('day' + i);
            weekendDay.classList.add('weekendDay')
        };
    };
};

function getHolidays() {
    $.get(GETURL, function (respuesta, estado) {

        if (estado == "success") {
            let holidays = (respuesta.response.holidays);

            holidays.filter(function (element) {
                element.date.datetime.month
                arrayHolidays.push({ mes: element.date.datetime.month, dia: element.date.datetime.day })
                feriadosDelMes = arrayHolidays.filter(e => e.mes == currentMonth);
            })
        } else {
            console.log("Error");
        }
        console.log(`Los feriados del mes seleccionado son: ${JSON.stringify(feriadosDelMes)}`);
        console.log(`Los feriados del año son: ${JSON.stringify(arrayHolidays)}`);
        console.log(`El estado de la solicitud asíncrona es: ${JSON.stringify(estado)}`);
    })
}



