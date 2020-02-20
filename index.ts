// Helpers
import { readFile } from './src/reader';
import { writeFile } from './src/output-writer';

// Models
import InputModel from './src/models/input.model';
import SolutionModel from './src/models/solution.model';

// Approaches

const filenames = [
  'a_example.txt',
  'b_read_on.txt',
  'c_incunabula.txt',
  'd_tough_choices.txt',
  'e_so_many_books.txt',
  'f_libraries_of_the_world.txt'
];

const approaches = [
];

// Read each file
filenames.forEach(filename => {

  const input: InputModel = readFile(`./inputs/${filename}`);

  // Apply each approach
  approaches.forEach(approach => {
    const solution: SolutionModel = approach.apply(input);
    writeFile(solution, `./outputs/${solution.approachName}_${filename}`);
  });

});
