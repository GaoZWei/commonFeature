// 组合继承(原型链+经典继承) --比较常用

function Parent(name) {
    this.name = name
    this.color = ['red', 'yellow']
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child(name, age) {
    //核心2
    Parent.call(this, name)
    this.age = age
}

//核心1
Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child('gzw', 10)
child1.color.push('pink')
child1.getName() //gzw
console.log(child1.color); //[ 'red', 'yellow', 'pink' ]