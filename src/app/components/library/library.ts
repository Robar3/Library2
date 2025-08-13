import { Component, effect, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../model/book';
import { AddBookModal } from '../add-book-modal/add-book-modal';
import { BookDetailModal } from '../book-detail-modal/book-detail-modal';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { MatLine, MatOption, MatRipple } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { BookApi } from '../../services/book-api';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-library',
  imports: [
    MatToolbar,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatList,
    MatListItem,
    MatRipple,
    MatLine,
    MatSelect,
    MatOption
  ],
  templateUrl: './library.html',
  styleUrl: './library.scss'
})
export class Library implements OnInit {
  private filterSubject = new Subject<string>();
  filteredBooks: Book[] = [];
  filterText = '';
  searchType: 'title' | 'author' | 'both' = 'both';

  constructor(
    private dialog: MatDialog,
    public bookApiService: BookApi
  ) {
    effect(() => {
      this.filteredBooks = this.bookApiService.filterBooks(
        this.filterText,
        this.searchType
      );
    });
  }

  ngOnInit(): void {
    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filterText => {
      this.filterText = filterText;
      this.filteredBooks = this.bookApiService.filterBooks(filterText, this.searchType);
    });
    }

  onFilterChange(filterText: string): void {
    this.filterSubject.next(filterText);
  }

  onSearchTypeChange(): void {
    this.filterSubject.next(this.filterText);
  }

  openAddBookModal(): void {
    const dialogRef = this.dialog.open(AddBookModal);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookApiService.addBook(result);
      }
    });
  }

  openBookDetails(book: Book): void {
    this.dialog.open(BookDetailModal, {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      autoFocus: false,
      data: book
    });
  }
}
