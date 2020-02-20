import Library from './library.model';
import Book from './book.model';

export default interface InputModel {
  days?: number;
  libraries?: Library[];
}
