import InputModel from './src/models/input.model';
import { readFile } from './src/reader';

const files = [
  './inputs/a_example.in',
  './inputs/b_small.in',
  './inputs/c_medium.in',
  './inputs/d_quite_big.in',
  './inputs/e_also_big.in',
];

const approaches = [

];

// Read each file
files.forEach(f => {

  const input: InputModel = readFile(f);

  // Apply each approach
  approaches.forEach(approach => {
    const solution: SolutionModel = approach.apply(input);
    writeFile(
      output,
      f.substring(f.lastIndexOf('/') + 1, f.lastIndexOf("."))
    );
  });

});
