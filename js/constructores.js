// Constructor que permite crear Hospital para luego poder reutilizarlo en proximas sesiones
function Hospital(nombre, arraySectores) {
    this.nombre = nombre;
    this.sectores = arraySectores;

    this.getSectores = function () {
        return this.sectores;
    }
    JSON.stringify(localStorage.setItem('hospitalName', this.nombre))
    JSON.stringify(localStorage.setItem('sectores:', JSON.stringify(this.sectores)));
};

// Constructor que crea objetos medico dentro del ArrayMedicos
function DatosMedico(nombre, guardiasSemana, guardiasFinde, grupo, diaLibre, sector) {
    this.nombre = nombre;
    this.guardiasSemana = guardiasSemana;
    this.guardiasFinde = guardiasFinde;
    this.grupo = grupo;
    this.diaLibre = diaLibre;
    this.sector = sector;
}


