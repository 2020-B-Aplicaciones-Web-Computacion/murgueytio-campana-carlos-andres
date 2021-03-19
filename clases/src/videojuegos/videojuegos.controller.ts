import {Body, Controller, Delete, Get, Post} from "@nestjs/common";
import {VideojuegosService} from "./videojuegos.service";

@Controller('videojuegos')
export class VideojuegosController {
    constructor(
        private _videojuegosService: VideojuegosService,
    ) {
    }

    @Post('asdasd')
    crearVideojuego(
        @Body()
            parametrosCuerpo
    ) {
        return this._videojuegosService.videojuegosEntity.save({
            nombre: parametrosCuerpo.nombre,
            anioVideojuego: parametrosCuerpo.anio,
            consola: parametrosCuerpo.consola,
            genero: parametrosCuerpo.genero
        });
    }

    @Get('videojuegos')
    obtenerVideojuegos() {
        return this._videojuegosService.videojuegosEntity.find();

    }

    @Post('')
    async crearVideojuegoPost(
        @Body()
            parametrosCuerpo,
    ) {
        return await this._videojuegosService.videojuegosEntity.save({
                nombre: parametrosCuerpo.nombre,
                anioVideojuego: parametrosCuerpo.anio,
                consola: parametrosCuerpo.consola,
                genero: parametrosCuerpo.genero,
                fkDesarrolladora : parametrosCuerpo.fkDesarrolladora
            }
        )
    }

    @Get('borrarVideojuego')
    async borrarVideojuego(
        @Body()
        parametrosCuerpo

    ){
        return await this._videojuegosService.videojuegosEntity.delete({
            idVid: parametrosCuerpo.idVideojuego
        })

    }

}