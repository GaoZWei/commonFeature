// 寄生组合式继承  (寄生+原型链)

// 组合继承最大缺点:调用两次父构造函数
// 第一次
// Child.prototype = new Parent();
// 第二次
// var child1 = new Child('kevin', '18');
// 这两次new中会执行
// Parent.call(this, name);

function Parent(name) {
    this.name = name
    this.color = ['yellow', 'blue']
}
Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}

//核心
// var F = function () {}
// F.prototype = Parent.prototype
// Child.prototype = new F()

// var child1 = new Child('kevin', 18)
// console.log(child1);


//封装后(核心)
function createObj(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

function extend(child, parent) {
    var tmp = createObj(parent.prototype)
    child.prototype = tmp
    tmp.construtor = child //感觉可以没有
}
extend(Child, Parent)

var child1 = new Child('kevin', 18)
console.log(child1);
