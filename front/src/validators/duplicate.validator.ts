import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

export const duplicate = (
  control: AbstractControl
): Observable<ValidationErrors> => {
  return of(undefined).pipe(
    delay(2000),
    map(() => {
      console.log('start async validate');

      if (control.value === 'XXX') {
        return {
          duplicate: 'XXX not permitted',
        };
      }
      return {};
    })
  );
};
