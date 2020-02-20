import Approach from "./approach";
import InputModel from "../models/input.model";
import SolutionModel from "../models/solution.model";
import LibraryModel from '../models/library.model';
import BookModel from "../models/book.model";

export default class Supergood2 extends Approach {
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

    let i = 0;

    while (remainingLibraries.length > 0) {

      const remainingDays = input.days - elapsed;

      // Sort by maximum yield
      const sortedLibraries: LibraryModel[] = remainingLibraries.sort((a, b) => {
        // Every 3rd iteration, we pick the highest-scoring libary,
        // otherwise we pick the library with the shortest sign-up time
        if (i % 3 == 0) {
          return this.getScore(b, remainingDays) - this.getScore(a, remainingDays);
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
        const takenBooks = newBooks.slice(0, numOfBooksToTake);

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

      i++;
    }

    return solution;
  }

  getScore = (library: LibraryModel, numDays: number): number => {

    let numDaysSendingBooks = (numDays - library.signupLength);
    let score = 0;
    let startOfDayIndex = 0;

    for (let day = 0; day < numDaysSendingBooks; day++) {
      for (let i = 0; i < library.booksPerDay; i++) {

        const index = startOfDayIndex + i;

        if (index >= library.books.length) {
          // We've run out of books!
          return score;
        }

        score += library.books[index].score;
      }
      startOfDayIndex += library.booksPerDay;
    }

    return score;
  }

}
