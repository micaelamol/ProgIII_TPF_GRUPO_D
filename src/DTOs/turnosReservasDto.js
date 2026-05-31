export default class TurnosReservasDTO {

    constructor(object){
        this.id_medico = object.id_medico
        this.id_paciente = object.id_paciente
        this.fecha_hora = object.fecha_hora
    }

}