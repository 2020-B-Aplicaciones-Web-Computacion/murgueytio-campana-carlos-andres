import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from "cookie-parser";
//import helmet from "helmet";
const helmet = require("helmet");
const session = require('express-session');
const FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

async function bootstrap() {
    const app: any = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');
    app.use(session({
        store: new FileStore(fileStoreOptions), //indica donde se van a guardar los datos de la sesion
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: {
            expires: new Date(Date.now() + (30 * 8600 * 100)) //
        }
    }));
    app.use(cookieParser());
    app.use(helmet());

    await app.listen(3000);
}

bootstrap();
