import {Module} from "@nestjs/common";
import {DesarrolladoraService} from "./desarrolladora.service";
import {DesarrolladoraController} from "./desarrolladora.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DesarrolladoraEntity} from "./desarrolladora.entity";

@Module({
    imports :[
        TypeOrmModule.forFeature(
            [DesarrolladoraEntity],
            'default'
        )
    ],

    controllers: [
        DesarrolladoraController

    ],

    providers: [
        DesarrolladoraService
    ],

    exports: [
        DesarrolladoraService
    ]
})
export class DesarrolladoraModule{

}