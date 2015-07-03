$(function(){
    $(".content[data-platform='android']").addClass("hide");
//init
    $(".platform>div").on("click",function(){
        if($(this).hasClass("active")){return};
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
        $(this).parent().parent().parent().find(".content").toggleClass("hide");
    });
    //events

});

$(function(){
	// 每隔 3 秒，滚动一次
	var $pt = $("#slideWrap .slideL"), time = 3000, child = ".litem";
	var $ch = $pt.find(child), width = $ch.eq(0).width(), max = $ch.size();
	
	if(width <= 1){
		return;
	}
	$ch.eq(0).fadeIn(200);
	
	$pt.width(width * max);
	
	var current = 0, next = 1, cb, timer;
	function fn(){
		next = current + 1;
		if(next >= max){
			next = 0;
		}
		gotoIndex(next);
		start();
	};
	function start(){
		stop();
		timer = setTimeout(fn, time);
	};
	function stop(){
		clearTimeout(timer);
	};
	function gotoIndex(i){
		$ch.eq(current).fadeOut(200);
		$ch.eq(i).fadeIn(300);
		
		current = i;
		cb && cb(current);
	};
	start();
	
	$("#slideWrap .slideLWrap").on("mouseenter", stop).on("mouseleave", start).trigger("mouseleave");
	
	// 按照图片数量，生成点的数量
	var dots = new Array(max + 1), 
		dots = dots.join('<span class="dot"></span>'),
		dotActiveClass = "dot_active",
		$dpt = $("#slideWrap .dots");
	
	$dpt.html(dots).on("click", ".dot", function(){
		var index = $(this).index();
		gotoIndex(index);
	}).find(".dot:eq(0)").addClass(dotActiveClass);
	
	// 切换后，索引的回调
	var $dots = $(".dot", $dpt);
	cb = function(index){
		$dots.removeClass(dotActiveClass).eq(index).addClass(dotActiveClass);
	};
});;
