// 原型式继承

// 核心
function createObj(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}
var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin
person1.friends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]

// 问题1:包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。