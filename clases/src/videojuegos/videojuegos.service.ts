import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {VideojuegosEntity} from "./videojuegos.entity";
import {Repository} from "typeorm";

@Injectable()
export class VideojuegosService{
    constructor(
        @InjectRepository(VideojuegosEntity)
        public videojuegosEntity: Repository<VideojuegosEntity>
    ) { //Inyectar dependencias

    }

}