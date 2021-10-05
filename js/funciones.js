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

function eliminar(event) {
    console.log(event.target.value);
}
