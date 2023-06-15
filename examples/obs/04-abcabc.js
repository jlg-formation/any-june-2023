const { interval, startWith, map } = require("rxjs");

interval(1000)
  .pipe(
    startWith(-1),
    map((x) => x + 1),
    map((x) => x % 3),
    map((x) => String.fromCharCode(x + 97))
  )
  .subscribe(console.log);
