import { Injectable } from '@nestjs/common';
import {Book, books} from "./db/BooksDatabase";

@Injectable()
export class BooksService {
  getBooks(): Book[] {
    return books;
  }

  findBook(bookId: number): Book | undefined{
    return books.find(book => book.id === bookId);
  }

  create(book: Partial<Book>): Book | undefined {

    if(!book.author || !book.title || !book.publicationYear) return undefined;

    const newBook: Book = {
      id: books[books.length - 1].id + 1,
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear
    }

    books.push(newBook);

    return newBook;
  }

  update(bookId: number, book: Partial<Book>): Book | undefined {
    const currentBook = books.find(book => book.id === bookId);
    if(!currentBook) return undefined

    const updatedBook = {...book, ...currentBook};

    books.map(book => (book.id === bookId) ? updatedBook : book)

    return updatedBook;
  }

  delete(bookId: number): Book | undefined {
    const currentBook = books.find(book => book.id === bookId);
    if(!currentBook) return undefined

    books.filter(book => book.id !== bookId);

    return currentBook;
  }
}
