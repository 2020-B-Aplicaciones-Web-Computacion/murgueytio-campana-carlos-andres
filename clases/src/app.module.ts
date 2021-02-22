import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsuarioModule} from './usuario/usuario.module';
import {MascotaModule} from './mascota/mascota.module'

@Module({
    imports: [
        MascotaModule,
        UsuarioModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
