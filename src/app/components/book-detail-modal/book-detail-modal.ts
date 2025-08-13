import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Book } from '../../model/book';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-book-detail-modal',
  imports: [MatDialogContent,
    DatePipe,
    MatDialogClose, MatIcon, MatIconButton],
  templateUrl: './book-detail-modal.html',
  styleUrl: './book-detail-modal.scss'
})
export class BookDetailModal {
  constructor(@Inject(MAT_DIALOG_DATA) public book: Book) {}
}
