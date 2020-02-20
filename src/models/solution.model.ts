import BookModel from './book.model';
import LibraryModel from './library.model';

export default interface SolutionModel {
  approachName?: string;
  libraries: LibraryModel[];
  books: Map<number, BookModel[]>; // library id -> BookModel
}
