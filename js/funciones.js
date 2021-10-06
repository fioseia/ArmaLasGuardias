function numberSectores(value) {
    return parseInt(value)
};

/*function crearOpciones(array) {
    arrayGrupos = [];
    for (const opcion of array) {
        $('#medico__sector').append(`
        <option value="${opcion.value}">${opcion.value}</option>
        `)
    }
};*/

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

// function mismoGrupo() {
//     if 
// }
function comprobarGrupo() {

}

/*function comprobarCondiciones() {
    for (let i = 0; i <= diasFinales.length; i++) {
        fecha = setNewDate(2021, 07, i);
        let diaSemanaCondiciones = fecha.getDay();
        console.log(diaSemanaCondiciones);
    }
}*/


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
    for (let i = startDay(); i > 0; i--) {
        calendarDay.innerHTML += `<div class= "calendar__item"></div>`;
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        calendarDay.innerHTML += `<div class= "calendar__day calendar__item" id="day${i}">${i}</div>`
    }
};

// Reconocer dias de semana y finde
function isWeekend(month) {
    for (let i = 1; i <= getTotalDays(month); i++) {
        currentDate.setFullYear(currentYear, currentMonth, i);
        diaSemana = currentDate.getDay();
        if (diaSemana == 0 || diaSemana == 6) {
            let weekendDay = document.getElementById('day' + i);
            weekendDay.classList.add('weekendDay')
        };
    };
};
