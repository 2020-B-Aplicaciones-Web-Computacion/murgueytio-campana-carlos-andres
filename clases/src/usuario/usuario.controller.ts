import {Controller, Get, Req, HttpCode, Header, Headers, Param, Res, Post, Body, Query, Put} from "@nestjs/common";


@Controller('usuario')
export class UsuarioController {

    @Get('hola')
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    @Header('EPN', 'SISTEMAS')
    hola(
        @Req()
            request,
        @Headers()
            headers,
        // @Res()
        // response // Ustedes deben devolver la respuesta
    ) {
        // response.send('HOLA DESDE SEND')
        console.log(headers);
        // return 'Hola mundo http';
        // return {
        //     nombre:'Adrian'
        // }
        // return '<xml>Hola Mundo</xml>'
        return '<h1>HOLA MUNDO</h1> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png" alt="">'
    }


    @Post('parametros-ruta/:numeroUno/:numeroDos')
    parametrosRuta(
        @Param() parametrosRuta,
        @Res({passthrough: true})
            response,
    ) {

        console.log(parametrosRuta.numeroUno);
        console.log(parametrosRuta.numeroDos);
        response.header('nueva-header', 'otro valor');
        let valorUno: number = parseInt(parametrosRuta.numeroUno);
        let valorDos: number = parseInt(parametrosRuta.numeroDos);
        let suma: number = 0;
        suma = (valorUno + valorDos);
        console.log(suma);
        return suma;
    }

    @Get('setear-nombre/:nombre')
    setearNombre(
        @Param()
            parametrosRuta,
        @Req()
            request,
        @Res({passthrough: true}) //Activamos passthrough para poder utilizar return
            response,
    ) {
        console.log(request.cookies); //El valor de la cookie en la petición
        response.cookie('nombreUsuario', parametrosRuta.nombre);
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada'; //con pass
        //response.send('Cookie con nombre ' + parametrosRuta.nombre + ' seteada'); //sin pass

    }

    @Get('suma/') //Suma con get y query params
    @HttpCode(200)
    sumar(
        @Query()
            query,
        @Req()
            request,
        @Res({passthrough: true})
            response,
    ) {
        console.log(query);
        var resultado;
        let valores:number;
        //valores = Object.values(query); // ['1', '2']
        //resultado = valores[0] + valores[1];
        //resultado = (parseInt(valores[0]) + parseInt(parametrosQuery.numDos));
        return 'El valor de la suma es igual a : ' + resultado;

    }

    @Post('resta/:numeroUno/:numeroDos') //Resta con post y body params
    @HttpCode(201)
    @Header('Resultado', 'valor')
    restar(
        @Param() parametrosRuta,
        @Res({passthrough: true})
            response,
        @Headers() headers,
    ) {

        var resta: number = 0;
        resta = (parseInt(parametrosRuta.numeroUno) - parseInt(parametrosRuta.numeroDos));
        response.header('Resultado', resta);
        return 'El valor de la resta es igual a : ' + resta;
    }

    @Put('multiplicar/:numeroUno/:numeroDos')
    @HttpCode(200)
    multiplicar(
        @Param() parametrosRuta,
        @Res({passthrough: true})
            response,
    ) {
        var resultado: number = 0;
        resultado = (parseInt(parametrosRuta.numeroUno) * parseInt(parametrosRuta.numeroDos));
        return 'El valor de la multiplicación es igual a : ' + resultado;
    }

    @Get('dividir') //Con get y headers
    @HttpCode(201)
    @Header ('numeroUno', 'none')
    @Header ('numeroDos', 'none')
    dividir(
        @Res({passthrough: true})
            response,
        @Headers() headers,
    ){
        //console.log(headers);
        var resultado: number = 0;
        //resultado = (parseInt(parametrosRuta.numeroUno) * parseInt(parametrosRuta.numeroDos));
        console.log(headers.getValue(0));
        return 'El valor de la división es igual a : ' + resultado;

    }

}

