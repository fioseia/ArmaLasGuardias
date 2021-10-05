function Hospital(nombre, arraySectores) {
    this.nombre = nombre;
    this.sectores = arraySectores;

    this.getSectores = function () {
        return this.sectores;
    }
    JSON.stringify(localStorage.setItem('hospitalName', this.nombre))
    JSON.stringify(localStorage.setItem('sectores:', JSON.stringify(this.sectores)));
};


function DatosMedico(nombre, guardiasSemana, guardiasFinde, grupo, diaLibre, diaFijo, sector) {
    this.nombre = nombre;
    this.guardiasSemana = guardiasSemana;
    this.guardiasFinde = guardiasFinde;
    this.grupo = grupo;
    this.diaLibre = diaLibre;
    this.diaFijo = diaFijo;
    this.sector = sector;
}


