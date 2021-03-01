import {BadRequestException, Controller, ForbiddenException, Get, Param, Query, Req, Session} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('login')
    login(
        @Session() session,
        @Query() parametrosConsulta,
    ): string {
        if (parametrosConsulta.nombre && parametrosConsulta.apellido) {
            session.usuario = {
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido
            }
            if (parametrosConsulta.apellido === 'Murgueytio') {
                session.usuario.esAdministrador = true;
            }
            return 'Se logeo el usuario';
        } else {
            throw new BadRequestException('NO ENVIA NOMBRE Y APELLIDO'); //400
        }

    }

    @Get('quien-soy')
    quienSoy(
        @Session() session,
    ): string {
        if (session.usuario) {
            return session.usuario.nombre + ' ' + session.usuario.apellido;
        } else {
            return 'No te has logeado';
        }
    }

    @Get('logout')
    logout(
        @Session() session,
        @Req() request,
    ): string {
        session.usuario = undefined;
        request.session.destroy();
        return 'Gracias por visitarnos';
    }

    @Get('protegido')
    protegido(
        @Session() session,
    ): string {
        if (session.usuario) {
            if (session.usuario.esAdministrador) {
                return 'CONTENIDO SUPER OCULTO';
            } else {
                throw new ForbiddenException('No tienes rol Admin');
            }

        } else {
            throw new ForbiddenException('No tienes rol Admin');
        }

    }
}


// Clases - TYPESCRIPT
/*
class Nombre {
  public nombrePropiedad?: string; //atributo undefined, puede ser o no nula, por eso está el ?
  private apellidoPropieda: string = 'Murgueytio';
  protected edad:number = 1;
  static comun = 10;

  constructor(
      propiedadPublica: string,  //parametro
      public propiedadRapido: string, //transforma una propiedad
  ) {
    //this.propiedadPublica = propiedadPublicaParametro; //ERROR
    this.propiedadRapido; //Ok
  }

  public funcionPublica(parametroString: string): void{

  }

  private funcionPrivada(parametroString: string, parametroNumero:number){

  }

  protected funcionProtegida(): number{
    return 1;

  }

  static funcionEstatica(): string{
    return '';

  }


}


//VARIABLES PRIMITIVAS
//MUTABLES, SE PUEDEN REASIGNAR
//var variableUno; //No vamos a usar var
/*let variableDos;
variableDos = 1; //OK

  //INMUTABLES, no se pueden reasignar
const variableTres=2;
variableTres = 1; //No ok */

//Tipos de variables

//es preferible usar siempre const
/*
const texto: string = "";
const textoConComillasSimples: string = '';
const numeroEntero: number = 1;
const numeroFlotante: number = 1.2;
const soyEstudiante: boolean = true; //false
const fecha: Date = new Date();
const noDefinido = undefined; //Mas se utiliza el undefined que null
const noHayNada = null;

class Usuario {
    constructor(public nombre: string,
                public apellido: string) {

    }
}

const usuario: Usuario = new Usuario (nombre:'Carlos', apellido:'Murgueytio');
usuario.nombre = 'Andres';
usuario.apellido= ' Murgueytio';

interface UsuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number; //? este caracter significa opcional, el valor por defecto es undefined
}

//Es mejor utilizar interfaces cuando utilizamos objetos

let objetoUsuario: UsuarioInterface = {
    nombre: 'Carlos',
    apellido: 'Murgueytio',
    edad: 22
}

objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;

//console.log(usuario);
console.log(objetoUsuario);

let edad = 22;
let otraEdad = edad; //VALOR
otraEdad = 60;

let objetoEdad = {
    edad: 22,
};

let otraEdadObjeto = objetoEdad; //REFERENCIA
otraEdadObjeto.edad = 60;
console.log('objetoEdad', objetoEdad);
console.log('OtraEdadObjeto', otraEdadObjeto);

objetoEdad.edad = 35;
console.log('objetoEdad', objetoEdad);
console.log('OtraEdadObjeto', otraEdadObjeto);

let otraEdadObjetoClonado = {...objetoEdad}; //Así se clona un objeto
otraEdadObjetoClonado.edad = 60;
console.log('objetoEdad', objetoEdad);
console.log('otraEdadObjetoClonado', otraEdadObjetoClonado);

objetoEdad.edad = 40;
console.log('objetoEdad', objetoEdad);
console.log('otraEdadObjetoClonado', otraEdadObjetoClonado);


//Si se iguala una primitiva a otra primitiva, np
//Si se iguala un objeto a otro objeto, se recomienda hacer una clonacion, caso contrario solo se guarda una referencia del otro objeto

//ARREGLOS

const arreglo = [1, '', true, null, new Date()]; //En js se puede guardar cualquier tipo de arreglo
const arregloNumero: number [] = [1, 2, 3, 4, 5];
const arregloNumeroClonado: number [] = [...arregloNumero];

const indice = arregloNumero.findIndex( //Funcion anonima xq no tiene nombre
    (numero: number) => {
        return numero === 3 //Esto significa diferente
    },
)

arregloNumero[indice] = 6;

arregloNumero.push(6); //Agrego al final
//arregloNumero.unshift(items:0) //agrego al inicio
console.log(arregloNumero);

// CONDICONES -> truty y falsy

if (0) { //Solo el cero es falso, los demas numeros son verdaderos
    console.log('Truty');
} else {
    console.log('Falsy');
}
;

if (-1) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;

if ("") { //Cadena de string vacia tambien son falsos
    console.log('Truty');
} else {
    console.log('Falsy');
}
;
if ("a") {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;

if ({}) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;
if ({a: 1}) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;

if ([]) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;
if ([1]) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;

if (null) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;
if (undefined) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
;

//En resumen, los strings vacios y el cero son falsos, tambien null y undefined

*/
