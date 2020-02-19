import * as fs from 'fs';
import InputModel from './models/input.model';
import PizzaModel from './models/pizza.model';

export const readFile = (fileName: string): InputModel => {
  const data = fs.readFileSync(fileName, "utf-8").split("\n");
  const targetSlices = data[0].split(" ").map(i => Number(i))[0];
  const slicesByType = data[1].split(" ").map(i => Number(i));

  const pizzaOptions: PizzaModel[] = data[1].split(" ").map((value, index) => {
    return {position: index, slices: Number(value)}
  });

  return { targetSlices, pizzaOptions };
}
