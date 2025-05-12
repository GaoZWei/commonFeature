// 闭包应用场景
function memoize(fn) {
  const cache = {};
  return function (...args) {
    console.log("...args", ...args); // ...args 1 2
    console.log("args", args); // args [ 1, 2 ]
    const key = JSON.stringify(args);
    console.log("key", key);
    if (key in cache) {
      console.log("Fetching from cache:", key);
      return cache[key];
    }
    console.log("Calculating result:", key);
    const result = fn(...args);
    cache[key] = result;
    console.log("cache", cache); // cache { '[1,2]': 3 }
    return result;
  };
}

// 使用闭包实现缓存
const add = (a, b) => a + b;
const memoizedAdd = memoize(add);

console.log(memoizedAdd(1, 2)); // 输出: Calculating result: [1,2] -> 3
console.log(memoizedAdd(1, 2)); // 输出: Fetching from cache: [1,2] -> 3
