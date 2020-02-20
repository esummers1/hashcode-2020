import Approach from './approach';
import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';
import LibraryModel from '../models/library.model';
import BookModel from '../models/book.model';

export default class ProjectionApproach extends Approach {

  public apply(input: InputModel): SolutionModel {

    console.log('Applying approach: ' + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    const sortedLibraries: LibraryModel[] = input.libraries.sort(
        (a, b) => this.getScore(b, input.days) - this.getScore(a, 100));

    const booksRead = new Set<BookModel>();

    // Output all libraries, starting with the one with the most books
    // and ignoring books already read
    sortedLibraries.forEach(library => {
      const newBooks = library.books.filter(book => {
        return !booksRead.has(book);
      });

      if (newBooks.length > 0) {

        solution.libraries.push(library);

        // Sort books - highest score first
        const sortedBooks = newBooks.sort((a, b) => b.score - a.score);
        solution.books.set(library.id, sortedBooks);

        // Remember which books we have read!
        library.books.forEach(book => booksRead.add(book));
      }

    })

    return solution;
  }

  // Gets the score of a library if it runs for the whole time
  getScore = (library: LibraryModel, numDays: number): number => {
    const sortedBooks = [...library.books.sort((a, b) => b.score - a.score)];
    const daysRemaining = numDays - library.signupLength;
    let score = 0;
    for (let i = 0; i < daysRemaining; i++) {
      for (let j = 0; j < library.booksPerDay; j++) {
        const book = sortedBooks.shift();
        if (book) {
          score += book.score;
        } else {
          return score;
        }
      }
    }
    return score;
  }

}
