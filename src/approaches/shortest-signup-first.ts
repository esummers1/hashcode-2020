import Approach from "./approach";
import InputModel from "../models/input.model";
import SolutionModel from "../models/solution.model";
import BookModel from "../models/book.model";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export default class ShortestSignupFirstApproach extends Approach {
  public apply(input: InputModel): SolutionModel {
    console.log("Applying approach: " + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    // Sort libraries by sign up time in ascending order
    const sortedLibraries = input.libraries.sort((a, b) => {
      return a.signupLength - b.signupLength;
    });

    const booksRead = new Set<BookModel>();

    var elapsed = 0;

    // Find libraries
    sortedLibraries.forEach(lib => {
      const newBooks = lib.books.filter(book => {
        return !booksRead.has(book);
      });

      if (newBooks.length > 0) {
        var numOfBooksToTake =
          (input.days - elapsed - lib.signupLength) * lib.booksPerDay;

        //(time to do - spent time - time to setup) * books per day

        // Sort books - highest score first
        const sortedBooks = newBooks.sort((a, b) => b.score - a.score);
        var takenBooks = sortedBooks.slice(0, numOfBooksToTake);

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
}
