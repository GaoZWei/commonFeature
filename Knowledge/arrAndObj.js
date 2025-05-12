// 匹配函数  数组与对象
let arr = ["1", "2", "3", "4"];
let obj = {
  1: "abc",
  2: "bcd",
};

let keys = Object.keys(obj);
console.log("keys", keys);
let arr1 = arr.filter((item) => keys.includes(item));
console.log("arr1", arr1);
