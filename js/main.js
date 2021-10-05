// - Permitir crear un "hospital" para guardar datos ingresados en local storage y poder reutilizar nombres en proximos meses.
$('#hospitalNameForm').submit(function (e) {
    e.preventDefault();
    let hospitalInfo = new Hospital(e.target.children[1].value, arraySectores)
    console.log(hospitalInfo);
    let hospitalInfoStorage = JSON.stringify(hospitalInfo);
    localStorage.setItem('hospitalInfo', hospitalInfoStorage)
});

let prevHospitalName = localStorage.getItem('hospitalName');
$('#hospitalName__nombre').attr('value', prevHospitalName);

// - Permitir crear más de un sector de guardia y preguntar cuantas personas deben estar de guardia por sector por dia idealmente.

$('#sectoresBtn').click(function () {
    arraySectores.push({ nombre: ($('#sectorName').val()), numeroMedicos: ($('#sectorCantidadMedicos').val()) })
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
        <option value="${$('#gruposRotacionName').val()}">${$('#gruposRotacionName').val()}</option>
        `)
    console.log(arrayGrupos);
});

// - Ingresar lista de medicos que harán guardias y permitir visualizar datos en tabla. Dar la opcion de eliminar nombre de la lista.
$('#medico__cargar').click(function () {
    const obj = new DatosMedico(($('#medico__nombre').val()), ($('#medico__guardiasSemana').val()), ($('#medico__guardiasFinde').val()), ($('#medico__sector').val()), ($('#medico__diaLibre').val()), ($('#medico__diaFijo').val()), ($('#medico__sector').val()))

    $('#tablaDatos').append(`
    <tr id="${obj.nombre}">
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
        console.log(arrayMedicos);
    })
    console.log(arrayMedicos);
});









