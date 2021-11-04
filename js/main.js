// Cuando la ventana cargue ejecuto funcion que tiene un AJAX request
$(window).ready(getHolidays())

////// INPUTS DE DATOS //////

//// PRIMERA SECCION (VER CALENDARIO.JS)////

//// SEGUNDA SECCION ////
// Permitir crear un "hospital" para guardar datos ingresados en local storage y poder reutilizar nombres en proximos meses.
$('#hospitalNameForm').submit(function (e) {
    console.log("logueado1");
    e.preventDefault();
    let div = e.target.children[0]
    let hospitalInfo = new Hospital(div.children[1].value, arraySectores)
    let hospitalInfoStorage = JSON.stringify(hospitalInfo);
    localStorage.setItem('hospitalInfo', hospitalInfoStorage)
});

// En caso de ya haya un dato guardado en storage lo recupero
let prevHospitalName = localStorage.getItem('hospitalName');
$('#hospitalName__nombre').attr('value', prevHospitalName);

// - Permitir crear más de un sector de guardia y preguntar cuantas personas deben estar de guardia por sector por dia idealmente.
const inputSectName = document.getElementById('sectorName');

inputSectName.addEventListener('keydown', keyPressed, false);

function keyPressed(key) {
    if (key.keyCode == 13) {
        if ($('#sectorName').val() != "") {
            $('#sectoresDatos').append(`
        <div id="${($('#sectorName').val())}" class="sectorOption">
            <td>${($('#sectorName').val().toUpperCase())}</td>
            <td>
            <div>
            <span class="contadorBtn fas fa-minus" id="${$('#sectorName').val()}Menos"></span>
            <span id="${$('#sectorName').val()}CantidadMedicos" class="formInput">0</span>
            <span class="contadorBtn fas fa-plus" id="${$('#sectorName').val()}Mas"></span>
            </div>
            <span class="fas fa-times" id="eliminar${$('#sectorName').val()}"></span>
            </td>
        </div>
        `)
            // Contador para ingresar cantidad de guardias por sector //
            const valorMedicos = document.getElementById(`${$('#sectorName').val()}CantidadMedicos`)
            const sumarMedicos = document.getElementById(`${$('#sectorName').val()}Mas`)
            const restarMedicos = document.getElementById(`${$('#sectorName').val()}Menos`)
            const eliminarSector = document.getElementById(`eliminar${$('#sectorName').val()}`)
            let numero = 0;

            sumarMedicos.addEventListener('click', () => {
                numero++;
                valorMedicos.innerHTML = numero;
            })

            restarMedicos.addEventListener('click', () => {
                if (numero == 0) {
                } else {
                    numero--;
                    valorMedicos.innerHTML = numero;
                }
            })

            // Opción para eliminar sector creado //
            eliminarSector.addEventListener('click', () => {
                eliminarSector.parentElement.remove()
            })
        }
    }
}



// Creo un array con el nombre de los sectores (se repite el nombre dependiendo de la cantidad de médicos que deben realizar guardias en dicho sector) //
const colecSectores = document.getElementsByClassName('sectorOption')
$('#sectoresBtn').click(function () {
    arraySectores = [];
    for (sector of colecSectores) {
        let sectorNom = sector.id;
        let sectCant = parseInt(sector.children[0].children[1].textContent)

        for (let i = 0; i < sectCant; i++) {
            arraySectores.push(sectorNom.toUpperCase())
        }
    }

    // Ofrezco el nombre de los sectores ingresados como opciones al momento de ingresar los datos para permitir elegir si un médico debe realizar guardias en un sector fijo //
    $('#medico__sector').append(`
    <option value="${($('#sectorName').val())}">${($('#sectorName').val())}</option>
    `)
})

/// TERCERA SECCIÓN ///

// Preguntar si desea crear grupos de rotación para que los médicos de dicho grupo no realicen guardias los mismos días y tomar datos de los usuarios cargados (Para que no estén postguardia juntos).
$('#gruposRotacionCheckSi').click(function () {
    let input = document.getElementById('gruposRotacionSi')
    input.classList.remove('hidden')
})

$('#gruposRotacionCheckNo').click(function () {
    let input = document.getElementById('gruposRotacionSi')
    input.classList.add('hidden')
})

// Ofrezco nombre de los grupos de rotación como opciones al momento de ingresar los datos
$('#gruposBtn').click(function () {
    $('#medico__grupo').append(`
        <option class="${$('#gruposRotacionName').val()}"value="${$('#gruposRotacionName').val()}">${$('#gruposRotacionName').val()}</option>
        `)
});

//// CUARTA SECCIÓN ////
// Ingresar datos de los médicos incluyendo: 
//- Nombre o apellido del médicos
//- Cantidad de guardias de semana que debe realizar (Lunes a Viernes)
//- Cantidad de guardias de fin de semana que deberá realizar (Sábado, Domingo y Feriados)
//- Si corresponde elegir un grupo de rotación al que pertenece este mes
//- Permitir elegir un día libre en el cual no se le asignará guardia
//- Permitir elegir si debe realizar las guardias en un sector fijo

// Contador para sumar guardias de semana y finde
const sumGuardSemana = document.getElementById(`sumGuardSemana`)
const restGuardSemana = document.getElementById(`restGuardSemana`)
const sumGuardFinde = document.getElementById(`sumGuardFinde`)
const restGuardFinde = document.getElementById(`restGuardFinde`)
const guardiasSemana = document.getElementById(`medico__guardiasSemana`)
const guardiasFinde = document.getElementById(`medico__guardiasFinde`)
let numGuardiasSem = 0;
let numGuardiasFind = 0;

sumGuardSemana.addEventListener('click', () => {
    numGuardiasSem++;
    guardiasSemana.innerHTML = numGuardiasSem;
})

restGuardSemana.addEventListener('click', () => {
    if (numGuardiasSem == 0) {
    } else {
        numGuardiasSem--;
        guardiasSemana.innerHTML = numGuardiasSem;
    }
})

sumGuardFinde.addEventListener('click', () => {
    numGuardiasFind++;
    guardiasFinde.innerHTML = numGuardiasFind;
})

restGuardFinde.addEventListener('click', () => {
    if (numGuardiasFind == 0) {
    } else {
        numGuardiasFind--;
        guardiasFinde.innerHTML = numGuardiasFind;
    }
})

// Instancio objeto utilizando constructor DatosMedico por cada médico ingresado, muestro dichos datos en tabla de SECCION CINCO y pusheo dicho objeto en un array denominado arrayMedicosLimpio que contendrá todos los objetos "medicos" con sus respectivos atributos.
$('#medico__cargar').click(function () {
    const obj = new DatosMedico(($('#medico__nombre').val()), parseInt(($('#medico__guardiasSemana').text())), parseInt(($('#medico__guardiasFinde').text())), ($('#medico__grupo').val()), ($('#medico__diaLibre').val()), ($('#medico__sector').val()))

    $('#tablaDatosBody').append(`
    <tr class="${obj.grupo}"
        id="${obj.nombre}">
        <td>${obj.nombre.toUpperCase()}</td>
        <td>${obj.guardiasSemana}</td>
        <td>${obj.guardiasFinde}</td>
        <td>${obj.grupo.toUpperCase()}</td>
        <td>${obj.diaLibre}</td>
        <td>${obj.sector.toUpperCase()}</td>
        <td><span value="Eliminar" id="eliminar${obj.nombre}" class="fas fa-times"></span></td>
    </tr>
`)
    arrayMedicosLimpio.push(obj)

    createToast(); // Toast cuando agrego medico

    numGuardiasSem = 0;
    numGuardiasFind = 0;
    guardiasSemana.innerHTML = numGuardiasSem;
    guardiasFinde.innerHTML = numGuardiasFind;

    // Opción de eliminar médico
    $(`#eliminar${obj.nombre}`).click(function () {
        $(this).parent().parent().remove();
        let encontrado = arrayMedicosLimpio.find(elemento => elemento.nombre == obj.nombre)

        arrayMedicosLimpio.splice((arrayMedicosLimpio.indexOf(encontrado)), 1);
    })
});

////// APLICACIÓN ///////

//Al apretar botón en sección CINCO: 

$('#btn__seis').click(function () {
    console.log("btn1");
    // 1- Clono los arrayDias y arrayMedicos para poder modificarlos cada vez que apretamos el boton sin perder los arrays originales pudiendo resetear los valores de los clones según necesidad
    crearArraysModificables();

    // 2- Calculo el total de guardias por hacer y la cantidad de guardias disponibles según la cantidad de médicos y la cantidad de guardias de semana y de finde seleccionadas. En caso de que el número de guardias por hacer sea menor que la cantidad de guardias disponibles saltará un modal pidiendo al usuario que agregue más guardias o elimine la cantidad de guardias por sector en la sección DOS. En caso de que el número alcance se disparará funcion donde se comprobará condiciones de cada médico y los asignará de manera aleatoria a un día y a un sector de guardia. Dichos datos podrán verse en la posición [3] del arrayDias
    let diasDelMes = getTotalDays(currentMonth)
    let guardiasPorHacer = arraySectores.length * diasDelMes
    let findeDisponibles = guardiasDisponiblesFinde();
    let semanaDisponibles = guardiasDisponiblesSemana();
    let guardiasDisponiblesTotales = findeDisponibles + semanaDisponibles;

    if (guardiasDisponiblesTotales >= guardiasPorHacer) {
        try {
            //Debo asignar un médico por cada sector de guardia y por cada día del mes
            for (sector of arraySectores) {
                for (dia of arrayDias) {
                    comprobarCondiciones(dia[0])
                }
            }
        } catch (e) {
            console.log(e.message);
            crearArraysModificables();
            for (sector of arraySectores) {
                for (dia of arrayDias) {
                    comprobarCondiciones(dia[0])
                }
            }
        }
    } else {
        createModal();
    }

    console.log(arrayDias);

    // Resumen de cantidad de guardias que le sobran a cada médico
    for (medico of arrayMedicos) {
        console.log(`A ${JSON.stringify(medico.nombre)} le quedan ${JSON.stringify(medico.guardiasSemana)} guardias de semana y ${JSON.stringify(medico.guardiasFinde)} guardias de finde`);
    }
})

// Renderizado de médicos de guardia en cada dia del calendario
$('#btnCrearCalendario').click(function () {
    let nombreMes = document.getElementById('nombreMes')
    nombreMes.textContent = monthArray[currentMonth]
    //Ordeno el arraySectores segun nombre
    arraySectores.sort((a, b) => {
        if (a == b) {
            return -1;
        } return 1;
    })

    for (index in arrayDias) {
        let dia = (parseInt(index) + 1)
        //$(`#day${dia}`).prepend(`<div><p>${dia}</p></div>`)
        arrayDias[index][3].sort((a, b) => {
            if (a.sector != "ninguno") {
                return -1;
            } else {
                return 1;
            }
        })
        let nombreSectores = arraySectores.filter((element, index) => {
            return arraySectores.indexOf(element) === index;
        });

        // A cada dia lo divido en los sectores ingresados
        for (sector of nombreSectores) {
            $(`#day${dia}`).append(`
            <div id="${dia + sector}" class="itemCalend"><p>${sector}: </p></div>
            `)
        }

        // Si un médico seleccionó que sólo puede realizar guardias en un sector se lo asignará al mismo.
        for (sector of arraySectores) {
            for (element of arrayDias[index][3]) {
                console.log(element);
                if (element.sector == sector || element.sector == "ninguno") {
                    $(`#${dia + sector}`).append(`
                    <p>${(element.nombre).toUpperCase()}</p>
                    `)
                    arrayDias[index][3].splice(arrayDias[index][3].indexOf(element), 1);
                    break;
                } else {
                    continue;
                }
            }
        }
    }
})










