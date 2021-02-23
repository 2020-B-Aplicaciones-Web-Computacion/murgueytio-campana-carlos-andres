import {Controller, Get, Req, HttpCode, Header, Headers, Param, Res, Post, Body} from "@nestjs/common";
import path from "node:path";
import {options} from "tsconfig-paths/lib/options";

@Controller('usuario')
export class UsuarioController {

    @Get('hola')
    @HttpCode(200)

    @Header('Cache-Control', 'none')
    @Header('EPN', 'SISTEMAS')
    //@Header (name:'EPN',  'SISTEMAS')
    hola(
        @Req() request,
        //@Res() response //Se debe devolver la respuesta
        @Headers() headers,
    ) {
        //response.send('Hola desde send');
        console.log(headers);
        //return 'Hola mundo http';
        return '<h1>HOLA MUNDO</h1> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png" alt="">';
    }

    @Post('parametros-ruta/:numeroUno/:numeroDos')
    parametrosRuta(
        @Param() parametrosRuta,
        @Res({passthrough: true})
            response,
        @Body() numeroUno,
        @Body() numeroDos
    ) {

        //console.log(parametrosRuta);
        response.header('nueva-header', 'otro valor');
        let numerParam: any = numeroUno;
        let numer2Param: any = numeroDos;
        console.log(numerParam);
        console.log(numer2Param);

        let suma: number = 0;
        //suma = parametrosRuta[0] + parametrosRuta[1];
        console.log(suma);
        return suma;
    }
}

