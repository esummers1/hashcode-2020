import Approach from './approach';
import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';

export default class NaiveApproach extends Approach {
  public apply(input: InputModel): SolutionModel {
    return {
      ids: [0]
    };
  }
}
