import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('EPN_USUARIO')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'USU_NOMBRE'
    })
    nombre: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'USU_APELLIDO'
    })
    apellido: string
}