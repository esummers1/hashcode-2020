import Approach from "./approach";
import InputModel from "../models/input.model";
import SolutionModel from "../models/solution.model";
import LibraryModel from '../models/library.model';
import BookModel from "../models/book.model";

export default class ShortestSignupFirstApproach extends Approach {
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

    var elapsed = 0;

    // Find libraries
    sortedLibraries.forEach(lib => {
      const newBooks = lib.books.filter(book => {
        return !booksRead.has(book);
      });

      if (newBooks.length > 0) {

        const daysSendingBooks = input.days - elapsed - lib.signupLength;
        const numOfBooksToTake = daysSendingBooks * lib.booksPerDay;

        // Sort books - highest score first
        const sortedBooks = newBooks.sort((a, b) => b.score - a.score);
        const takenBooks = sortedBooks.slice(0, numOfBooksToTake);

        if (takenBooks.length > 0) {
          elapsed += lib.signupLength;

          solution.libraries.push(lib);
          solution.books.set(lib.id, takenBooks);
          // Remember which books we have read!
          takenBooks.forEach(book => booksRead.add(book));
        }
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
