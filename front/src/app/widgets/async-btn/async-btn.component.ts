import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Observable, catchError, finalize, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-async-btn',
  templateUrl: './async-btn.component.html',
  styleUrls: ['./async-btn.component.scss'],
})
export class AsyncBtnComponent {
  isRunning = false;
  faCircleNotch = faCircleNotch;

  @Input()
  icon = faCircleNotch;
  @Input()
  label = 'to be defined';
  @Input()
  action: Observable<void> = of(undefined);

  @Output()
  xxStart = new EventEmitter<void>();

  @Output()
  xxError = new EventEmitter<Error>();

  run() {
    of(undefined)
      .pipe(
        switchMap(() => {
          this.isRunning = true;
          this.xxStart.emit();
          return this.action;
        }),
        catchError((err) => {
          console.log('err: ', err);
          this.xxError.emit(err);
          return of(undefined);
        }),
        finalize(() => {
          this.isRunning = false;
        })
      )
      .subscribe();
  }
}
