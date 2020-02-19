import Approach from './approach';
import InputModel from '../models/input.model';
import SolutionModel from '../models/solution.model';

export default class NaiveApproach extends Approach {
  public apply(input: InputModel): SolutionModel {

    const descendingPizzaOptions = input.pizzaOptions.sort((a, b) => b.slices - a.slices);
    let currentSlices = 0;

    const solution: SolutionModel = {
      approachName: this.name,
      ids: []
    };

    descendingPizzaOptions.forEach(pizza => {
      if (currentSlices + pizza.slices <= input.targetSlices) {
        currentSlices += pizza.slices;
        solution.ids.push(pizza.position);
      }
    });

    return solution;
  }
}
