import * as fs from "fs";
import SolutionModel from "./models/solution.model";

export const writeFile = (solution: SolutionModel, filename: string): void => {
  console.log("Writing solution for ", filename);
  let wstream = fs.createWriteStream(`${filename}.output`);

  if (!solution.ids) return;

  // Write number of slices
  wstream.write(`${solution.ids.length} \n`);

  // Write each slice
  solution.ids.forEach((id: number) => {
    wstream.write(`${id} `);
  });

  wstream.end();
};
