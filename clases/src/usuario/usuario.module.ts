import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";

@Module({
    imports: [ //Modulos

    ],
    controllers: [ // controladores
        UsuarioController

    ],
    providers: [ //Servicios DECLARADOS

    ],
    exports:[ //Servicios EXPORTADOS

    ]
})

export class UsuarioModule{

}