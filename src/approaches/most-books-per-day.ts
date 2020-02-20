import Approach from './approach';
import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';
import LibraryModel from '../models/library.model';
import BookModel from '../models/book.model';

export default class MostBooksPerDayApproach extends Approach {
  public apply(input: InputModel): SolutionModel {

    console.log('Applying approach: ' + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    const sortedLibraries: LibraryModel[] = input.libraries.sort(
        (a, b) => b.booksPerDay - a.booksPerDay);

    // Output all libraries, starting with the one with the most books
    sortedLibraries.forEach(library => {
      solution.libraries.push(library);
      solution.books.set(library.id, library.books);
    })

    return solution;
  }
}
