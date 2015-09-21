var FramePlayer = (function(){
	function FP(paras){
    this.opt={
      id:"",
      duration : 16,
      total : 0,
      showFirstFrame : false,
      loop: false,
      imgFormat: '.png',
      framesBaseUrl: "frames/",
      autoplay: false
    }
    if(paras){
      for(a in paras){
        this.opt[a]=paras[a];
      }
    }
    this.init();
	}
  FP.prototype={
    loaded:false,
    frames:[],
    init:function(){
      var self = this;
      if(self.opt.id){
        self.canvas=document.querySelector(self.opt.id)
        self.ctx=self.canvas.getContext("2d")
        self.w=self.canvas.width
        self.h=self.canvas.height
        self.loadImgs(function(){
          if(self.opt.autoplay){
            self.play();
          }
        });
      }else{
        return;
      }
    },
    draw:function(img){
      var self = this;
      self.ctx.clearRect(0,0,this.w,this.h);
      self.ctx.drawImage(img,0,0,this.w,this.h);
    },
    loadImgs:function(cb){
      var self=this;
      for(var i=0;i<self.opt.total;i++){
        var imgString = self.opt.framesBaseUrl+(i+1)+self.opt.imgFormat;
        self.frames.push(new Image());
        self.frames[i].src=imgString;
        self.frames[i].setAttribute("data-fp-index",i);
        self.frames[i].onload=function(){
          var _img=this;
          if(self.opt.showFirstFrame && parseInt(_img.src.match(/\d+/g))==1){
            self.draw(_img);
          }
        }
        if(i==self.opt.total-1){
          self.loaded=true;
          cb()
        };
      }
    },
    play:function(){
      var self=this,
          i=self.opt.showFirstFrame?1:0;
      self.interval=setInterval(function(){
        console.log(self.opt.duration)
        self.draw(self.frames[i]);
        i++;
        if(i>=self.opt.total){
          if(self.opt.loop==false){
            clearInterval(self.interval);
          }else{
            i=0;
          }
        }
      },self.opt.duration);
    },
    stop:function(){
      var self=this;
      clearInterval(self.interval);
      if(self.opt.showFirstFrame){
        self.draw(self.frames[0]);
      }else{
        self.ctx.clearRect(0,0,self.w,self.h);	
      }
    }
  }
	return FP;
})();