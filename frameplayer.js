var FramePlayer = (function(){
	function FP(paras){
    this.cav = document.getElementById(paras.id);
    this.ctx = this.cav.getContext('2d');
    this.width = this.cav.width;
    this.height = this.cav.height;
    this.duration = paras.duration || 1000;
    this.imgUrl = paras.imgUrl || 'images/';
    this.imgs= paras.imgs || [];
    this.imgsCount = this.imgs ? this.imgs.length : 0;
    this.autoplay = paras.autoplay || false;
    this.showFirstFrame = paras.showFirstFrame || false;
    this.loop = paras.loop || false;
    this.frames = [];
    this.framesCount = 0;
    this.currFrameIndex = 0;
    this.readyTag = false;
    this.playingTag = false;
    this.playInterval = null;
    this.onReady = paras.onReady;
    this.onPlay = paras.onPlay;
    this.onPause = paras.onPause;
    this.onEnd = paras.onEnd;
    this.onInit = paras.onInit;
    this.cache = document.createElement('canvas');
    this.cache.width = this.width;
    this.cache.height = this.height;
    this.cacheCtx = this.cache.getContext('2d');
    this.init();
	}
  FP.prototype.loadImg = function(src, index){
    var _this = this,
        img = new Image();
    img.onload = function(){
      _this.frames[index] = this;
      _this.framesCount ++;
      if(_this.framesCount >= _this.imgsCount){
        _this.ready();
      }
    }
    img.src = src;
  }
  FP.prototype.preLoadImg = function(){
    for(var i = 0; i < this.imgsCount; i++){
      this.loadImg(this.imgUrl + this.imgs[i], i);
    }
  }
  FP.prototype.ready = function(){
    this.readyTag = true;
    if(this.onReady) this.onReady();
    //加载完成之后做canvas缓存
    for(var i = 0; i < this.framesCount; i++){
      this.cacheCtx.drawImage(this.frames[i], 0, 0);
    }
    if(this.showFirstFrame) this.draw();
    if(this.autoplay) this.play();
  }
  FP.prototype.draw = function(){
    var _this = this,
        currFrame = _this.frames[_this.currFrameIndex];
    _this.ctx.clearRect(0, 0, _this.width, _this.height);
    _this.ctx.drawImage(currFrame, 0, 0);
  }
  FP.prototype.play = function(){
    var _this = this;
    if(!_this.playingTag){
      if(_this.onPlay) _this.onPlay();
      _this.playingTag = true;
      _this.draw();
      
      _this.playInterval = setInterval(function(){
        _this.currFrameIndex ++;
        if(_this.currFrameIndex >= _this.framesCount){
          clearInterval(_this.playInterval);
          _this.end();
        }else{
          _this.draw();
        }
      }, _this.duration / _this.framesCount);
      
    }
  }
  FP.prototype.pause = function(){
    var _this = this;
    clearInterval(_this.playInterval);
    _this.playingTag = false;
    if(_this.onPause) _this.onPause();
  }
  FP.prototype.end = function(){
    var _this = this;
    _this.playingTag = false;
    _this.currFrameIndex = 0;
    if(_this.onEnd) _this.onEnd();
    if(_this.loop) _this.play();
  }
  FP.prototype.init=function(){
    var _this = this;
    if(_this.onInit) _this.onInit();
    _this.preLoadImg();
  }
	return FP;
})();