import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {VideojuegosService} from "./videojuegos.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {VideojuegosEntity} from "./videojuegos.entity";

@Controller('videojuegos')
export class VideojuegosController {
    constructor(
        private _videojuegosService: VideojuegosService,
    ) {
    }

    @Get('crear-vid')
    crearVidView(
        @Res()
            response,
        @Query()
            parametrosCuerpo
    ) {
        //console.log(parametrosCuerpo.idDev);
        response.render('./videojuegos/crearVid',{parametrosCuerpo:parametrosCuerpo});
    }

    @Post('crear-vid')
    async crearVid(
        @Body()
            parametrosCuerpo,
        @Res() response
    ) {
        //console.log(parametrosCuerpo);
        const respuesta = await this._videojuegosService.videojuegosEntity.save({
            nombre: parametrosCuerpo.nombre,
            anioVideojuego: parametrosCuerpo.anioVideojuego,
            consola: parametrosCuerpo.consola,
            genero: parametrosCuerpo.genero,
            fkDev: parametrosCuerpo.idDev
        });
        response.redirect('/videojuegos/videojuegos?mensaje=Se creó el videojuego ' + parametrosCuerpo.nombre);
    }

    @Get('videojuegos')
    async obtenerVideojuegos(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 10;
        let skip = 0;
        let order = 'ASC';
        if (parametrosConsulta.busqueda) {
            let porcent = '%';
            let buscarFix1 = porcent.concat(parametrosConsulta.busqueda.toString());
            const buscarFix = buscarFix1.concat(porcent);
            //console.log(buscarFix);
            parametrosConsulta.busqueda = buscarFix;
        }
        if (parametrosConsulta.take) {
            take = parametrosConsulta.take;
        }
        if (parametrosConsulta.skip) {
            skip = parametrosConsulta.skip;
        }
        if (parametrosConsulta.order) {
            order = parametrosConsulta.order;
        }
        let consultaWhereOR: FindConditions<VideojuegosEntity>[] = [  //Si el arreglo solo tiene un objeto = AND, si tiene mas de uno= OR
            {
                fkDev: Like(parametrosConsulta.idDev ? parametrosConsulta.idDev : '%%'),
                nombre: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),
            },
            {
                fkDev: Like(parametrosConsulta.idDev ? parametrosConsulta.idDev : '%%'),
                anioVideojuego: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),
            }
        ]

        let consulta: FindManyOptions<VideojuegosEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                idVid: order === 'ASC' ? 'ASC' : 'DESC',
            }
        };
        let datos = await this._videojuegosService.videojuegosEntity.findAndCount(consulta);
        response.render('./videojuegos/homeVideojuegos', {
            datos: datos,
            parametrosConsulta: parametrosConsulta
        });
    }

    @Get('borrar-vid')
    async borrarVid(
        @Res()
            response,
        @Query()
            parametrosConsulta
    ) {
        const respuesta = await this._videojuegosService.videojuegosEntity.delete(
            parametrosConsulta.idVid);
        response.redirect('/videojuegos/videojuegos?mensaje=Se eliminó el registro satisfactoriamente');
    }

    @Get('modificar-vid')
    async modificarVid(
        @Res()
            response,
        @Query()
            parametrosConsulta
    ) {

        response.render('videojuegos/modificarVid', {parametrosConsulta: parametrosConsulta});
    }

    @Post('modificar-vid')
    async modificarVidPost(
        @Body()
            parametrosCuerpo,
        @Res() response
    ) {
        const respuesta = await this._videojuegosService.videojuegosEntity.update({idVid: parametrosCuerpo.idVid}, {
            nombre: parametrosCuerpo.nombre,
            anioVideojuego: parametrosCuerpo.anioVideojuego,
            consola: parametrosCuerpo.consola,
            genero: parametrosCuerpo.genero,
            fkDev: parametrosCuerpo.fkDev
        });
        response.redirect('/videojuegos/videojuegos?mensaje=Se modificó el videojuego: ' + parametrosCuerpo.nombre + ' idforanea :' + parametrosCuerpo.fkDev);
    }

}