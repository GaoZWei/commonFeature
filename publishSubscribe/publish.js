//自己手写

class Observer {
    constructor() {
        this.message = {}
    }
    $on(type, callback) {
        if (!this.message[type]) {
            this.message[type] = []
        }
        this.message[type].push(callback)
    }
    $off(type, callback) {
        if (!this.message[type]) return
        if (!callback) this.message[type] = undefined
        this.message[type] = this.message[type].filter((item) => item != callback)
    }
    $emit(type) {
        if (!this.message[type]) return
        this.message[type].forEach((item) => {
            item()
        })
    }
}

var person = new Observer()
person.$on('key', handleA)
person.$on('key', handleB)
person.$on('key', handleC)
person.$off('key', handleC)
console.log('person---', person);
person.$emit('key')


function handleA() {
    console.log('handleA1');
}

function handleB() {
    console.log('handleB');
}

function handleC() {
    console.log('handleC');
}