// 原文:https://juejin.cn/post/7052637219084828680
// 发布订阅模式:对象一对多的关系,  一个对象状态改变,依赖于他的对象都能得到对应的通知

// 订阅者(Subscriber) 把想订阅的事件注册(Subscribe) 到调度中心(Event Channel)
// 发布者发布该事件到调度中心,该事件触发时,由调度中心统一调配订阅者注册到调度中心的处理代码

// 优点:低耦合 缺点:不容易跟踪维护

// 实现步骤:
// 1.创建类class
// 2.类中创建缓存列表(调度中心)
// 3.on方法-把fn添加到缓存列表(订阅者注册事件到调度中心)
// 4.emit-取到event类型,根据event值执行缓存列表中的函数(发布者发送事件到调度中心,调度中心处理代码)
// 5.off根据event事件类型取消订阅(取消订阅)

// 1. 创建一个 Observer 类
// 2. 添加三个核心方法
class Observer {
    //设置缓存列表(消息队列)
    constructor() {
        this.message = {} //消息队列
    }
    //消息队列中添加内容
    $on(type, callback) {
        if (!this.message[type]) {
            this.message[type] = []
        }
        this.message[type].push(callback)
    }
    // 触发消息队列中的内容
    $emit(type) {
        if (!this.message[type]) return
        this.message[type].forEach(item => {
            item()
        });
    }
    // 删除消息队列中的内容
    $off(type, callback) {
        if (!this.message[type]) return
        if (!callback) { //如果没有callback直接删掉整个事件
            this.message[type] = undefined
        }
        //有callback仅删掉callback
        this.message[type] = this.message[type].filter((item) => item !== callback)
    }
}

//创建一个订阅者
const person1 = new Observer()
//向person1委托一些内容,事件名,回调函数
person1.$on('buy', handleA)
person1.$on('buy', handleB)
person1.$on('buy', handleC)
console.log('person1---', person1);
person1.$off('buy', handleC)
// console.log('person1---', person1);
// person1.$off('buy');
person1.$emit('buy');

function handleA() {
    console.log('handleA');
}

function handleB() {
    console.log('handleB');
}

function handleC() {
    console.log('handleC');
}