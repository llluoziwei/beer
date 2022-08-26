<template>
	<!-- 产出登记 -->
	<view class="body">
		<view>报工历史记录：</view>
		<view style="position: absolute;z-index: 9999;top:20px;right:0;">
			<!-- 取数 -->
			<view class="fetch">
				<u-button @click="back(0)" type="primary" style="width: 100%; height: 100%; box-shadow: 0px 2px 6px #387bfc"
					color="#387BFC" icon="order" text="返回" ></u-button>
			</view>
		</view>
		<u--form labelWidth="50" labelAlign="left">
			<view style="display: flex;">
				<!-- <u-form-item label="日期" prop="productionLine">
					<view @click="dataShow=true" style="width: 160px;">
						<u-input  inputAlign="center" readonly suffixIconStyle="color: #909399"
							v-model="form.time" placeholder="请选择日期" />
					</view>
					<u-calendar :show="dataShow" :mode="mode" @close="dataClose" @confirm="dataConfirm"></u-calendar>
				</u-form-item> -->
				<u-form-item style="margin-left: 30px;" label="生产线" prop="productionLine">
					<view @click="productionLineShow = true" style="width: 160px;">
						<u-input suffixIcon="arrow-down" inputAlign="center" readonly suffixIconStyle="color: #909399"
							v-model="form.productionLine" placeholder="请选择产线" />
					</view>
					<u-picker @cancel="productionLineShow = false" @confirm="productionLineConfirm" keyName="name" closeOnClickOverlay
						:show="productionLineShow" :columns="[productionLineColumns]"></u-picker>
				</u-form-item>
				<u-form-item style="margin-left: 30px;" label="工位" prop="station">
					<view @click="stationShow = true" style="width: 160px;">
						<u-input suffixIcon="arrow-down" inputAlign="center"  readonly suffixIconStyle="color: #909399"
							v-model="form.station" placeholder="请选择工位" />
					</view>
					<u-picker @cancel="stationShow = false" @confirm="stationConfirm" keyName="name" closeOnClickOverlay
						:show="stationShow" :columns="[stationColumns]"></u-picker>
				</u-form-item>
			</view>
		</u--form>
		<view v-if="ladingmore==true" style="height: 100%;display: flex;align-items: center;justify-content: center;">
			<u-loading-icon  inactive-color="#387bfc" size="28" mode="circle" :show="ladingmore"  :vertical="true" text="加载中"></u-loading-icon>
		</view>
		<view v-else class="tabel">
			<view class="tabel_row">
				<view class="header">
					<u-row style="">
						<u-col span="2">
							<view class="head" style="text-align: center;">序号</view>
						</u-col>
						<u-col span="3">
							<view class="head">流转卡号</view>
						</u-col>
						<u-col span="3">
							<view class="head">产品</view>
						</u-col>
						<u-col span="3">
							<view class="head">产品名称</view>
						</u-col>
						<u-col span="1">
							<view class="head">操作</view>
						</u-col>
					</u-row>
				</view>
				<view class="main" v-if="list.length<=0">
				  <view style="height: 100%;color: #CCCCCC;display: flex;align-items: center;justify-content: center;">暂无数据</view>
				</view>
				<view class="main" v-if="list.length>0">
					<u-list class="main-box" @scrolltolower="scrolltolower">
					<u-collapse @open="openCollapse" @close="collapseCurrent = -1" accordion>
						<u-collapse-item v-for="(item,index) in list" :key="index" :name="index"
							style="position: relative;" :isLink="false">
							<view slot="icon" class="collapseIcon"
								:class="index == collapseCurrent?'collapseIconBottom':'collapseIconRight'">
								<u-icon name="arrow-right" size="13"></u-icon>
							</view>
							<view class="collapseTitle" style="padding: 10px 0 10px 33px;" slot="title">
								<u-row>
									<u-col span="2">
										<view style="text-align: center;">{{index+1}}</view>
									</u-col>
									<u-col span="3">
										<view>{{item.work_card_no}}</view>
									</u-col>
									<u-col span="3">
										<view>{{item.goods_name}}</view>
									</u-col>
									<u-col span="3">
										<view>{{item.goods_name}}</view>
									</u-col>
									<u-col span="1">
										<view @click.stop="openDetail(1,index)" class="headBtn">修改</view>
									</u-col>
								</u-row>
							</view>
							<view class="u-collapse-content">
								<u-row>
									<u-col span="3">
										<view class="collapseContent">
											<view class="">合格数</view>
											<view class="">工废数</view>
											<view class="">料废数</view>
											<view class="">不良数</view>
											<view class="">其它数</view>
										</view>
									</u-col>
									<u-col span="3">
										<view class="collapseData">
											<view class="">{{item.ok_qu}}</view>
											<view class="">{{item.gf_qu}}</view>
											<view class="">{{item.lf_qu}}</view>
											<view class="">{{item.not_bad_qu}}</view>
											<view class="">{{item.other_qu}}</view>
										</view>
									</u-col>
									<u-col span="3">
										<view class="collapseContent">
											<view class="">工废原因</view>
											<view class="">料废原因</view>
											<view class="">作业开始时间</view>
											<view class="">作业截止时间</view>
											<view class="">备注</view>
										</view>
									</u-col>
									<u-col span="3">
										<view class="collapseData">
											<view class="">{{item.gf_reason}}</view>
											<view class="">{{item.lf_reason}}</view>
											<view class="">{{item.start_time}}</view>
											<view class="">{{item.end_time}}</view>
											<view class="">{{item.note}}</view>
										</view>
									</u-col>
								</u-row>
							</view>
						</u-collapse-item>
					</u-collapse>
				    </u-list>
				</view>
			<!-- 	<page-pagination :total="total" :pageSize="10" :currentPage="current_page" :showAround="true" :btnText="true" @change="change">
				</page-pagination> -->
			</view>
		</view>
	</view>
</template>

<script>
	import NET from '@/utils/request.js'
	import API from '@/config/api.js'
	import {user} from '@/config/index.js'
	export default {
		name: "contractor",
		data() {
			return {
				dataShow:false,
				mode: 'range',
				ladingmore:false,
				// 生产线信息
				beltlineInfo:'',
				// 工位ID
				work_position_id: '',
				// 生产线id
				make_line_id: '',
				total:0,
				current_page:1,
				page:1,
				collapseCurrent: -1,
				productionLineShow: false, //产线picker选择器
				productionLineColumns: [], //产线picker选择内容
				stationShow: false, //工位picker选择器
				stationColumns:[], //工位picker选择内容
				form: {
					time:'',
					productionLine: "",
					station: "",
				},
				list:[]
			};
		},
		created() {
			// user().then(res => {
			// 	this.list = res.data.data
			// })
		},
		mounted() {
			let putStationArr=uni.getStorageSync('putStationArr')
			console.log(putStationArr,'产出登记')
			this.beltlineInfo=putStationArr
			this.productionLineColumns=[putStationArr[0]]
			this.stationColumns=putStationArr[0].children
			this.form.productionLine=putStationArr[0].name
			this.form.station=putStationArr[1].name
			this.make_line_id=putStationArr[0].make_line_id
			this.work_position_id=putStationArr[1].work_position_id
			 // 产出登记 可报工流转卡数据接口
			this.getList()
		},
		methods: {
			scrolltolower() {
				if(this.page>this.total){
					return
				}
				this.page=this.page+1
				this.getList()
			},
			// 取消日期
			dataClose(){
				this.dataShow=false
			},
			// 日期选择
			dataConfirm(e) {
				this.form.time=e[0]+'至'+e[1]
				console.log(e);
				this.dataShow=false
			},
			// 页码改变时触发
			change(nowPage, type){
				this.page=nowPage
			},
			// 产出登记 可报工流转卡数据接口
			getList() {
				if(this.page==1){
					this.ladingmore=true
				}
				
				//获取列表 参数 生产线id make_line_id  工位 work_position_id
				NET.request(API.findHistoryList, {
					currPage:this.page,
					maxPageCount:10,
					make_line_id:this.make_line_id,
					work_position_id:this.work_position_id
				}, 'POST').then(res => {
					this.ladingmore=false
					if(res.data.code=='200'){
						if(res.data.data.length>0){
							res.data.data.forEach(item=>{
								item.make_line_name=this.form.productionLine
							})
						}
						this.list=this.list.concat(res.data.data.list)
						this.$emit('output_r_list',this.list)
						this.total = res.data.data.total
					}else {
						
						uni.showToast({
							title:res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			// 取数
			back(index){
				let obj = {
					current:index,
				}
				this.$emit('openDetail', obj)
			},
			// 生产线
			productionLineConfirm(e) {
				this.form.productionLine = e.value[0].name
				this.make_line_id=e.value[0].make_line_id
				this.productionLineShow = false
			},
			// 工位
			stationConfirm(e){
				this.form.station = e.value[0].name
				this.work_position_id=e.value[0].work_position_id
				this.page=1;
				this.getList()
				this.stationShow = false
			},
			//表格  展开 数据
			openCollapse(e) {
				this.collapseCurrent = e
			},
			// 点击的报工  按钮
			openDetail(current,index) {
				let select_work={
					work_position_name:this.form.station,
					work_position_id:this.work_position_id
				}
				let obj = {
					current:current,
					key:index,
					list:this.list,
					select_work:select_work,
					prevcurrent:2,
				}
				this.$emit('openDetail', obj)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.fetch {
		width:80px;
		height: 37px;
	}
	.main-box{
		height: 100%  !important;
	}
	.body {
		width: 100%;
		height: 100%;
	}

	.tabel {
		height: 86.5%;
		border: 1px solid #e3e3e3;
	}

	.tabel_row {
		height: 96%;
		width: 96%;
		margin: 2% 2% 1% 2%;
		overflow-y: scroll;

		.header {
			// border-bottom: 1px solid #e3e3e3;
			overflow: hidden;
			padding-left: 33px;

			.head {
				padding: 0 0 20px 0;
				color: #909399;
			}
		}

		.main {
			height: calc(100% - 40px - 50px);
			overflow-y: scroll;
			margin-bottom: 10px;
		}
	}

	/deep/ .u-cell__left-icon-wrap {
		margin-right: 0;
	}

	/deep/ .u-cell__body {
		padding: 0px !important;
	}

	.collapseIconBottom {
		transform: rotate(90deg);
	}

	.collapseIcon {
		position: absolute;
		left: 20px;
		top: 20px;
		transition: 0.6s;
	}

	.collapseTitle {
		color: #909399;
		word-break: break-all;

		.headBtn {
			width: 55px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			color: white;
			background-color: #387BFC;
			border-radius: 3px;
		}
	}

	.collapseContent view {
		padding: 10px 0;
		color: #99A9BF;
		font-size: 13px;
	}

	.collapseData view {
		padding: 10px 0;
		color: #606266;
	}
</style>
