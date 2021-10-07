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
    let puestos = arraySectores.length * medicosPorSector
    console.log(medicosPorSector);
};

function medicosDisponibles() {
    let medicosDisponibles = arrayMedicos.array.forEach(element => {
        medicosDisponibles += element.guardiasSemana + element.guardiasFinde
    });
}

function elegirMedicoAleatorio(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function comprobarCondiciones(i) {
    let dia = i;
    let diaDeLaSemana = arrayDias[dia][1]
    while (arrayDias[dia][0] == false) {
        let medico = elegirMedicoAleatorio(arrayMedicos)
        let yaEstaDeGuardias = yaEstaDeGuardia(medico, dia);
        let yaEstaDiaAnterior = diaAnterior(medico, dia)

        if ((medico.guardiasSemana > 0) && (medico.guardiasFinde > 0) && (medico.diaLibre != (i + 1)) && (medico.diaFijo == diaDeLaSemana || medico.diaFijo == "ninguno") && (yaEstaDiaAnterior == false) && (yaEstaDeGuardias == false)) {
            arrayDias[dia][2].push(medico.nombre)
            arrayDias[i][0] = true;
            restarGuardias(medico, dia)
            continue;
        } else {
            break;
        }
    }

};

function restarGuardias(medico, i) {
    if (arrayDias[i][1] == 6 || arrayDias[i][1] == 0) {
        medico.guardiasFinde--;
    } else {
        medico.guardiasSemana--;
    };
};

function armarSectores(d) {
    let dia = d;
    arrayDias[dia][2] = [];
    for (let i = 0; i < arraySectores.length; i++) {
        arrayDias[dia][0] = false;
        comprobarCondiciones(dia)
    };
};

function diaAnterior(medico, i) {
    if (i >= 1) {
        let diaAnterior = (i - 1)
        return arrayDias[diaAnterior][2].includes(medico.nombre)
    } else if (i = 0) {
        return false
    }
}

function yaEstaDeGuardia(medico, i) {
    return arrayDias[i][2].includes(medico.nombre)
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

};

function nextMonth() {
    if (currentMonth !== 11) {
        currentMonth++;
    } else {
        currentMonth = 0;
        currentYear++;
    };
    setNewDate();

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
        arrayDias.push([false]);
    }
};

// Reconocer dias de semana y finde
function isWeekend(month) {
    for (let i = 1; i <= getTotalDays(month); i++) {
        currentDate.setFullYear(currentYear, currentMonth, i);
        diaSemana = currentDate.getDay();
        arrayDias[i - 1][1] = diaSemana
        if (diaSemana == 0 || diaSemana == 6) {
            let weekendDay = document.getElementById('day' + i);
            weekendDay.classList.add('weekendDay')
        };
    };
};
