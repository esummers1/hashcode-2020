import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';

export default abstract class Approach {
  abstract apply(input: InputModel): SolutionModel;

  public constructor(public name: string) {}
}
