import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { SearchPipe } from 'src/core/pipes';
import { CreateTodoDto } from './dto/create-todo.dto';
import { SearchDto } from 'src/core/bases';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard } from 'src/core/guards';

@ApiTags('Todo')
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(@Query(SearchPipe) query: SearchDto) {
    return this.todoService.findTodos(query);
  }

  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    const response = await this.todoService.deleteTodo(id);

    if (!response) throw new ForbiddenException();

    return response;
  }

  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todoService.updateTodo(id, dto);

    if (!todo) throw new ForbiddenException();

    return todo;
  }
}
