const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function CustomPromise(executor) {
  let state = PENDING;
  let value = null;
  let handlers = [];
  let catchers = [];

  function resolve(result) {
    if (state !== PENDING) return;

    state = FULFILLED;
    value = result;

    handlers.forEach((h) => h(value));
  }

  function reject(err) {
    if (state !== PENDING) return;

    state = REJECT;
    value = err;

    catches.forEach((c) => c(err));
  }

  this.then = function (callback) {
    if (state === FULFILLED) {
      callback(value);
    } else {
      handlers.push(callback);
    }
  };

  executor(resolve, reject);
}

const doWork = function (res, rej) {
  setTimeout(() => {
    res("Hello world");
  }, 1000);
};

let someText = new CustomPromise(doWork);

someText.then((val) => {
  console.log("1st log: " + val);
});

someText.then((val) => {
  console.log("2nd log: " + val);
});

setTimeout(() => {
  someText.then((val) => {
    console.log("3nd log: " + val);
  });
}, 3000);
