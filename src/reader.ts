import * as fs from 'fs';
import InputModel from './models/input.model';
import Book from './models/book.model';
import Library from './models/library.model';

export const readFile = (fileName: string): InputModel => {

  const input: InputModel = {};

  // Read file by line
  const data = fs.readFileSync(fileName, "utf-8").split("\n");

  // Get global info
  const firstLine = data[0].split(" ");
  input.days = Number(firstLine[2]);

  // Get book scores
  const books: Book[] = data[1].split(" ").map((value, index) => {
    return {
      id: Number(index),
      score: Number(value)
    };
  });

  // Get our libraries
  const libraries: Library[] = [];
  for (let i = 2; i < data.length - 1; i += 2) {

    // Read library line
    const libraryLine = data[i].split(" ").map(i => Number(i));
    const library: Library = {
      signupLength: libraryLine[1],
      booksPerDay: libraryLine[2],
      books: []
    }

    // Read books line
    const booksLine = data[i + 1].split(" ").map(i => Number(i));
    booksLine.forEach(id => library.books.push(books[id]));

    libraries.push(library);
  }

  input.libraries = libraries;
  return input;
}
