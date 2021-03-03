import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {MascotaService} from "../mascota/mascota.service";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";
import {UsuarioEntity} from "./usuario.entity";

@Module({
    imports: [ //Modulos
        TypeOrmModule.forFeature(
            [UsuarioEntity],
            'default'
        )

    ],
    controllers: [ // controladores
        UsuarioController

    ],
    providers: [ //Servicios DECLARADOS
        UsuarioService

    ],
    exports: [ //Servicios EXPORTADOS
        UsuarioService
    ]
})

export class UsuarioModule {

}