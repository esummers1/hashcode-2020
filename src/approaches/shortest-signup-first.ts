import Approach from './approach';
import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';
import BookModel from '../models/book.model';
import { removeExcessiveSignupLibraries } from '../utils';

export default class ShortestSignupFirstApproach extends Approach {
  public apply(input: InputModel): SolutionModel {

    console.log('Applying approach: ' + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    // Remove libraries we can't use
    const validLibraries = removeExcessiveSignupLibraries(input);

    // Sort libraries by sign up time in ascending order
    const sortedLibraries = validLibraries.sort((a, b) => {
      return a.signupLength - b.signupLength;
    });

    // Find libraries
    sortedLibraries.forEach(lib => {
      solution.libraries.push(lib);
      solution.books.set(lib.id, lib.books);
    });

    return solution;
  }
}
