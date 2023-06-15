const { Observable, Subject } = require("rxjs");

const o = new Subject();

o.next("start");

const s1 = o.subscribe({
  next: (data) => {
    console.log("s1 data: ", data);
  },
  error: (err) => {
    console.log("s1 err: ", err);
  },
  complete: () => {
    console.log("s1 complete");
  },
});

o.next("coucou");
o.next(23);
o.next(23);

const s2 = o.subscribe({
  next: (data) => {
    console.log("s2 data: ", data);
  },
  error: (err) => {
    console.log("s2 err: ", err);
  },
  complete: () => {
    console.log("s2 complete");
  },
});

o.next(24);

s2.unsubscribe();

setTimeout(() => {
  o.next(26);
  o.complete();
}, 500);
