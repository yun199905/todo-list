import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  TODO_DESCRIPTION_MAX_LEN,
  TODO_TITLE_MAX_LEN,
  TODO_TITLE_MIN_LEN,
} from '../constants/todo.const';
import { Document } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type TodoDocument = Todo & Document;

@Schema({ versionKey: false })
export class Todo {
  @Prop({
    required: true,
    minlength: TODO_TITLE_MIN_LEN,
    maxlength: TODO_TITLE_MAX_LEN,
  })
  title: string;

  @Prop({
    maxlength: TODO_DESCRIPTION_MAX_LEN,
  })
  description: string;

  @Prop({
    required: true,
    default: false,
  })
  completed: boolean;
}

export const todoSchema = SchemaFactory.createForClass(Todo);

export const TODO_MODEL_TOKEN = Todo.name;

export const TodoDefinition: ModelDefinition = {
  name: TODO_MODEL_TOKEN,
  schema: todoSchema,
};
