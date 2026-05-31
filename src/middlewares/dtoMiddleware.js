import TurnosReservasDTO from '../DTOs/turnosReservasDto.js'

export default class TransformarDTO {
    turnosReservasCrearDTO = (req, res, next) => {
        req.dto = new TurnosReservasDTO(req.body)
        next()
    }
}