import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {DesarrolladoraService} from "./desarrolladora.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {DesarrolladoraEntity} from "./desarrolladora.entity";

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
        if(parametrosConsulta.busqueda){
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
        if(parametrosConsulta.pag){
            if(parametrosConsulta.pag>1){
                skip = (parseInt(parametrosConsulta.pag)* 10)-10;
            }
        }

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
            response,
        @Query()
            parametrosConsulta
    ) {
        const respuesta = await this._desarrolladoraService.desarrolladoraEntity.delete(
            parametrosConsulta.idDev);
        response.redirect('/desarrolladora/desarrolladoras?mensaje=Se eliminó el registro satisfactoriamente');
    }

    @Get('modificar-dev')
    async modificarDev(
        @Res()
            response,
        @Query()
            parametrosConsulta
    ) {
        response.render('desarrolladoras/modificarDev', {parametrosConsulta: parametrosConsulta});
    }

    @Post('modificar-dev')
    async modificarDevPost(
        @Body()
            parametrosCuerpo,
        @Res() response
    ) {
        const respuesta = await this._desarrolladoraService.desarrolladoraEntity.update({idDev:parametrosCuerpo.idDev},{
            nombreDev: parametrosCuerpo.nombreDev,
            anioDev: parametrosCuerpo.anioDev
        });
        response.redirect('/desarrolladora/desarrolladoras?mensaje=Se modificó la desarrolladora: ' + parametrosCuerpo.nombreDev + ' con su respectivo año: ' + parametrosCuerpo.anioDev);
    }

}