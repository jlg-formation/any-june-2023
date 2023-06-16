import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, delay, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DuplicateService implements AsyncValidator {
  constructor(private http: HttpClient) {}
  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(undefined).pipe(
      tap(() => {
        console.log('start');
      }),
      delay(1000), // debounce
      switchMap(() => {
        console.log('start deb', control.value);
        console.log('this.http: ', this);
        return this.http.post<{ result: boolean }>('/api/check', {
          value: control.value,
        });
      }),
      map((output: { result: boolean }) => {
        console.log('start async validate service', output);

        if (output.result === false) {
          return {
            duplicate: 'XXX not permitted',
          };
        }
        return {};
      }),
      catchError(() => {
        return of({});
      })
    );
  }
}
