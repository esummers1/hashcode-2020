import Approach from "./approach";
import InputModel from "../models/input.model";
import SolutionModel from "../models/solution.model";
import BookModel from "../models/book.model";

export default class ShortestTimePerBook extends Approach {
  public apply(input: InputModel): SolutionModel {
    console.log("Applying approach: " + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    // Sort libraries by sign up time in ascending order
    const sortedLibraries = input.libraries.sort((a, b) => {
      return a.books.length / a.signupLength - b.books.length / b.signupLength;
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
}
