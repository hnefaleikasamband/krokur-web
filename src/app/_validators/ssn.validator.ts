import { AbstractControl } from '@angular/forms';

export function SsnValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  return !validateSSN(control.value) ? { ssnValidator: true } : null;
}

function validateSSN(data: string): boolean {
  const MAGIC_NUMBERS = [3, 2, 7, 6, 5, 4, 3, 2, 0, 0];

  const kt = formatSsn(data);
  if (kt.length !== 10) {
    return false;
  }

  if (!isPerson(kt)) {
    return false;
  }
  const sum = kt.split('').reduce((prev, curr, i) => {
    return prev + parseInt(curr) * MAGIC_NUMBERS[i];
  }, 0);

  const remainder = 11 - (sum % 11);
  const secretNr = parseInt(kt.substr(8, 1), 0);

  return (remainder == 11 && secretNr === 0) || remainder === secretNr;
}

export function formatSsn(p_kennitala) {
  let kennitala = '' + p_kennitala;

  kennitala = kennitala.replace(/(\D)+/g, '');

  if (kennitala.length === 9) {
    kennitala = '0' + kennitala;
  }

  return kennitala;
}

function isPerson(kt) {
  const d = parseInt(kt.substr(0, 2), 10);

  return d > 0 && d <= 31;
}
