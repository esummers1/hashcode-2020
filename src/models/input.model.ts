import PizzaModel from './pizza.model';

export default interface InputModel {
  targetSlices: number;
  pizzaOptions: PizzaModel[];
}
