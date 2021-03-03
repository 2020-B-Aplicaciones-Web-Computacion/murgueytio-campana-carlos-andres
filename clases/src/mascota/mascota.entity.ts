import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('EPN_MASCOTA')
export class MascotaEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string

}