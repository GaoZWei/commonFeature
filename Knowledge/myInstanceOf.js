// 模拟实现instanceof
const myinstanceOf = (obj, constructor) => {
  // 获取对象的原型
  let _proto = Object.getPrototypeOf(obj);
  // 向上找对象的原型链
  while (_proto) {
    if (_proto === constructor.prototype) {
      return true;
    }
    _proto = Object.getPrototypeOf(_proto);
  }
  return false;
};

function People() {}
function Animal() {}

const dog = new Animal();
console.log(myinstanceOf(dog, People));

// 原型链
function Police() {}
Police.prototype = new People();
const police = new Police();
console.log(myinstanceOf(police, People));
