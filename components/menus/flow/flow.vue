<template>
	<view class="menus-flow">
		<!-- svg -->
		<view class="line line-a"></view>
		<view class="line line-b"></view>
		<view class="line line-c"></view>
		<view class="line line-d"></view>
		<view class="line line-e"></view>
		<view class="line line-f"></view>
		<view class="line line-g"></view>
		<view class="line line-h"></view>
		<view class="line line-i"></view>
		<view class="line line-j"></view>
		<svg width="100%" height="100%" position="absolute">
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color: rgba(107, 221, 255, 0.84); stop-opacity: 1" />
					<stop offset="50%" style="stop-color: rgba(74, 93, 238, 0.7); stop-opacity: 1" />
					<stop offset="100%" style="stop-color: rgba(107, 221, 255, 0.84); stop-opacity: 1" />
				</linearGradient>
			</defs>
			<!-- <path
        d="M145 205 L 145 205 L195 235"
        id="path1"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
			<!-- <path
        d="M250 250 L 250 250 L325 215"
        id="path2"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
			<!-- <path
        d="M395 180 L 395 180 L465 145"
        id="path3"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
			<!-- <path
        d="M535 155 L 535 155 L585 180"
        id="path4"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path>
      <path
        d="M660 220 L 660 220 L735 257"
        id="path5"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
			<!-- <path
        d="M730 295 L 730 295 L650 340"
        id="path6"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path>
      <path
        d="M790 425 L 790 425 L770 435 L670 370"
        id="path7"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
			<!-- <path
        d="M650 375 L 650 375 L755 445 L700 475"
        id="path8"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
			<!-- <path
        d="M600 370 L 600 370 L510 420"
        id="path9"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
			<!-- <path
        d="M650 505 L 650 505 L 595 535 L 520 480"
        id="path10"
        stroke="url(#grad1)"
        fill="none"
        stroke-width="3"
      ></path> -->
		</svg>
		<!-- 替换svg的线条 -->
		<view class="one"></view>
		<view class="two"></view>
		<view class="thr"></view>
		<view class="four"></view>
		<view class="five"></view>
		<view class="six"></view>
		<view class="seven"></view>
		<view class="eight"></view>
		<view class="nine"></view>
		<view class="ten"></view>
		<!-- banner图 -->
		<view
			v-for="(classItem, classIdx) in bannerClass"
			:key="classIdx"
			class="flow-banner"
			:class="classItem.name"
			:style="{
				backgroundImage: current == classIdx ? 'url(' + classItem.imgC + ')' : 'url(' + classItem.img + ')',
				transform: current == classIdx ? 'scale(1.1)' : ''
			}"
			@click="bannerClick(classIdx)"
		></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: 0,
			// banner class名称
			bannerClass: [
				{
					name: 'xiexiang',
					img: require('../../../static/image/banner/1tu.png'),
					imgC: require('../../../static/image/banner/1tuC.png')
				},
				{
					name: 'xiping',
					img: require('../../../static/image/banner/2tu.png'),
					imgC: require('../../../static/image/banner/2tuC.png')
				},
				{
					name: 'yanping',
					img: require('../../../static/image/banner/3tu.png'),
					imgC: require('../../../static/image/banner/3tuC.png')
				},
				{
					name: 'jiuji',
					img: require('../../../static/image/banner/4tu.png'),
					imgC: require('../../../static/image/banner/4tuC.png')
				},
				{
					name: 'shajun',
					img: require('../../../static/image/banner/5tu.png'),
					imgC: require('../../../static/image/banner/5tuC.png')
				},
				{
					name: 'tiebiao',
					img: require('../../../static/image/banner/6tu.png'),
					imgC: require('../../../static/image/banner/6tuC.png')
				},
				{
					name: 'zhuangxiang',
					img: require('../../../static/image/banner/7tu.png'),
					imgC: require('../../../static/image/banner/7tuC.png')
				},
				{
					name: 'kaixiang',
					img: require('../../../static/image/banner/8tu.png'),
					imgC: require('../../../static/image/banner/8tuC.png')
				},
				{
					name: 'fengxiang',
					img: require('../../../static/image/banner/10tu.png'),
					imgC: require('../../../static/image/banner/10tuC.png')
				},
				{
					name: 'maduo',
					img: require('../../../static/image/banner/9tu.png'),
					imgC: require('../../../static/image/banner/9tuC.png')
				}
			],
			// 循环时间
			time: null,
			flag: false
		};
	},
	mounted() {
		this.openLoop();
	},
	methods: {
		bannerClick(idx) {
			this.current = idx;
			console.log(this.current);
			clearInterval(this.time);
			this.time = null;
			let time = setTimeout(() => {
				this.openLoop();
				clearTimeout(time);
				time = null;
			}, 5000);
		},
		// 循环banner
		openLoop() {
			this.time = setInterval(() => {
				if (this.current == 9) {
					this.current = 0;
					this.flag = false;
				} else if (this.current == 6 && !this.flag) {
					this.current = 7;
					this.flag = true;
				} else if (this.current == 7 && this.flag) {
					this.current = 6;
				} else if (this.current == 6 && this.flag) {
					this.current = 8;
				} else {
					this.current++;
				}
			}, 3000);
		}
	}
};
</script>

<style lang="scss" scoped>
@keyframes moveLine1 {
	0% {
		opacity: 0.2;
	}
	5% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
	90% {
		opacity: 0.8;
	}
	100% {
		offset-distance: 51.25rpx;
		opacity: 0.2;
	}
}
@keyframes moveLine2 {
	0% {
		opacity: 0.2;
	}
	5% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
	90% {
		opacity: 0.8;
	}
	100% {
		offset-distance: 83.87rpx;
		opacity: 0.2;
	}
}
@keyframes moveLine3 {
	0% {
		opacity: 0.2;
	}
	5% {
		opacity: 0.5;
	}
	50% {
		opacity: 1;
	}
	90% {
		opacity: 0.8;
	}
	100% {
		offset-distance: 130.47rpx;
		opacity: 0.3;
	}
}
@keyframes moveLine4 {
	0% {
		opacity: 0.3;
	}
	5% {
		opacity: 0.8;
	}
	50% {
		opacity: 1;
	}
	90% {
		opacity: 0.8;
	}
	100% {
		offset-distance: 121.15rpx;
		opacity: 0.3;
	}
}

// 流程图
.menus-flow {
	// background-color: rgb(148, 148, 148);
	width: 100%;
	height: 419.38rpx;
	position: relative;
	overflow: hidden;
	.flow-banner {
		width: 93.19rpx;
		height: 139.79rpx;
		background-size: 100%;
		background-repeat: no-repeat;
		position: absolute;
		transition: all 0.5s cubic-bezier(0.64, 0.46, 0.4, 0.72);
	}
	.xiexiang {
		top: 27.95rpx;
		left: 4.65rpx;
		width: 130.47rpx;
		height: 177.07rpx;
	}
	.xiping {
		top: 102.51rpx;
		left: 102.51rpx;
	}
	.yanping {
		top: 55.91rpx;
		left: 195.71rpx;
	}
	.jiuji {
		top: 9.31rpx;
		left: 288.9rpx;
	}
	.shajun {
		top: 55.91rpx;
		left: 372.78rpx;
	}
	.tiebiao {
		top: 116.49rpx;
		left: 452rpx;
	}
	.zhuangxiang {
		top: 177.07rpx;
		left: 340.16rpx;
	}
	.kaixiang {
		top: 219.01rpx;
		left: 479.96rpx;
	}
	.maduo {
		width: 149.11rpx;
		height: 195.71rpx;
		top: 209.69rpx;
		left: 219.01rpx;
	}
	.fengxiang {
		top: 279.58rpx;
		left: 382.1rpx;
	}
}

.line {
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(238, 153, 59);
	border-radius: 0;
	border-right: 1.86rpx solid rgb(238, 153, 59);
	transform: rotate(45deg);
	// filter: blur(0.46rpx);
}
.line-a {
	offset-path: path('M105 160 L105 160 L175 205');
	animation: moveLine1 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-a::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}

.line-b {
	offset-path: path('M182 200 L 182 200 L310 135');
	animation: moveLine2 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-b::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-c {
	offset-path: path('M290 145 L 290 145 L470 65');
	animation: moveLine2 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-c::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-d {
	offset-path: path('M365 105 L 365 105 L485 180');
	animation: moveLine2 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-d::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-e {
	offset-path: path('M450 165 L 450 165 L700 305');
	animation: moveLine2 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-e::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-f {
	offset-path: path('M425 285 L 425 285 L830 70');
	animation: moveLine2 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-f::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-g {
	// offset-path: path('M440 295 L 440 295 L 525 350 L 565 330');
	offset-path: path('M565 330 L 565 330 L 525 350 L 440 295');
	animation: moveLine3 5.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
	width: 7.45rpx;
}
.line-g::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-h {
	offset-path: path('M430 300 L 430 300 L520 360 L450 395');
	animation: moveLine4 5.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
	width: 7.45rpx;
}
.line-h::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-i {
	offset-path: path('M400 295 L 400 295 L340 330');
	animation: moveLine3 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-i::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}
.line-j {
	offset-path: path('M440 400 L 440 400 L 410 415 L 270 320');
	animation: moveLine4 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}
.line-j::before {
	content: '';
	position: absolute;
	width: 5.59rpx;
	height: 5.59rpx;
	background: none;
	border-top: 1.86rpx solid rgb(255, 134, 2);
	top: 2.79rpx;
	border-right: 1.86rpx solid rgb(255, 134, 2);
	-webkit-transform: rotate(45deg);
	transform: rotate(0deg);
	right: 2.79rpx;
}

// 替代svg的div
.one {
	position: absolute;
	width: 65.23rpx;
	top: 153.77rpx;
	left: 74.55rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(35deg);
}
.two {
	position: absolute;
	width: 74.55rpx;
	top: 167.75rpx;
	left: 167.75rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(155deg);
}
.thr {
	position: absolute;
	width: 74.55rpx;
	top: 125.81rpx;
	left: 251.63rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(155deg);
}
.four {
	position: absolute;
	width: 74.55rpx;
	top: 121.15rpx;
	left: 340.16rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(210deg);
}
.five {
	position: absolute;
	width: 74.55rpx;
	top: 167.75rpx;
	left: 410.06rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(210deg);
}
.six {
	position: absolute;
	width: 74.55rpx;
	top: 237.65rpx;
	left: 410.06rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(153deg);
}
.seven {
	position: absolute;
	width: 88.53rpx;
	top: 302.88rpx;
	left: 410.06rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(213deg);
}
.seven::before {
	content: '';
	width: 2.79rpx;
	height: 27.95rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	top: 18.63rpx;
	transform: rotate(28deg);
	position: absolute;
	top: 0;
	left: -7.45rpx;
}
.eight {
	position: absolute;
	width: 93.19rpx;
	top: 307.54rpx;
	left: 396.08rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(213deg);
}
.eight::before {
	content: '';
	width: 2.79rpx;
	height: 46.59rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	top: 18.63rpx;
	transform: rotate(27deg);
	position: absolute;
	top: -42.87rpx;
	left: 9.31rpx;
}
.nine {
	position: absolute;
	width: 83.87rpx;
	top: 363.46rpx;
	left: 307.54rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(215deg);
}
.nine::before {
	content: '';
	width: 2.79rpx;
	height: 58.71rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	top: 18.63rpx;
	transform: rotate(27deg);
	position: absolute;
	top: -3.72rpx;
	left: -13.97rpx;
}
.ten {
	position: absolute;
	width: 55.91rpx;
	top: 288.9rpx;
	left: 321.52rpx;
	height: 2.79rpx;
	background: linear-gradient(to right, rgba(107, 221, 255, 0.84), 20%, rgba(74, 93, 238, 0.7) 50%, rgba(107, 221, 255, 0.84) 100%);
	transform: rotate(151deg);
}
</style>
