const { Observable } = require("rxjs");

const o = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  const timer = setTimeout(() => {
    console.log("start timeout");
    subscriber.next(4);
    subscriber.error(new Error("tutu"));
  }, 1000);

  return () => {
    console.log("I die");
    clearTimeout(timer);
  };
});

const s = o.subscribe({
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
});

setTimeout(() => {
  s.unsubscribe();
}, 1500);
