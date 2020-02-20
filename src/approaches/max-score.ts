import Approach from './approach';
import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';
import LibraryModel from '../models/library.model';
import BookModel from '../models/book.model';

export default class MaxScoreApproach extends Approach {
  public apply(input: InputModel): SolutionModel {

    console.log('Applying approach: ' + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    const sortedLibraries: LibraryModel[] = input.libraries.sort(
        (a, b) => this.getScore(b, input.days) - this.getScore(a, input.days));

    const booksRead = new Set<BookModel>();

    // Output all libraries, starting with the one with the most books
    // and ignoring books already read
    sortedLibraries.forEach(library => {
      const newBooks = library.books.filter(book => {
        return !booksRead.has(book);
      });

      if(newBooks.length > 0){
        solution.libraries.push(library);
        solution.books.set(library.id, newBooks);
        // Remember which books we have read!
        library.books.forEach(book => booksRead.add(book));
      }

    })

    return solution;
  }

  getScore = (library: LibraryModel, numDays: number): number => {
    return (library.booksPerDay * this.getAvgBookScore(library))
        * (numDays - library.signupLength);
  }

  getAvgBookScore = (library: LibraryModel): number => {
    return library.books.reduce((acc, book) => {
      return acc + book.score;
    }, 0) / library.books.length;
  }

}
