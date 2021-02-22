import {Controller, Get, Req, HttpCode, Header, Headers} from "@nestjs/common";

@Controller('usuario')
export class UsuarioController {

    @Get('hola')
    @HttpCode (200)

    @Headers ()
    @Header (name:'Cache-Control')
    //@Header (name:'EPN',  'SISTEMAS')
    hola(
        @Req() request,
        //@Res() response //Se debe devolver la respuesta
        @Header() headers,
    ) {
        //response.send('Hola desde send');
        console.log(headers);
        return 'Hola mundo http';
    }
}
