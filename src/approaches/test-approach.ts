import Approach from './approach';
import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';
import BookModel from '../models/book.model';

export default class TestApproach extends Approach {
  public apply(input: InputModel): SolutionModel {

    console.log('Applying approach: ' + this.name);

    const solution: SolutionModel = {
      approachName: this.name,
      libraries: [],
      books: new Map<number, BookModel[]>()
    };

    // Just output 1 library and all its books
    solution.libraries.push(input.libraries[0]);
    solution.books.set(input.libraries[0].id, input.libraries[0].books);

    return solution;
  }
}
