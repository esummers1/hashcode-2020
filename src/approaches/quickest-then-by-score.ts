import Approach from "./approach";
import InputModel from "../models/input.model";
import SolutionModel from "../models/solution.model";
import LibraryModel from '../models/library.model';
import BookModel from "../models/book.model";

export default class QuickestThenByScoreApproach extends Approach {

  public apply(input: InputModel): SolutionModel {
    console.log("Applying approach: " + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    // Sort libraries by sign up time in ascending order THEN by score
    const sortedLibraries: LibraryModel[] = input.libraries.sort((a, b) => {
      if (a.signupLength == b.signupLength) {
        return this.getScore(b, input.days) - this.getScore(a, input.days);
      } else {
        return a.signupLength - b.signupLength;
      }
    });

    const booksRead = new Set<BookModel>();

    // Find libraries
    sortedLibraries.forEach(lib => {
      const newBooks = lib.books.filter(book => {
        return !booksRead.has(book);
      });

      if (newBooks.length > 0) {

        solution.libraries.push(lib);

        // Sort books - highest score first
        const sortedBooks = newBooks.sort((a, b) => b.score - a.score);
        solution.books.set(lib.id, sortedBooks);

        // Remember which books we have read!
        lib.books.forEach(book => booksRead.add(book));
      }
    });

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
