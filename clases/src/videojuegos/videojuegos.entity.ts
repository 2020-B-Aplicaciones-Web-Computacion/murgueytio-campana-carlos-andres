import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DesarrolladoraEntity} from "../desarrolladora/desarrolladora.entity";

@Entity('Videojuego')
export class VideojuegosEntity {
    @PrimaryGeneratedColumn()
    idVid: number
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'nombreVideojuego'
    })
    nombre: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'anioVideojuego'
    })
    anioVideojuego: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'consola'
    })
    consola: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'generoVideojuego'
    })
    genero: string

    @ManyToOne(type => DesarrolladoraEntity,
        desarrolladora => desarrolladora.videojuegos,
        {onDelete: 'CASCADE'})
    fkDev: number;
}