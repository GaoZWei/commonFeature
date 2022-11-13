//es6继承
// https://www.jianshu.com/p/3d09c6fe330e
class Father {
    //核心
    constructor(props) {
        this.name = props.name
    }
    say() {
        console.log(this.name);
    }
}
var father = new Father({
    name: 'gy'
})
father.say()

//核心
class Son extends Father {
     //核心
    constructor(props, ownAttr) {
        super(props)
        this.type = props.type
        this.ownAttr = ownAttr
    }
    say() {
        console.log(this.name);
    }
    getTypeAndAttr() {
        console.log(this.type + '--' + this.ownAttr);
    }
}
var son = new Son({
    name: 'gzw',
    type: 'first'
}, 'cool')
son.say()
son.getTypeAndAttr()