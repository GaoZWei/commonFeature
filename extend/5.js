// 寄生式继承

// 通过create封装一个继承过程的函数,在函数内部以某种形式增强对象,最后返回对象
function createObi(obj) {
    var clone = Object.create(obj)
    clone.sayName = function () {
        console.log('hi');
    }
    return clone
}
// 问题1: 与借用构造函数模式一样， 每次创建对象都会创建一遍方法。