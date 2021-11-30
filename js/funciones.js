/////////// APLICACIÓN //////////////

// Función para clonar los arraysDias y arrayMédicos para luego ir probando posibles calendarios
function crearArraysModificables() {
    arrayDias = JSON.parse(JSON.stringify(arrayDiasLimpio))
    Object.setPrototypeOf(arrayDias, Object.getPrototypeOf(arrayDiasLimpio));
    arrayMedicos = JSON.parse(JSON.stringify(arrayMedicosLimpio))
    Object.setPrototypeOf(arrayMedicos, Object.getPrototypeOf(arrayMedicosLimpio));
}

// Funciones para contar la cantidad de guardias totales que se deben realizar en el mes.
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

// Funciónes para que en cada iteracion de comprobarCondiciones() elija como primer médico al que menos guardias haya hecho hasta el momento y compruebe si cumple las condiciones
function medicosOrdenadosPorGuardiasSemana() {
    arrayMedicos.sort((a, b) => {
        if (a.guardiasSemana > b.guardiasSemana) {
            return -1;
        } else if (a.guardiasSemana == b.guardiasSemana) {
            return 0
        } else {
            return 1;
        }
    })
    return arrayMedicos
}

function medicosOrdenadosPorGuardiasFinde() {
    arrayMedicos.sort((a, b) => {
        if (a.guardiasFinde > b.guardiasFinde) {
            return -1;
        } else if (a.guardiasFinde == b.guardiasFinde) {
            return 0
        } else {
            return 1;
        }
    })
    return arrayMedicos
}

// FUNCIÓN PRINCIPAL:
// 1- Obtengo el día de la iteración del arrayDias el cual tiene la misma longitud que los días del mes actual. 
// 2- En la posición[2] del arrayDias se pusheó feriado o habil segun los el número de dia (0-6) obtenido con el metodo .getDay() en la sección de calendario. Además en el API obtenido por AJAX obtengo los dias feriados de cada mes asignandoles también el valor "feriado" en el array 
// 3- En caso de que sea "feriado" ordeno el array de médicos dependiendo de quien hizo menos guardias de fin de semana hasta el moemento y selecciono el primero.
// 4- Compruebo las condiciones usando funciones que me permiten saber si ya esta de guardia ese mismo día o el día anterior (no puede hacer dos días seguido de guardia). En caso de que cumpla las condiciones se pusheará a la posición [3] del arrayDias y se le restará una guardia de semana o de finde según corresponda. En caso de que no cumpla con las condiciones se pasará al siguiente médico en el array ordenado. Cada vez que se pushea un médico se reordena el array.
// 5- Igual a lo anterior pero cuando ordenando a los médicos según guardias de semana disponibles.

function comprobarCondiciones(i) {
    // 1 -
    let dia = (i - 1);
    console.log(dia);
    // 2 -
    diaDeLaSemana = arrayDias[dia][2]
    // 3-
    if (diaDeLaSemana == 'feriado') {
        medicosOrdenadosPorGuardiasFinde();

        for (medico of arrayMedicos) {
            console.log(medico);
            // 4-        
            if (medico.guardiasFinde > 0) {
                let yaEstaDeGuardias = estaDeGuardia(medico, dia);
                console.log(yaEstaDeGuardias);
                let yaEstaDiaAnterior = diaAnterior(medico, dia)
                console.log(yaEstaDiaAnterior);
                let mismoGrupo = grupos(medico, dia);
                console.log(mismoGrupo);

                if (medico.diaLibre != (dia + 1)) {
                    console.log('No es su dia libre');

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
                                break;
                            } else {
                                console.log('Hay alguien del mismo grupo');
                                continue;
                            }

                        } else {
                            console.log('Ya esta de guardia el mismo dia');
                            continue;
                        }
                    } else {
                        console.log('Ya esta el dia anterior');
                        continue;
                    };
                } else {
                    console.log('Es su dia libre');
                    continue;
                };

            } else {
                console.log("No hay mas medicos con guardias disponibles de finde");
                break;
            }
        }
    } else {
        // 5-
        console.log('Es dia habil');
        medicosOrdenadosPorGuardiasSemana();

        for (medico of arrayMedicos) {
            console.log(medico);
            if (medico.guardiasSemana > 0) {
                let yaEstaDeGuardias = estaDeGuardia(medico, dia);
                console.log(yaEstaDeGuardias);
                let yaEstaDiaAnterior = diaAnterior(medico, dia)
                console.log(yaEstaDiaAnterior);
                let mismoGrupo = grupos(medico, dia);
                console.log(mismoGrupo);

                if (medico.diaLibre != (dia + 1)) {
                    console.log('No es su dia libre');

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
                                break;
                            } else {
                                console.log('Hay alguien del mismo grupo');
                                continue;
                            }

                        } else {
                            console.log('Ya esta de guardia el mismo dia');
                            continue;
                        }
                    } else {
                        console.log('Ya esta el dia anterior');
                        continue;
                    };
                } else {
                    console.log('Es su dia libre');
                    continue;
                };
            } else {
                console.log('No quedan medicos con guardias de semana');
                break;
            }
        }
    }
}

// Funcion para restar guardias según corresponda
function restarGuardias(medico, dia) {
    if (dia == 'feriado') {
        medico.guardiasFinde--;
    } else {
        medico.guardiasSemana--;
    };
};

// Función para saber si estuvo de guardia el día anterior
function diaAnterior(medico, i) {
    if (i >= 1) {
        let diaAnterior = (i - 1)
        return arrayDias[diaAnterior][3].includes(medico)
    } else if (i == 0) {
        return false
    }
}

// Función para saber si ya está de guardia el mismo dia
function estaDeGuardia(medico, i) {
    return arrayDias[i][3].includes(medico)
}

// Función para saber si pertenece a algún grupo de rotación
function grupos(medico, i) {
    if (medico.grupo != "ninguno") {
        return arrayDias[i][3].some(element => element.grupo == medico.grupo)
    } else {
        console.log('ningun grupo');
        return false

    }
}

// TOAST//
const toastCont = document.querySelector('#toasts');
function createToast() {
    let toastEl = document.createElement('div');
    toastEl.classList.add('toast');
    toastEl.classList.add('show');
    toastEl.innerHTML = `
        <span class="fas fa-check-circle"></span>
        <span class="msg">Agregado correctamente</span>
    `;
    toastCont.appendChild(toastEl);

    setTimeout(() => toastEl.remove(), 2000);
}

// MODAL //
const modalCont = document.querySelector('#modalCont');
//const modalBtn = document.querySelector('#btnModal');
function createModal() {
    modalCont.classList.add('showModal')
}
$('#btnModal').click(() => {
    modalCont.classList.remove('showModal')
})

// FUNCIONES CALENDARIO //
// Funciones para detectar si es año bisiesto
function isLeap() {
    return ((currentYear % 100 !== 0) && (currentYear % 4 == 0) || currentYear % 400 == 0);
};

// Función para detectar que día comienza el mes
function startDay() {
    let start = new Date(currentYear, currentMonth, 1);
    if ((start.getDay() - 1) == -1) {
        return 6;
    } else {
        return ((start.getDay()) - 1);
    }
};

// Función para permitir mostrar mes anterior al apretar flechas en la SECCIÓN UNO inclusive si seleccionamos Enero
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

// Función para permitir mostrar mes siguiente al apretar flechas en la SECCIÓN UNO inclusive si seleccionamos Diciembre
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

// Función que actualiza los datos del mes con el que trabajaremos
function setNewDate() {
    currentDate.setFullYear(currentYear, currentMonth, currentDay);
    calendarMonth.textContent = monthArray[currentMonth];
    calendarYear.textContent = currentYear.toString();
    calendarDay.textContent = "";
    writeMonth(currentMonth);
    isWeekend(currentMonth);
};

// Función para obtener cantidad de días según mes y permitirnos renderizarlo
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

// Renderizado del calendario en el DOM y creación del arrayDiasLimpio en el cual la posicion [1] corresponde al dia del mes.
function writeMonth(month) {
    arrayDiasLimpio.length = 0;
    for (let i = startDay(); i > 0; i--) {
        calendarDay.innerHTML += `<div class= "calendar__item"></div>`;
    }

    for (let i = 1; i <= getTotalDays(month); i++) {

        calendarDay.innerHTML += `<div class= "calendar__day calendar__item" id="day${i}">${i}                            
                                    </div>`
        arrayDiasLimpio.push([i, 0]);
    }
};

// Reconocer dias de semana y finde y pushearlo en la posicion [2] del arrayDiasLimpio
function isWeekend(month) {
    for (let i = 1; i <= getTotalDays(month); i++) {
        currentDate.setFullYear(currentYear, currentMonth, i);
        diaSemana = currentDate.getDay();
        if (diaSemana == 0 || diaSemana == 6) {
            arrayDiasLimpio[i - 1][2] = 'feriado'
        } else {
            arrayDiasLimpio[i - 1][2] = 'habil'
        }

        arrayDiasLimpio[i - 1][3] = [];
        if (diaSemana == 0 || diaSemana == 6) {
            let weekendDay = document.getElementById('day' + i);
            weekendDay.classList.add('weekendDay')
        };
    };
};

// Funcion AJAX para utilizar API de feriados del año según el país y permitir asignar a dichos días el valor "feriado" en la posición [2] en el arrayDiasLimpios
function getHolidays() {

    $.get(GETURL, function (respuesta, estado) {

        if (estado == "success") {
            let holidays = (respuesta.response.holidays);
            arrayHolidays = [];
            if (currentMonth == 11) {
                arrayHolidays.push({ mes: 12, dia: 24 }, { mes: 12, dia: 31 })
            }
            holidays.filter(function (element) {
                element.date.datetime.month
                arrayHolidays.push({ mes: element.date.datetime.month, dia: element.date.datetime.day })

                feriadosDelMes = arrayHolidays.filter(e => e.mes == (currentMonth + 1));

                for (dia of feriadosDelMes) {
                    arrayDiasLimpio.find(function (element) {
                        if (element[0] == dia.dia) {
                            element[2] = "feriado"
                        }
                    })
                }
            })
        } else {
            console.log("Error");
        }
        console.log(`Los feriados del mes seleccionado son: ${JSON.stringify(feriadosDelMes)}`);
        console.log(`El estado de la solicitud asíncrona es: ${JSON.stringify(estado)}`);
    })
}

// Funciones para descargar calendario y resumen de guardias

$('#downloadButton').click(function () {
    let descarga = document.getElementById('calendar');
    let tabla = document.getElementById('seccionesCalendario')
    let divs = tabla.children[0].children[2].children[0].children[0].children;

    for (div of divs) {
        div.classList.add('borde');
    }

    let opt = {
        margin: 10,
        filename: `${monthArray[currentMonth]}.pdf`,
        html2canvas: { scale: 4 },
        jsPDF: { orientation: 'landscape' }
    };

    html2pdf().set(opt).from(descarga).save();

})

// MODAL FORMULARIO //

const formCont = document.querySelector('#modalForm');

function showForm() {
    formCont.classList.add('showForm')
}

$('#closeForm').click(() => {

    formCont.classList.remove('showForm')
})

$('#linkForm').click(() => {
    showForm();
})

// $('#formBtn').click((e) => {
//     e.preventDefault;
// })



