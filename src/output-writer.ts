import * as fs from 'fs';
import SolutionModel from './models/solution.model';
import LibraryModel from './models/library.model';
import BookModel from './models/book.model';

export const writeFile = (solution: SolutionModel, filename: string): void => {
  console.log('Writing solution for ', filename);
  let wstream = fs.createWriteStream(`${filename}.output`);

  // Write number of libraries
  wstream.write(`${solution.libraries.length} \n`);

  // Write each library
  solution.libraries.forEach((library: LibraryModel) => {

    // Write library ID
    wstream.write(`${library.id} `);

    // Write number of books scanned
    wstream.write(`${solution.books.get(library.id).length}\n`);

    // Write each book ID
    solution.books.get(library.id).forEach((book: BookModel) => {
      wstream.write(`${book.id} `);
    });

    wstream.write(`\n`);
  });

  wstream.end();
};
