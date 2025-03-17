import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDefinition } from 'src/common/models/user.schema';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([UserDefinition])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
