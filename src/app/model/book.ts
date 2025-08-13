export interface Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  releaseDate: Date
  genre: Genre;
}

export type Genre =
  | "Fiction"
  | "Non-fiction"
  | "Light fiction"
  | "Chick lit"
  | "Science-fiction"
  | "Fantasy"
  | "Business & Finance"
  | "Politics"
  | "Travel books"
  | "Autobiography"
  | "History"
  | "Thriller / Mystery"
  | "Romance"
  | "Satire"
  | "Horror"
  | "Religious / Inspirational"
  | "Health / Medicine"
  | "Cook-books"
  | "Children’s books"
  | "Dictionary"
  | "Encyclopedia"
  | "Series"
  | "Anthology";
