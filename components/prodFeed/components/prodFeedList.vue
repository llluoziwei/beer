<template>
	<view class="body2">
		<view style="position: absolute; z-index: 9999; right: 18.63rpx;top: 13.97rpx;">
			<!-- 取数 -->
			<view class="fetch">
				<u-button @click="backbtn()" type="primary" style="width: 100%; height: 100%; box-shadow: 0 1.86rpx 5.59rpx #387bfc" color="#387BFC" text="返回"></u-button>
			</view>
		</view>
		<view style="width: 93.19rpx; margin: 9.31rpx 0 9.31rpx 13.97rpx;"><u-button :plain="true" style="font-size: 10.25rpx;" text="清除日期过滤器" @click="reset"></u-button></view>
		<view
			v-if="ladingmore == true"
			style="
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
		>
			<u-loading-icon inactive-color="#387bfc" size="28" mode="circle" :show="ladingmore" :vertical="true" text="加载中"></u-loading-icon>
		</view>
		<view class="tabel" v-else>
			<view class="tabel-header">
				<u-row>
					<u-col :span="3">
						<view
							@click="filterShow = !filterShow"
							style="
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding-left: 9.31rpx;
              "
						>
							<view class="tabel-header-item" style="margin-right: 4.65rpx;font-size: 10.25rpx;">领料时间</view>
							<u-icon name="arrow-down" size="12.11rpx" color="#909399"></u-icon>
							<view class="tabel-header-filuter" :style="filterShow ? 'height:calc(100% + 41.93rpx);' : 'height:0;padding:0;border:none'">
								<view style="border-bottom: 0.93rpx solid #ebeef5">
									<u-checkbox-group v-model="checkboxTime" placement="column" :size="12" @change="checkboxChange">
										<u-checkbox :customStyle="{ marginBottom: '7.45rpx'}" v-for="(item, index) in checkboxListTime" :key="index" :label="item.name" :name="item.name"></u-checkbox>
									</u-checkbox-group>
								</view>
								<view class="tabel-header-filuter-reset">
									<view @click="filter()" :style="checkboxTime.length ? 'color: #000000;' : 'color: #DCDFE6;'">筛选</view>
									<view @click.stop="reset()" class="">重置</view>
								</view>
							</view>
						</view>
					</u-col>
					<u-col :span="1.5"><view class="tabel-header-item">领用人员</view></u-col>
					<u-col :span="1.5"><view class="tabel-header-item">投料数量</view></u-col>
					<u-col :span="1.5"><view class="tabel-header-item">工位</view></u-col>
					<u-col :span="2.2"><view class="tabel-header-item">物料编码</view></u-col>
					<u-col :span="2.3"><view class="tabel-header-item">物料名称</view></u-col>
				</u-row>
			</view>
			<view class="tabel-main" v-if="good_list.length <= 0">
				<view
					style="
            height: 100%;
            color: #cccccc;
            display: flex;
            align-items: center;
            justify-content: center;
          "
				>
					暂无数据
				</view>
			</view>
			<view class="tabel-main" v-if="good_list.length > 0">
				<u-list class="main-box" @scrolltolower="scrolltolower">
					<view @click="openDetail(item)" v-for="(item, index) in good_list" :key="index" class="tabel-main-list" style="border-bottom: 1px solid #d2d7df">
						<u-row>
							<u-col :span="3">
								<view class="tabel-item" style="padding-left: 10px">{{ item.create_time }}</view>
							</u-col>
							<u-col :span="1.5">
								<view class="tabel-item">{{ item.employee_name }}</view>
							</u-col>
							<u-col :span="1.5">
								<view class="tabel-item">{{ item.qu }}</view>
							</u-col>
							<u-col :span="1.5">
								<view class="tabel-item">{{ item.work_position_name }}</view>
							</u-col>
							<u-col :span="2.2">
								<view class="tabel-item">{{ item.wl_goods_code }}</view>
							</u-col>
							<u-col :span="2.3">
								<view class="tabel-item">{{ item.wl_goods_name }}</view>
							</u-col>
						</u-row>
					</view>
				</u-list>
			</view>
			<!-- <page-pagination :total="total" :pageSize="10" :currentPage="current_page" :showAround="true"
				:btnText="true"></page-pagination> -->
		</view>
	</view>
</template>

<script>
import NET from '../../../utils/request.js';
import API from '../../../config/api.js';
export default {
	props: {
		card_info: {
			type: Object,
			default: Object
		},
		prevCurrent: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			ladingmore: false,
			// 流转卡id
			work_card_id: this.card_info.work_card_id,
			total: 0,
			current_page: 1,
			page: 1,
			filterShow: false, //控制筛选器
			checkboxTime: [], //选中的时间筛选
			checkboxListTime: [],
			good_list: [],
			record_list: [],
			current: -1 //选中的某一行
		};
	},
	mounted() {
		// 已投领料明细
		this.findProdFeedBodyList();
	},
	methods: {
		// 返回
		backbtn() {
			let data = {
				current: 1,
				work_card_info: this.card_info
			};
			console.log(data);
			this.$emit('openList', data);
		},
		scrolltolower() {
			if (this.page > this.total) {
				return;
			}
			console.log('触底看');
			this.page = this.page + 1;
			console.log(this.currPage, '触底看');
			this.findProdFeedBodyList();
		},
		// 页码改变时触发
		change(nowPage, type) {
			this.page = nowPage;
		},
		// 已投领料明细
		findProdFeedBodyList() {
			if (this.page == 1) {
				this.ladingmore = true;
			}

			NET.request(
				API.findProdFeedBodyList,
				{
					maxPageCount: 10,
					currPage: this.page,
					work_card_id: this.work_card_id
				},
				'POST'
			).then(res => {
				this.ladingmore = false;
				if (res.data.code == 200) {
					console.log('已投领料明细：', res);
					let data = res.data.data.list;
					// 得到领用时间的筛选条件
					data.forEach(item => {
						item.goods_code = item.wl_goods_code;
						item.goods_name = item.wl_goods_name;
						this.checkboxListTime.push({
							name: item.update_time.split(' ')[0]
						});
					});
					// 领用时间的筛选条件 去重
					let hash = {};
					this.checkboxListTime = this.checkboxListTime.reduce(function(item, next) {
						hash[next.name] ? '' : (hash[next.name] = true && item.push(next));
						return item;
					}, []);

					this.good_list = this.good_list.concat(res.data.data.list);
					this.record_list = this.record_list.concat(res.data.data.list);
					this.total = res.data.data.total;
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 领用筛选得到的值
		checkboxChange(n) {
			this.checkboxTime = n;
		},
		//点击筛选
		filter() {
			//对数组进行过滤
			if (this.checkboxTime.length > 0) {
				// 根据领用时间的筛选  瞒住条件返回
				this.good_list = this.record_list.filter(item => {
					return this.checkboxTime.some(f => f == item.update_time.split(' ')[0]);
				});
			}
		},
		//重置筛选  清除过滤器
		reset() {
			this.checkboxTime = [];
			this.good_list = this.record_list;
		},
		// 打开详情
		openDetail(item) {
			let data = {
				current: 3,
				item: item,
				work_card_info: this.card_info
			}
			this.$emit('openDetail', data)
		}
	}
};
</script>

<style lang="scss">
.fetch {
	border-radius: 0.93rpx;
	width: 78.28rpx;
	height: 33.55rpx;
}

.main-box {
	height: 100% !important;
}

.body2 {
	width: 100%;
	height: 100%;
}

.tabel {
	width: calc(100% - 18.63rpx);
	height: calc(100% - 40.07rpx);
	// margin-top: 9.31rpx;
    margin: 9.31rpx 9.31rpx 0 9.31rpx;
	.tabel-header {
		position: relative;
		padding: 9.31rpx 0;
		border-bottom: 0.93rpx solid #d2d7df;

		.tabel-header-item {
			color: #909399;
			font-size: 10.25rpx;
		}

		.tabel-header-filuter {
			position: absolute;
			top: 37.27rpx;
			left: 0;
			border: 0.93rpx solid #e8eaee;
			border-radius: 4.65rpx;
			z-index: 3;
			overflow: hidden;
			padding: 9.31rpx 9.31rpx 0 9.31rpx;
			background-color: white;
			transition: 0.1s;

			.tabel-header-filuter-reset {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 9.31rpx 0 9.31rpx 4.65rpx;
				font-size: 10.25rpx;

				view:last-child {
					margin-left: 4.65rpx;
				}
			}
		}
	}

	.tabel-main {
		height: calc(100% - 102.51rpx);
		width: 100%;
		margin-bottom: 13.04rpx;
		overflow-y: scroll;

		.tabel-main-list:active {
			background-color: rgb(245, 247, 250);
		}

		.tabel-item {
			padding: 13.97rpx 0;
			color: #909399;
			font-size: 9.31rpx;
		}
	}
}

// 过滤器按钮字体大小
/deep/ .u-button__text{
	font-size: 11.18rpx !important;
}
</style>
