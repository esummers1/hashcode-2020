import * as fs from 'fs';
import InputModel from './models/input.model';
import Book from './models/book.model';
import Library from './models/library.model';

export const readFile = (fileName: string): InputModel => {
  const lines = fs.readFileSync(fileName, "utf-8").split("\n");
  const days = Number(lines[0].split(" ")[2]);
  const books: Book[] = readBooks(lines[1]);
  const libraries = getLibraries(lines, books);
  return { days, libraries };
}

const readBooks = (line: string): Book[] => {
  return line.split(" ").map((value, index) => {
    return {
      id: Number(index),
      score: Number(value)
    };
  });
}

const getLibraries = (lines: string[], books: Book[]): Library[] => {
  const libraries: Library[] = [];
  for (let i = 2; i < lines.length - 2; i += 2) {

    // Read library line
    const libraryLine = lines[i].split(" ").map(i => Number(i));
    const library: Library = {
      id: i / 2 - 1,
      signupLength: libraryLine[1],
      booksPerDay: libraryLine[2],
      books: []
    }

    // Read book list line
    lines[i + 1]
      .split(" ")
      .map(i => Number(i))
      .forEach(id => library.books.push(books[id]));

    libraries.push(library);
  }
  return libraries;
}
