var FramePlayer = (function(){
	function FP(args){
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
    self.loop=args.loop || false;
    if(self.preload==true){
      self.loadImgs();
    }
    if(self.autoplay==true){
      self.play();
    }
	}
  FP.prototype.loaded=false;
	FP.prototype.draw=function(img){
		this.ctx.clearRect(0,0,this.w,this.h);
		this.ctx.drawImage(img,0,0,this.w,this.h);
	}
	FP.prototype.loadImgs=function(){
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
	FP.prototype.play=function(){
		var self=this,
        i=0;
    if(self.frames.length==0){
      self.loadImgs();
    }
    self.loop=setInterval(function(){
      self.draw(self.frames[i]);
      i++;
      if(i>=self.total){
        if(self.loop==false){
          clearInterval(self.loop);
          if(self.end)self.end();
        }else{
          i=0;
        }
      }
    },self.duration);
	},
	FP.prototype.stop=function(){
		var self=this;
		clearInterval(self.loop);
		if(self.showFirstFrame){
			self.draw(self.frames[0]);
		}else{
			self.ctx.clearRect(0,0,self.w,self.h);	
		}
	},
	FP.prototype.clear=function(){
		var self=this;
		clearInterval(self.loop);
		self.ctx.clearRect(0,0,self.w,self.h);	
	},
	FP.prototype.end=null;
	return FP;
})();