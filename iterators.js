var request = require('request')

// function myIterator() {
//   var counter = 0;
//   return {
//     next: function() {
//       return {
//         value: counter++,
//         done: counter > 5
//       }
//     }
//   }
// }


// console.log(myIterator())

// function* myIterator() {
//   let counter = 0;
//   while(counter++ < 5) {
//     yield counter;
//   }
// }

// function* myProcess() {
//   var v1 = yield 1;
//   console.log("v1",v1);
//   var v2 = yield 2;
//   console.log("v2",v2);
// }

function http_get(url) {
  return new Promise( (res, rej) => {
      request.get(url, (e, response, body) => {
        if (e) return rej(e)
        return res(body)
      })
    })
}



function execute(p) {
  const awaitable = p();
  return new Promise( (res, rej) => {
    function doStep(r) {
      const { done, value } = awaitable.next(r);
      if (done) return res(value)
      value.then(doStep, e => res(awaitable.throw(e).value)).catch(rej)
    }
    doStep();
  })
}

execute(function* myAysncProcess() {
  console.log("async process starting")
  try {
    var result1 = yield http_get('http://bbc.co.uk')
    console.log("web request 1 complete")
    var result2 = yield http_get('https://www.tes.com')
    console.log("web request 2 complete")
    console.log("results:", result1.length, result2.length)
    return result1.length + result2.length
  } catch (e) {
    console.log("ERRROR", e)
  }
}).then(r => console.log("Result", r)).catch(e => console.log("Error", e))

execute(function* myDynamicAsyncProcess() {
  console.log("async process starting")
  try {
    for(var i of ['http://bbc.co.uk','https://www.tes.com']) {
      yield http_get(i)
      console.log("http_got " + i)
    }
  } catch (e) {
    console.log("ERRROR", e)
  }
}).then(r => console.log("Result", r)).catch(e => console.log("Error", e))


//execute(myAysncProcess).then(() => console.log("@@@")).catch(e => console.log(e))


//const myIter = (seed, top) => () => ({ next: () => ({ value: seed, done: seed++ > top })})

// var a = {}
// console.log(myIter(0, 5))
// a[Symbol.iterator] = myIter(0, 5)
// console.log([...a])
// z[Symbol.iterator] = myIterator

// console.log([...z])
