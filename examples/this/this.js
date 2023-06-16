"use strict";

function toto() {
  console.log("this: ", this);
}

toto();
toto.bind(234)();

const a = {
  titi: toto,
};

a.titi();
