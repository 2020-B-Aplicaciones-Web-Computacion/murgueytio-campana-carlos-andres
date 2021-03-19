import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {DesarrolladoraService} from "./desarrolladora.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {DesarrolladoraEntity} from "./desarrolladora.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Controller('desarrolladora')
export class DesarrolladoraController {
    constructor(
        private _desarrolladoraService: DesarrolladoraService,
    ) {
    }

    @Get('crear-dev')
    crearDesarrolladoraView(
        @Res()
            response
    ) {
        response.render('desarrolladoras/creardev');
    }

    @Post('crear-dev')
    async crearDesarrolladora(
        @Body()
            parametrosCuerpo,
        @Res() response
    ) {
        const respuesta = await this._desarrolladoraService.desarrolladoraEntity.save({
            nombreDev: parametrosCuerpo.nombreDev,
            anioDev: parametrosCuerpo.anioDev
        });
        response.redirect('/desarrolladora/desarrolladoras?mensaje=Se creó la nueva desarrolladora: ' + parametrosCuerpo.nombreDev + ' con su respectivo año: ' + parametrosCuerpo.anioDev);
    }


    @Get('desarrolladoras')
    async obtenerDesarrolladora(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 10;
        let skip = 0;
        let order = 'ASC';
        if (parametrosConsulta.take) {
            take = parametrosConsulta.take;
        }
        if (parametrosConsulta.skip) {
            skip = parametrosConsulta.skip;
        }
        if (parametrosConsulta.order) {
            order = parametrosConsulta.order as 'ASC' | 'DESC';
        }

        let consultaWhereANd: FindConditions<DesarrolladoraEntity>[] = [
            {
                idDev: 2,
                nombreDev: 'FromSoftware'
            }
        ];

        let consultaWhereOR: FindConditions<DesarrolladoraEntity>[] = [  //Si el arreglo solo tiene un objeto = AND, si tiene mas de uno= OR
            {
                nombreDev: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),


            },
            {
                anioDev: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),

            }
        ]

        let consulta: FindManyOptions<DesarrolladoraEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                idDev: order === 'ASC' ? 'ASC' : 'DESC',
            }
        };

        let datos = await this._desarrolladoraService.desarrolladoraEntity.findAndCount(consulta);
        response.render('./desarrolladoras/home', {
            datos: datos,
            parametrosConsulta: parametrosConsulta
        });

    }

    @Get('borrar-dev')
    async borrarDevView(
        @Res()
            response
    ) {
        response.render('desarrolladoras/borrardev');
    }

    @Post('borrar-dev')
    async borrarDev(
        @Body()
            parametrosCuerpo,
        @Res() response
    ) {
        console.log(parametrosCuerpo);
        const respuesta = await this._desarrolladoraService.desarrolladoraEntity.delete({
            idDev: parametrosCuerpo.idDev
        });
        response.redirect('/desarrolladora/desarrolladoras?mensaje=Se eliminó el registro de: ' + parametrosCuerpo.nombreDev);
    }

}