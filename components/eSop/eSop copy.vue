<template>
	<view class="body">
		<view v-if="ladingmore==true" style="height: 100%;display: flex;align-items: center;justify-content: center;">
			<u-loading-icon  inactive-color="#387bfc" size="28" mode="circle" :show="ladingmore"  :vertical="true" text="加载中"></u-loading-icon>
		</view>
		<view v-if="ladingmore==false" style="height: 100%;width: 100%;display:flex;align-items: center;justify-content: center;">
			<u-empty v-if="imgurl==''" mode="list" width="300" height="200"  text="暂无数据" icon="http://cdn.uviewui.com/uview/empty/data.png"></u-empty>
			<u-image  v-else  :src="imgurl" :lazy-load="true"></u-image>
		</view>
	</view>
</template>

<script>
	import NET from '../../utils/request.js'
	import API from '../../config/api.js'
	export default {
		data() {
			return {
				ladingmore:false,
				// 生产线信息
				beltlineInfo: [],
				// 工位ID
				work_position_id: '',
				// 生产线id
				make_line_id: '',
				imgurl:''
			};
		},
		created() {
			let putStationArr = uni.getStorageSync('putStationArr')
			this.beltlineInfo = putStationArr
			this.work_position_id = putStationArr[1].work_position_id
			this.make_line_id = putStationArr[0].make_line_id
		},
		mounted() {
			this.geturl()
		},
		methods: {
			geturl() {
				this.ladingmore=true
				NET.request(API.getEsopURL, {
					work_position_id: this.work_position_id,
					make_line_id:this.make_line_id
				}, 'POST').then(res => {
					this.ladingmore=false
					if(res.data.code==200){
						this.imgurl=res.data.data.url
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				}).catch(err=>{
					console.log(err)
				})
			},
		},

	}
</script>

<style lang="scss" scoped>
	.body {
		width: 100%;
		height: 100%;
	}
</style>
