import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidator {

  // whiteSpace validator
  static noWhiteSpaces(control: FormControl): ValidationErrors {
    // check only for contain whitespace
    if ((control.value != null) && (control.value.trim().length === 0)) {
      // invalid return error obj
      return { 'noWhiteSpaces': true };
    }
    else {
      // valid return null
      return null;
    }
  }
}
