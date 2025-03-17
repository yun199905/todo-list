import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  //設定基本的文件資訊
  const config = new DocumentBuilder()
    .setTitle('Todo List Project')
    .setDescription('The is a practice project for NestJS')
    .setVersion('1.0')
    .build();

  //透過createDocument方法將文件產生出來
  const document = SwaggerModule.createDocument(app, config, {
    //預設會根據 Controller 名稱自動生成標籤，關閉後需顯式使用 @ApiTags()
    autoTagControllers: false,
  });

  //透過setup方法來啟用
  SwaggerModule.setup('api', app, document);
}
