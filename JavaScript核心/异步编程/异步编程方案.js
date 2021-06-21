// 异步编程方式：回调函数、事件监听、Promise、Generator、async/await
// 同步编程与异步编程的区别
    // 异步不阻塞后续代码的执行，但是使用async await之类的，会将异步变成同步，会不会阻塞代码运行了
   //  Generator 不是很懂
    function* gen() {

        let a = yield 111;
    
        console.log(a);
    
        let b = yield 222;
    
        console.log(b);
    
        let c = yield 333;
    
        console.log(c);
    
        let d = yield 444;
    
        console.log(d);
    
    }
    
    let t = gen();
    
    console.log(t.next(1)) ; //第一次调用next函数时，传递的参数无效，故无打印结果
    
    t.next(2); // a输出2;
    
    t.next(3); // b输出3; 
    
    t.next(4); // c输出4;
    
    t.next(5); // d输出5;
    