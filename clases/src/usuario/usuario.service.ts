import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        public usuarioEntity: Repository<UsuarioEntity>
    ) { //Inyectar dependencias


    }

}
