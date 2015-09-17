var FramePlayer = (function(){
	function FramePlayer(args){
		var self=this;
		self.o=document.querySelector(args.id);
		self.duration=args.duration;//ms
		self.total=args.total;
		self.showFirstFrame=args.showFirstFrame;
		self.ctx = self.o.getContext("2d");
		self.w=self.o.width;
		self.h=self.o.height;
		self.frames=[];
		self.loop=null;
    self.imgFormat= args.imgFormat || '.png';
    self.framesBaseUrl= args.framesBaseUrl || "images/frames/";
    self.preload= false || args.preload;
    self.autoplay=args.autoplay || false;
    if(self.preload==true){
      self.loadImgs();
    }
    if(self.autoplay==true){
      self.play();
    }
	}
  FramePlayer.prototype.loaded=false;
	FramePlayer.prototype.draw=function(img){
		this.ctx.clearRect(0,0,this.w,this.h);
		this.ctx.drawImage(img,0,0,this.w,this.h);
	}
	FramePlayer.prototype.loadImgs=function(){
		var self=this;
    if(self.loaded)return;
		for(var i=1;i<=self.total;i++){
			var imgString = self.framesBaseUrl+i+self.imgFormat;
			self.frames.push(new Image());
			self.frames[i-1].src=imgString;
			self.frames[i-1].onload=function(){
				var _img=this;
				if(self.showFirstFrame && parseInt(_img.src.match(/\d+/g))==1){
					self.draw(_img);
				}
			}
      if(i==self.total)self.loaded=true;
		}
	}
	FramePlayer.prototype.play=function(){
		var self=this,
        i=0;
    if(self.frames.length==0){
      self.loadImgs();
    }
    self.loop=setInterval(function(){
      self.draw(self.frames[i]);
      i++;
      if(i>=self.total){
        clearInterval(self.loop);
        if(self.end)self.end();
      }
    },self.duration);
	},
	FramePlayer.prototype.stop=function(){
		var self=this;
		clearInterval(self.loop);
		if(self.showFirstFrame){
			self.draw(self.frames[0]);
		}else{
			self.ctx.clearRect(0,0,self.w,self.h);	
		}
	},
	FramePlayer.prototype.clear=function(){
		var self=this;
		clearInterval(self.loop);
		self.ctx.clearRect(0,0,self.w,self.h);	
	},
	FramePlayer.prototype.end=null;
	return FramePlayer;
})();