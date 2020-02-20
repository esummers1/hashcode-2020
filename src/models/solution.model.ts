import LibraryModel from './library.model';

export default interface SolutionModel {
  approachName?: string;
  libraries: LibraryModel[];
  bookIds: Map<number, number[]>; // library id -> book ids
}
