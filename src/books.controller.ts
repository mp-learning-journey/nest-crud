import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { BooksService } from './books.service';
import {Book, books} from "./db/BooksDatabase";

@Controller()
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  index(): Book[] {
    return this.bookService.getBooks();
  }

  @Get('/:id')
  show(@Param('id') id: string): Book | undefined{
    return this.bookService.findBook(+id);
  }
  
  @Post()
  store(@Body() book: Partial<Book>): Book | undefined {
    return this.bookService.create(book);
  }

  @Put('/:id')
  update(
      @Param('id') id: string,
      @Body() book: Partial<Book>
  ): Book | undefined {
    return this.bookService.update(+id, book);
  }

  @Delete('/:id')
  delete(@Param('id') id: string,): Book | undefined {
    return this.bookService.delete(+id);
  }
}
