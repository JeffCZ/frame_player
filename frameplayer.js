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
    this.init();
	}
  FP.prototype.loadImg = function(src, index){
    var _this = this,
        img = new Image(),
        loadCalculator = 0;
    img.onload = function(){
      _this.frames[index] = this;
      _this.framesCount ++;

      if(_this.framesCount >= _this.imgsCount){
        // 图片全部加载完成
        _this.ready();
      }
    }
    img.src = src;
  }
  FP.prototype.preLoadImg = function(){
    var _this = this;
    for(var i = 0; i < _this.imgsCount; i++){
      _this.loadImg(_this.imgUrl + _this.imgs[i], i);
    }
  }
  FP.prototype.ready = function(){
    var _this = this;
    _this.readyTag = true;
    if(this.showFirstFrame) _this.draw();
    if(_this.autoplay) _this.play();
  }
  FP.prototype.draw = function(){
    var _this = this,
        currFrame = _this.frames[_this.currFrameIndex];
    _this.ctx.clearRect(0, 0, _this.width, _this.height);
    _this.ctx.drawImage(currFrame, 0, 0, _this.width, _this.height);
  }
  FP.prototype.play = function(){
    var _this = this;
    if(_this.playingTag == false){
      _this.playingTag = true;
      _this.draw()
      _this.playInterval = setInterval(function(){
        _this.currFrameIndex ++;
        if(_this.currFrameIndex >= _this.imgsCount){
          clearInterval(_this.playInterval);
          _this.end();
        }else{
          _this.draw();
        }
      }, _this.duration / _this.imgsCount);
    }
  }
  FP.prototype.pause = function(){
    var _this = this;
    clearInterval(_this.playInterval);
    _this.playingTag = false;
    console.log('pause')
  }
  FP.prototype.end = function(){
    var _this = this;
    _this.playingTag = false;
    _this.currFrameIndex = 0;
    console.log('end')
  }
  FP.prototype.init=function(){
    var _this = this;
    _this.preLoadImg();
  }
	return FP;
})();