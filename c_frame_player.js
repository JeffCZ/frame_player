var CFP = (function($){
	function CFP(args){
		var _this=this;
		_this.o=$(args.id);
		_this.duration=args.duration;//ms
		_this.total=args.total;
		_this.showFirstFrame=args.showFirstFrame;
		_this.ctx = _this.o[0].getContext("2d");
		_this.w=_this.o.width();
		_this.h=_this.o.height();
		_this.frames=[];
		_this.loop=null;

		_this.preload();
	}
	CFP.prototype.draw=function(img){
		this.ctx.clearRect(0,0,this.w,this.h);
		this.ctx.drawImage(img,0,0,this.w,this.h);
	}
	CFP.prototype.preload=function(){
		var _this=this;
		var loaded=0;
		for(var i=1;i<=_this.total;i++){
			var imgString = "images/daji/"+(i>9?i:('0'+i))+".png";
			_this.frames.push(new Image());
			_this.frames[i-1].src=imgString;
			_this.frames[i-1].onload=function(){
				var _img=this;
				if(_this.showFirstFrame && parseInt(_img.src.match(/\d+/g))==1){
					_this.draw(_img);
					console.log(_img);
				}
			}
		}
	}
	CFP.prototype.play=function(){
		var _this=this,
			i=0;
		_this.loop=setInterval(function(){
			_this.draw(_this.frames[i]);
			i++;
			if(i>=_this.total){
				clearInterval(_this.loop);
				_this.end();
			}
		},_this.duration/_this.total);
	}
	CFP.prototype.pause=function(){
		console.log('pause')
	}
	CFP.prototype.stop=function(){
		var _this=this;
		clearInterval(_this.loop);
		if(_this.showFirstFrame){
			_this.draw(_this.frames[0]);
		}else{
			_this.ctx.clearRect(0,0,_this.w,_this.h);	
		}
	}
	CFP.prototype.end=null;
	return CFP;
})(jQuery);