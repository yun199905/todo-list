import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SearchPipe implements PipeTransform {
  readonly #DEFAULT_LIMIT = 30;
  readonly #MAX_LIMIT = 50;
  readonly #DEFAULT_SKIP = 0;

  transform(value: Record<string, any>, metadata: ArgumentMetadata) {
    const { limit, skip } = value;
    value.limit = this.#setLimit(parseInt(limit));
    value.skip = this.#setSkip(skip);
    return value;
  }

  #setLimit(limit: number): number {
    return Math.min(limit || this.#DEFAULT_LIMIT, this.#MAX_LIMIT);
  }

  #setSkip(skip: number): number {
    if (!skip) {
      return this.#DEFAULT_SKIP;
    }
    return skip;
  }
}
