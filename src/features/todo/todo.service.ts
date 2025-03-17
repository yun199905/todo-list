import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TODO_MODEL_TOKEN, TodoDocument } from 'src/common/models/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { SearchDto } from 'src/core/bases';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TODO_MODEL_TOKEN)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async createTodo(data: CreateTodoDto) {
    const todo = await this.todoModel.create(data);
    return todo?.toJSON();
  }

  async findTodos(search: SearchDto, select?: string | string[]) {
    const { skip, limit } = search;
    const query = this.todoModel.find().select(select).skip(skip).limit(limit);
    const documents = await query.exec();
    return documents.map((document) => document?.toJSON());
  }

  async deleteTodo(todoId: string) {
    const document = await this.todoModel.findByIdAndDelete(todoId).exec();

    if (!document) return;

    return {};
  }

  async updateTodo(
    todoId: string,
    data: UpdateTodoDto,
    select?: string | string[],
  ) {
    const query = this.todoModel
      .findByIdAndUpdate(todoId, data, { new: true })
      .select(select);
    const document = await query.exec();
    return document?.toJSON();
  }
}
