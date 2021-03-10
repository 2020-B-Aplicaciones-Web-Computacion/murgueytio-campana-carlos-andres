import {Body, Controller, Get, Header, Headers, HttpCode, Param, Post, Put, Query, Req, Res} from '@nestjs/common';

@Controller('calculadora')
export class CalculadoraController {

    //http://localhost:3000/calculadora/suma?numUno=2&numDos=3&nombre=Carlos
    @Get('suma') //Suma con get y query params
    @HttpCode(200)
    sumar(
        @Query()
            parametrosConsulta,
        @Req()
            request,
        @Res({passthrough: true})
            response,
    ) {
        const cookietemp = request.cookies;
        const nombreUsuario = parametrosConsulta.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        //console.log(cookietemp[nombreUsuario]);
        //console.log(valorCok);
        //console.log(request.cookies[nombreUsuario]);
        const resultado = parseInt(parametrosConsulta.numUno) + parseInt(parametrosConsulta.numDos);
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        } else {
            response.cookie(nombreUsuario, valorCok);
            return 'El valor de la suma es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }


    }

    @Post('resta') //Resta con post y body params
    @HttpCode(201)
    @Header('Resultado', 'valor')
    restar(
        @Body() bodyParams,
        @Res({passthrough: true})
            response,
        @Headers() headers,
        @Req()
            request,
    ) {
        const cookietemp = request.cookies;
        const nombreUsuario = bodyParams.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        const resultado = bodyParams.numeroUno - bodyParams.numeroDos;
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        } else {
            response.cookie(nombreUsuario, valorCok);
            response.header('Resultado', resultado);
            return 'El valor de la resta es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }

    }

    @Put('multiplicar/:numeroUno/:numeroDos/:nombre') //Put y parametros de ruta
    @HttpCode(200)
    multiplicar(
        @Param() parametrosRuta,
        @Res({passthrough: true})
            response,
        @Req()
            request,
    ) {
        const cookietemp = request.cookies;
        const nombreUsuario = parametrosRuta.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        const resultado = (parseInt(parametrosRuta.numeroUno) * parseInt(parametrosRuta.numeroDos));
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        } else {
            response.cookie(nombreUsuario, valorCok);
            return 'El valor de la multiplicación es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }
    }

    @Get('dividir') //Con get y headers
    @HttpCode(201)
    dividir(
        @Req()
            request,
        @Headers()
            hearderparams,
        @Res({passthrough: true})
            response
    ) {
        const cookietemp = request.cookies;
        const nombreUsuario = hearderparams.nombre;
        let valorCok = cookietemp[nombreUsuario];
        if (!nombreUsuario || cookietemp[nombreUsuario] == undefined) {
            return "Favor envíe su nombre de usuario para usar la calculadora o asegurese de tener un usario creado";
        }
        const resultado = hearderparams.numero1 / hearderparams.numero2;
        valorCok = valorCok - resultado;
        if (valorCok < 0) {
            this.deleteCookie(response, nombreUsuario);
            return 'Felicidades, has ganado el juego, tu nombre de usuario se eliminará';
        } else {
            response.cookie(nombreUsuario, valorCok);
            return 'El valor de la división es igual a : ' + resultado + ', te quedan: ' + valorCok + ' puntos';
        }

    }

    @Get('setName/:nombre')
    setUserName(
        @Param()
            parametrosRuta,
        @Req()
            request,
        @Res({passthrough: true})
            response,
    ) {
        //console.log(response.cookie.nombre)
        //response.cookie()
        response.cookie(parametrosRuta.nombre, 100);
        //response.cookie('nombre', parametrosRuta.nombre);
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada';
    }

    @Get('borrarCookie/:nombre')
    borrarCookie(
        @Param()
            parametrosRuta,
        @Req()
            request,
        @Res({passthrough: true})
            response,
    ) {
        const date = new Date();
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        response.clearCookie(parametrosRuta.nombre);
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' eliminada'

    }

    deleteCookie(@Res({passthrough: true})
                     response, nombre) {
        const date = new Date();
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        response.clearCookie(nombre);
    }


}