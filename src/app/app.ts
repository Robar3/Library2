import { Component, signal } from '@angular/core';
import { Library } from './components/library/library';

@Component({
  selector: 'app-root',
  imports: [Library],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Library2');
}
