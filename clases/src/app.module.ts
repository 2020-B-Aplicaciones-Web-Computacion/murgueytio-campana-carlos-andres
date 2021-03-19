import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioModule} from './usuario/usuario.module';
import {MascotaModule} from './mascota/mascota.module'
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import {CalculadoraModule} from "./calculadora/calculadora.module";
import {DesarrolladoraEntity} from "./desarrolladora/desarrolladora.entity";
import {VideojuegosEntity} from "./videojuegos/videojuegos.entity";
import {DesarrolladoraModule} from "./desarrolladora/desarrolladora.module";
import {VideojuegosModule} from "./videojuegos/videojuegos.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name: 'default',
            type: 'mysql',
            port: 3010,
            username: 'epn',
            password: 'epn12345678',
            database: 'web',
            dropSchema: false, //elimina toda la base de datos
            synchronize: true, //Crea y modifica las tablas
            entities: [
                UsuarioEntity,
                MascotaEntity,
                DesarrolladoraEntity,
                VideojuegosEntity
            ]
        }),
        MascotaModule,
        UsuarioModule,
        CalculadoraModule,
        DesarrolladoraModule,
        VideojuegosModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
