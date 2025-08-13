import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book, Genre } from '../../model/book';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-book-modal',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSuffix,
  ],
  templateUrl: './add-book-modal.html',
  styleUrl: './add-book-modal.scss'
})
export class AddBookModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddBookModal>);

  bookForm: FormGroup;
  constructor(
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: ['', [Validators.required, Validators.min(1)]],
      releaseDate: ['', Validators.required],
      genre: ['', Validators.required]
    });
  }

  genres: Genre[] = [
    "Fiction", "Non-fiction", "Light fiction", "Chick lit",
    "Science-fiction", "Fantasy", "Business & Finance", "Politics",
    "Travel books", "Autobiography", "History", "Thriller / Mystery",
    "Romance", "Satire", "Horror", "Religious / Inspirational",
    "Health / Medicine", "Cook-books", "Children’s books", "Dictionary",
    "Encyclopedia", "Series", "Anthology"
  ];

  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook: Omit<Book, 'id'> = {
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        pages: this.bookForm.value.pages,
        releaseDate: this.bookForm.value.releaseDate,
        genre: this.bookForm.value.genre
      };
      this.dialogRef.close(newBook);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
