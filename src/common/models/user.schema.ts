import {
  ModelDefinition,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import {
  USER_USERNAME_MAX_LEN,
  USER_USERNAME_MIN_LEN,
} from '../constants/user.const';
import { Role } from '../enums/role.enum';

/**
 * UserDocument 定義了 User 模型的文件結構。
 * Schema 負責定義 Document 的欄位結構，而 model 操作時會返回 Document。
 * 透過 User & Document 讓 model 能夠正確取得定義的欄位。
 */
export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop({
    required: true,
    minlength: USER_USERNAME_MIN_LEN,
    maxlength: USER_USERNAME_MAX_LEN,
  })
  username: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    type: raw({
      hash: String,
      salt: String,
    }),
  })
  password: { hash: string; salt: string };

  @Prop({
    required: true,
    enum: Role,
    default: Role.MEMBER,
  })
  role: string;
}

/**
 * 將 User 類別轉換為 Mongoose Schema
 * 可以用來建立 Model
 */
export const UserSchema = SchemaFactory.createForClass(User);

export const USER_MODEL_TOKEN = User.name;

export const UserDefinition: ModelDefinition = {
  name: USER_MODEL_TOKEN,
  schema: UserSchema,
};
