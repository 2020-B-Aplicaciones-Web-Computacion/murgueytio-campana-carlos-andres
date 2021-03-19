import {Module} from "@nestjs/common";
import {VideojuegosController} from "./videojuegos.controller";
import {VideojuegosService} from "./videojuegos.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VideojuegosEntity} from "./videojuegos.entity";

@Module({
    imports :[
        TypeOrmModule.forFeature(
            [VideojuegosEntity],
            'default'
        )
    ],

    controllers: [
        VideojuegosController

    ],

    providers: [
        VideojuegosService

    ],

    exports: [
        VideojuegosService

    ]
})
export class VideojuegosModule{

}