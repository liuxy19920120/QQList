/*
 	滑屏
 	mScroll
 	init{
 		el:elememt,(滑屏区域)
 		dir:"x"||"y",(滑屏方向)
 	}
 * */
(function(){
	var target = document.querySelector('#content');
	mScroll({
		el:target,
		dir:'y'
	})
})()
createLi()
function createLi(){
	var list = document.getElementById('list')
	ajax('get','http://localhost:8888','',function(data){
           data = JSON.parse(data)
           var str = ''
           for(var i=0;i<data.length;i++){
           	 var li = document.createElement('li')
           	  li.innerHTML= `<div class="swiper">
							<div class="info">
							   <span class="avatar">
							   	
							   </span>
							   <div class="desc">
							   	 <p>${data[i].new_message}</p>
							   	 <p>宁肖：一堆从C扩展</p>
							   </div>
							   <div class="tips">
							   	 <span class="time">${getDate(data[i].date_time)}</span>
							   	 <i class="count">${data[i].message_number}</i>
							   </div>
							</div>
							<div class="btns">
								<button class="top">置顶</button>
								<button class="read">已读</button>
								<button class="delete">删除</button>
							</div>
						</div>`
           	 liScroll(li)
            list.appendChild(li)
           }
	})
}

function liScroll(li){
	mScroll({
		el:li,
		dir:'x'
	})
}
function mScroll(init){
	var translate = {
		x:'translateX',
		y:'translateY'
	}
	var target = init.el
	var child = target.children[0]
	var dir = init.dir
	css(child,translate[dir],0)
	var max = {
		x:parseInt(css(child,'width') - css(target,"width")),
		y:parseInt(css(child,'height') - css(target,'height'))
	}
	var startPoint = {
		
	}
	var tarterPoint={
		
	}
	
	var startEl = {
		
	}
	
	target.addEventListener('touchstart',function(e){
		var touch = e.changedTouches[0];
		startPoint = {
			x:touch.pageX,
			y:touch.pageY
		}
		startEl = {
			x:css(child,'translateX'),
			y:css(child,'translateY'),
		}
		max = {
		x:parseInt(css(child,'width') - css(target,"width")),
		y:parseInt(css(child,'height') - css(target,'height'))
	}
	})
	target.addEventListener('touchmove',function(e){
		var touch = e.changedTouches[0];
		var newPoint = {
			x:touch.pageX,
			y:touch.pageY
		}
		var dis = {
			x:newPoint.x - startPoint.x,
			y:newPoint.y - startPoint.y
		}
		var el = {
		}
		el[dir] = startEl[dir] + dis[dir]
		css(child,translate[dir],el[dir])
	})
	target.addEventListener('touchend',function(e){
		var now = css(child,translate[dir])
		console.log(now)
		if(now < -max[dir]){
			now = -max[dir]
		}else if( now >= 0){
			now = 0
		}
		var obj = {			
		}
		obj[translate[dir]] = now
		startMove({
			el:child,
			target:obj,
			type:'linear',
			time:500
		})
		
	})
}
