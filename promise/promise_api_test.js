// case1
// var a = Promise.resolve(1).then((data) => {
//     console.log(data);
// }) //打印1


// case2:测验resolve传入thenable对象
// let thenable = {
//     then: function (resolve, reject) {
//         resolve(42);
//     }
// };
// let p1 = Promise.resolve(thenable); //立即执行then
// console.log(2)
// p1.then(function (value) {
//     console.log(value); // 42
// });

// case3:测验then中的返回值
// var p1 = Promise.resolve(22)
// var p2 = Promise.resolve(33)
// p1.then((data) => {
//     console.log(data)
//     console.log(p2); //Promise { 33 }
//     return p2   //继续向后传递
// }).then((data) => {
//     console.log(data)
// })

// case4:测试promise.all的reject
// var p1 = Promise.resolve(11)
// var p2 = Promise.reject(22)
// var p3 = Promise.resolve(333)
// var arr = [p1, p2, p3]
// var p = Promise.all(arr)
// p.then((data) => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err); //22
//     })

// case5: 测试allSettled
// var p1 = Promise.resolve(11)
// var p2 = Promise.reject(22)
// var p3 = Promise.resolve(333)
// var arr = [p1, p2, p3]
// var p = Promise.allSettled(arr)
// p.then((data) => {
//     console.log(data);
// })
// 返回的对象数组
// [
//     { status: 'fulfilled', value: 11 },
//     { status: 'rejected', reason: 22 },
//     { status: 'fulfilled', value: 333 }
// ]

// case6: 测试.then无return,.then也返回的promise对象
// var p1 = Promise.resolve(33)

// var p2 = p1.then(() => {
//     console.log(11);
// })

// p2.then((a) => {
//     console.log(22);
//     console.log(a); //undefined
// })


// case7:测试 promise没有被resolve或者reject,依然处于pending
var p1 = new Promise(() => {
    console.log(111);
})
var p2 = p1.then(() => {
    console.log(11); //不执行
})
p2.then((a) => {
    console.log(22);
    console.log(a);
})