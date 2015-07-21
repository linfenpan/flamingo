<timer>
    <h3>计时器: {count}</h3>

    this.count = opts.start || 0;
    tick(){
        this.count++;
        this.update();
    }

    var timer = setInterval(this.tick, 1000);
    // 在删除标签时，清空计时器
    this.on("unmount", function(){
        clearInterval(timer);
    });
</timer>
