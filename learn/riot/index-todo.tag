<todo>
    <h1>{title}</h1>
    <wa></wa>
    <p>年龄: {age}</p>
    <p id="p1" riot-tag="timer"></p>
    <p id="p2" riot-tag="timer"></p>

    this.mixin("tool");
    this.include("./index-timer.tag", "timer", "#p1");
    setTimeout(function(){
        // 可以延迟初始化，证明两者的数据，可相互独立
        riot.mount("#p2", "timer")
    }, 3000);
</todo>

<wa>
    <p>名字: {parent.name}</p>
</wa>
