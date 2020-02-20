import Library from './models/library.model';
import InputModel from './models/input.model';

export const removeExcessiveSignupLibraries = (input: InputModel): Library[] => {
  return input.libraries.filter(library => {
    library.signupLength < input.days;
  });
}
