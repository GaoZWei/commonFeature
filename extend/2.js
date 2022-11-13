//借用构造函数(经典继承)
function Parent() {
    this.names = ['gzw', 'hahah']
}

function Child() {
    //核心
    Parent.call(this)
}

var child1 = new Child()
child1.names.push('yaya1')
console.log(child1); //Child { names: [ 'gzw', 'hahah', 'yaya1' ] }
var child2 = new Child()
console.log(child2); //Child { names: [ 'gzw', 'hahah' ] }

// 优点：
// 1.避免了引用类型的属性被所有实例共享
// 2.可以在 Child 中向 Parent 传参
function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
}
var child1 = new Child('kevin');
console.log(child1.name); // kevin
var child2 = new Child('daisy');
console.log(child2.name); // daisy

// 缺点:方法都在构造函数中定义，每次创建实例都会创建一遍方法。