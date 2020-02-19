import InputModel from './src/models/input.model';
import SolutionModel from './src/models/solution.model';
import { readFile } from './src/reader';
import { writeFile } from './src/output-writer';

const filenames = [
  'a_example.in',
  'b_small.in',
  'c_medium.in',
  'd_quite_big.in',
  'e_also_big.in',
];

const approaches = [

];

// Read each file
filenames.forEach(filename => {

  const input: InputModel = readFile(`./inputs/${filename}`);

  // Apply each approach
  approaches.forEach(approach => {
    const solution: SolutionModel = approach.apply(input);
    writeFile(solution, `./outputs/${filename}`);
  });

});
