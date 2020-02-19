// Helpers
import { readFile } from './src/reader';
import { writeFile } from './src/output-writer';

// Models
import InputModel from './src/models/input.model';
import SolutionModel from './src/models/solution.model';

// Approaches
import NaiveApproach from './src/approaches/naive-approach';

const filenames = [
  'a_example.in',
  'b_small.in',
  'c_medium.in',
  'd_quite_big.in',
  'e_also_big.in',
];

const approaches = [
  new NaiveApproach('Naive Approach')
];

// Read each file
filenames.forEach(filename => {

  const getScore = (solution: SolutionModel, input: InputModel) => {
    return 0;
  }

  const input: InputModel = readFile(`./inputs/${filename}`);

  let bestSolution: SolutionModel = {};
  let bestScore: number;

  // Apply each approach
  approaches.forEach(approach => {
    const solution: SolutionModel = approach.apply(input);

    // Record score
    const score = getScore(solution, input);
    if (score > bestScore) {
      bestScore = score;
      bestSolution = solution;
    }

  });

  console.log('Best approach: ' + bestSolution.approachName);
  writeFile(bestSolution, `./outputs/${filename}`);
});


