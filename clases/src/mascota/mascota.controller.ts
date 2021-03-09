import {Body, Controller, Post} from '@nestjs/common';
import {MascotaService} from "./mascota.service";

@Controller('mascota')
export class MascotaController{
    constructor(private _mascotaService: MascotaService){

    }
    @Post('crear-mascota')
    async crearMascotaREST(
        @Body() parametrosCuerpo,
    ){
        await this._mascotaService.mascotaEntity.save({
            nombre: parametrosCuerpo.nombre,
            fkUsuario : 1,
        })

    }
}