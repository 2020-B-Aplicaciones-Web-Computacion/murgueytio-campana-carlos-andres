import {Body, Controller, Post} from '@nestjs/common';
import {MascotaService} from "./mascota.service";

@Controller('mascota')
export class MascotaController{
    constructor(private _mascotaService: MascotaService){

    }
    @Post('')
    async crearMascotaREST(
        @Body() parametrosCuerpo,
    ){
        return await this._mascotaService.mascotaEntity.save({
            nombre: parametrosCuerpo.nombre,
            fkUsuario : parametrosCuerpo.fkUsuario,
        })

    }
}