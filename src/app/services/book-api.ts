import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookApi {
  private booksUrl = 'assets/books.json';

  private booksSignal = signal<Book[]>([]);

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.http.get<Book[]>(this.booksUrl).subscribe({
      next: (books) => this.booksSignal.set(books),
      error: (err) => console.error('Ошибка загрузки книг:', err)
    });
  }

  filterBooks(filter: string, searchType: 'title' | 'author' | 'both'): Book[] {
    const books = this.booksSignal();
    if (!filter.trim()) {
      return [...books];
    }

    const lowerFilter = filter.toLowerCase();

    return books.filter(book => {
      switch(searchType) {
        case 'title':
          return book.title.toLowerCase().includes(lowerFilter);
        case 'author':
          return book.author.toLowerCase().includes(lowerFilter);
        default:
          return (
            book.title.toLowerCase().includes(lowerFilter) ||
            book.author.toLowerCase().includes(lowerFilter)
          );
      }
    });
  }

  addBook(newBook: Book): void {
    this.booksSignal.update(books => [...books, newBook]);
  }
}
