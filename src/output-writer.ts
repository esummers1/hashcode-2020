import * as fs from 'fs';
import SolutionModel from './models/solution.model';

export const writeFile = (solution: SolutionModel, filename: string): void => {

  console.log('Writing solution for ', filename);
  let wstream = fs.createWriteStream(`output/${filename}.output`);

  // Write number of slides
  wstream.write(`${solution.ids.length} \n`);

  // Write each slide
  solution.ids.forEach((id: number) => {
      wstream.write(`${id} `);
  });

  wstream.end();
}