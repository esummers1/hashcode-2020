import Book from './book.model';

export default interface Library {
  id?: number;
  signupLength?: number;
  booksPerDay?: number;
  books?: Book[];
}
