import { IsOptional, MaxLength, MinLength } from 'class-validator';
import {
  TODO_DESCRIPTION_MAX_LEN,
  TODO_TITLE_MAX_LEN,
  TODO_TITLE_MIN_LEN,
} from 'src/common/constants/todo.const';

export class CreateTodoDto {
  @MinLength(TODO_TITLE_MIN_LEN)
  @MaxLength(TODO_TITLE_MAX_LEN)
  readonly title: string;

  @IsOptional()
  @MaxLength(TODO_DESCRIPTION_MAX_LEN)
  readonly description: string;

  @IsOptional()
  readonly completed?: boolean;
}
