import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {VideojuegosEntity} from "../videojuegos/videojuegos.entity";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity('Desarrolladora')
export class DesarrolladoraEntity{
    @PrimaryGeneratedColumn()
    idDev: number
    @Column({
        type: 'varchar',
        length: 100,
        nullable:false,
        name: 'nombreDesarrolladora'
    })
    nombreDev: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'anioFundacionDesarrolladora'
    })
    anioDev: string


    @OneToMany( type => VideojuegosEntity, videojuego=>videojuego.fkDesarrolladora)
    videojuegos: VideojuegosEntity[];
}