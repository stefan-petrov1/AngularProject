import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const appUrlValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  const regex =
    /((https?:\/\/|(ftp:\/\/)).*|(.*\.[^\.]{2,6})(\/.*)?)(\:.*)?$/gm;
  const isValid = regex.test(control.value);

  if (isValid) {
    return null;
  }

  return { appUrlValidator: true };
};
