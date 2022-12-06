import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const appEmailValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.value?.length) return null;

  const regex = /.+@.+\..+/gm;
  const isValid = regex.test(control.value);

  if (isValid) {
    return null;
  }

  return { appEmailValidator: true };
};
