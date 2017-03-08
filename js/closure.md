闭包是JavaScript的一种特性，而不是函数。

闭包使内部函数总是能访问外部函数的变量和参数，甚至在外部函数已经retuen的情况下。

## 使用场景

#### 定义私有变量的时候

```js
function Application() {
    var password = '123456';
    
    this.getPassword = function(){
        return password;
    }
}

var app = new Application();
app.getPassword();
```

`password`此时就是个私有变量，只能通过`getPassword`获取。


## 变量作用域

要理解闭包，首先必须理解Javascript特殊的变量作用域。

变量的作用域无非就是两种：全局和局部（函数）。

Javascript语言的特殊之处，就在于作用域链（scope chain）：内部函数可以访问外部函数的变量，和全局的变量。举个例子：

```js
var color = 'blue';

function changeColor(){

    var anotherColor = 'red';
    
    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
        
        //这里可访问color，anotherColor和tempColor
    }
    
    // 这里可访问color，anotherColor，但不能访问tempColor
    swapColors();
}

// 这里只能访问color
changeColor();
```

本文主要参考：

- [Private Members in JavaScript](http://www.crockford.com/javascript/private.html)
- [学习Javascript闭包（Closure）](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)