import Approach from "./approach";
import InputModel from "../models/input.model";
import SolutionModel from "../models/solution.model";
import BookModel from "../models/book.model";
import { removeExcessiveSignupLibraries } from "../utils";

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

    // Find libraries
    sortedLibraries.forEach(lib => {
      const newBooks = lib.books.filter(book => {
        return !booksRead.has(book);
      });

      if (newBooks.length > 0) {
        solution.libraries.push(lib);
        solution.books.set(lib.id, newBooks);
        // Remember which books we have read!
        lib.books.forEach(book => booksRead.add(book));
      }
    });

    return solution;
  }
}
