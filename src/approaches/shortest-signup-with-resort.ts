import Approach from "./approach";
import InputModel from "../models/input.model";
import SolutionModel from "../models/solution.model";
import LibraryModel from '../models/library.model';
import BookModel from "../models/book.model";

export default class ShortestSignupWithResortApproach extends Approach {
  public apply(input: InputModel): SolutionModel {
    console.log("Applying approach: " + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    const booksRead = new Set<BookModel>();

    var elapsed = 0;

    let remainingLibraries = [...input.libraries];

    while (remainingLibraries.length > 0) {

      // Sort by shortest sign up time THEN by score
      const sortedLibraries: LibraryModel[] = remainingLibraries.sort((a, b) => {
        if (a.signupLength == b.signupLength) {
          return this.getScore(b, input.days) - this.getScore(a, input.days);
        } else {
          return a.signupLength - b.signupLength;
        }
      });

      // Grab the next one
      const nextLibrary = sortedLibraries.shift();

      // Process the library
      const newBooks = nextLibrary.books.filter(book => {
        // Only keep books that we haven't already read
        return !booksRead.has(book);
      });

      if (newBooks.length > 0) {

        const daysSendingBooks = input.days - elapsed - nextLibrary.signupLength;
        const numOfBooksToTake = daysSendingBooks * nextLibrary.booksPerDay;

        // Sort books - highest score first
        const sortedBooks = newBooks.sort((a, b) => b.score - a.score);
        const takenBooks = sortedBooks.slice(0, numOfBooksToTake);

        if (takenBooks.length > 0) {
          elapsed += nextLibrary.signupLength;

          solution.libraries.push(nextLibrary);
          solution.books.set(nextLibrary.id, takenBooks);
          // Remember which books we have read!
          takenBooks.forEach(book => booksRead.add(book));

          // We are done with this library!
          remainingLibraries = remainingLibraries.filter(lib => lib !== nextLibrary);
        }
      }
    }

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
