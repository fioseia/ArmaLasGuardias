// - Permitir crear un "hospital" para guardar datos ingresados en local storage y poder reutilizar nombres en proximos meses.
$('#hospitalNameForm').submit(function (e) {
    e.preventDefault();
    let div = e.target.children[0]
    let hospitalInfo = new Hospital(div.children[1].value, arraySectores)
    let hospitalInfoStorage = JSON.stringify(hospitalInfo);
    localStorage.setItem('hospitalInfo', hospitalInfoStorage)
});

let prevHospitalName = localStorage.getItem('hospitalName');
$('#hospitalName__nombre').attr('value', prevHospitalName);

// - Permitir crear más de un sector de guardia y preguntar cuantas personas deben estar de guardia por sector por dia idealmente.

$('#sectoresBtn').click(function () {
    arraySectores.push({ nombre: ($('#sectorName').val()), numeroMedicos: parseInt(($('#sectorCantidadMedicos').val())) })
    $('#sectoresDatos').append(`
    <tr>
    <td>${($('#sectorName').val())}</td>
    <td>${($('#sectorCantidadMedicos').val())}</td>
    `)

    $('#medico__sector').append(`
    <option value="${($('#sectorName').val())}">${($('#sectorName').val())}</option>
    `)

})



// - Preguntar si desea crear grupos de rotación para que los médicos de dicho grupo no realicen guardias los mismos días y tomar datos de los usuarios cargados (Para que no estén postguardia juntos).
$('#gruposRotacionCheckSi').click(function () {
    $('.gruposRotacionSi').css("visibility", "visible");
})

$('#gruposRotacionCheckNo').click(function () {
    $('.gruposRotacionSi').css("visibility", "hidden");
})

$('#gruposBtn').click(function () {
    arrayGrupos.push($('#gruposRotacionName').val())
    $('#medico__grupo').append(`
        <option class="${$('#gruposRotacionName').val()}"value="${$('#gruposRotacionName').val()}">${$('#gruposRotacionName').val()}</option>
        `)
});

// - Ingresar lista de medicos que harán guardias y permitir visualizar datos en tabla. Dar la opcion de eliminar nombre de la lista.
$('#medico__cargar').click(function () {
    const obj = new DatosMedico(($('#medico__nombre').val()), parseInt(($('#medico__guardiasSemana').val())), parseInt(($('#medico__guardiasFinde').val())), ($('#medico__grupo').val()), ($('#medico__diaLibre').val()), ($('#medico__diaFijo').val()), ($('#medico__sector').val()))

    $('#tablaDatos').append(`
    <tr class="${obj.grupo}"
        id="${obj.nombre}">
        <td>${obj.nombre}</td>
        <td>${obj.guardiasSemana}</td>
        <td>${obj.guardiasFinde}</td>
        <td>${obj.grupo}</td>
        <td>${obj.diaLibre}</td>
        <td>${obj.diaFijo}</td>
        <td>${obj.sector}</td>
        <td><input type="button" value="Eliminar" id="eliminar${obj.nombre}"></td>
    </tr>
`)
    arrayMedicos.push(obj)



    $(`#eliminar${obj.nombre}`).click(function () {
        $(this).parent().parent().remove();
        let encontrado = arrayMedicos.find(elemento => elemento.nombre == obj.nombre)

        arrayMedicos.splice((arrayMedicos.indexOf(encontrado)), 1);

    })
});
// Crear array con medicos que estan rotando en mismo sector

// Seleccionar medicos aleatorios desde array gener
$('#btn-vamos').click(function () {
    for (let i = 0; i < arrayDias.length; i++) {
        armarSectores(i)
    }

    console.log(arrayDias);
    for (medico of arrayMedicos) {
        console.log(medico.guardiasSemana)
        console.log(medico.guardiasFinde);

    }
})











