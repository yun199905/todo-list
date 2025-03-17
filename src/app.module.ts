import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import mongoConfigFactory from './configs/mongo.config';
import secretConfigFactory from './configs/secret.config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './core/interceptors/response';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { TodoModule } from './features/todo/todo.module';
import { AuthorizationModule } from './core/modules/authorization/authorization.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfigFactory, secretConfigFactory],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongo.uri'),
        // useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TodoModule,
    AuthorizationModule.register({
      modelPath: join(__dirname, '../rbac/model.conf'),
      policyAdapter: join(__dirname, '../rbac/policy.csv'),
      global: true,
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
