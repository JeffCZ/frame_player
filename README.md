#frame_player#

一个微小的帧动画组件，参考demo

相关参数：

	{
		// canvas的id
        id: "player",
		// 动画总时长。这里考虑到帧动画图片一般由一段视频导出，可以方便地拿到总时长，所以使用总时长来控制动画速度
        duration: 800,
		// 图片名数组
        imgs: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png'],
		// 图片路径
        imgsUrl: './images/',
		// 加载完自动播放
        autoplay: false,
		// 循环播放
        loop: false,
		// 显示第一帧
        showFirstFrame: true,
		// 加载完成cb
        onReady: function() {
            console.log(this.framesCount)
        },
		// 开始播放cb
        onPlay: function() {
            console.log('play')
        },
		// 暂停cb
        onPause: function() {
            console.log('pause')
        },
		// 播放结束cb
        onEnd: function() {
            console.log('end')
        }
    }



