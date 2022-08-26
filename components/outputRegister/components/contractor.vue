<template>
	<view class="body">
		<view style="position: absolute;z-index: 99;top:20px;right:0;">
			<view class="fetch">
				<u-button @click="arrowbtn()" type="primary" style="width: 100%; height: 100%; box-shadow: 0px 2px 6px #387bfc"
					color="#387BFC" icon="order" text="返回" ></u-button>
			</view>
			<!-- <view class="arrow-l-r">
				<view class="arrow-left" @click="arrowbtn(1)">
					<u-icon color="#ffffff" name="arrow-left"></u-icon>
				</view>
				<view class="arrow-right" @click="arrowbtn(2)">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="">工位报工录入数量{{prevcurrent}}</view>
		<u--form labelWidth="120" :model="form" :rules="rules" ref="uForm" labelAlign="right">
			<view class="form">
				<view class="form-item">
					<u-form-item label="流转卡号" prop="work_card_no">
						<u-input disabled v-model="form.work_card_no" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="工位" prop="work_position_name">
						<u-input disabled v-model="form.work_position_name" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="产品" prop="goods_name">
						<u-input disabled v-model="form.goods_name" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="卡数量" prop="work_card_qu">
						<u-input disabled v-model="form.work_card_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="上序" prop="pre_work_procedure_name">
						<u-input disabled v-model="form.pre_work_procedure_name" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="上序号报工数" prop="pre_qu">
						<u-input disabled v-model="form.pre_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="本工序" prop="work_procedure_name">
						<u-input disabled v-model="form.work_procedure_name" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="本工序号报工数" prop="ok_qu">
						<u-input disabled v-model="form.ok_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="可报数" prop="not_ok_qu">
						<u-input disabled v-model="form.not_ok_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="合格数" prop="on_test_qu">
						<u-input v-model="form.on_test_qu" />
						<!-- <view solt="right" name="arrow-right" class="haltType" @click="selectbtn(1)">取数</view> -->
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="工废数" prop="gf_qu">
						<u-input v-model="form.gf_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="料废数" prop="lf_qu">
						<u-input v-model="form.lf_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="不良数" prop="not_bad_qu">
						<u-input v-model="form.not_bad_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="其它数" prop="other_qu">
						<u-input v-model="form.other_qu" />
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="工废原因" prop="gf_reason">
						<u-input  @input="inputgf_reason"  v-model="form.gf_reason" />
						<view solt="right" name="arrow-right" class="haltType" @click="selectbtn(2)">选择</view>
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="料废原因" prop="lf_reason">
						<u-input v-model="form.lf_reason" />
						<view solt="right" name="arrow-right" class="haltType" @click="selectbtn(3)">选择</view>
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="作业开始时间" prop="start_time">
						<u-input v-model="form.start_time" />
						<view solt="right" name="arrow-right" class="haltType" >
								<uni-datetime-picker  class="onetime"  v-model="form.start_time" @change="changeLog($event,1)">请选择</uni-datetime-picker>
						</view>
						<!-- <view solt="right" name="arrow-right" class="haltType" @click="dateTimebtn(1)">请选择</view> -->
					</u-form-item>
				</view>
				<view class="form-item">
					<u-form-item label="作业截止时间" prop="end_time">
						<u-input v-model="form.end_time" />
						<view solt="right" name="arrow-right" class="haltType" >
							<uni-datetime-picker class="twotime"   v-model="form.end_time" @change="changeLog($event,2)">请选择</uni-datetime-picker>
						</view>
						<!-- <view solt="right" name="arrow-right" class="haltType" @click="dateTimebtn(2)">请选择</view> -->
					</u-form-item>
				</view>
			</view>
			<view style="width: 46%;">
				<u-form-item label="备注" prop="note">
					<u--textarea autoHeight v-model="form.note" placeholder="请输入备注内容" maxlength="-1"></u--textarea>
				</u-form-item>
			</view>
		</u--form>
		<view style="width:300px;margin: 20px 0 0 120px;display: flex;">
			<u-button style="width: 118px;" @click="save()" :loading="saveLoading" type="primary" text="保存"></u-button>
			<u-button style="margin-left: 60px;width: 118px;" @click="cancel()" :loading="saveLoading" text="取消">
			</u-button>
		</view>

		<!-- 报废弹框 -->
		<tki-tree ref="tkitree" :selectParent="selectParent" :multiple="multiple" :range="tree_list" :foldAll="flod"
			rangeKey="name" @confirm="treeConfirm" @cancel="treeCancel"></tki-tree>
		<!-- 时间选择器 -->
		<u-datetime-picker :show="datetimeShow" @confirm="confirmbtn" @cancel="datetimeShow=false" v-model="datatime"
			mode="datetime"></u-datetime-picker>
	</view>
</template>

<script>
	import tkiTree from '@/components/com/tki-tree/tki-tree.vue';
	import NET from '@/utils/request.js'
	import API from '@/config/api.js'
	export default {
		name: "list",
		components: {
			tkiTree
		},
		props: {
			keys: {
				type: Number,
			},
			prevcurrent: {
				type: Number,
			},
			lists: {
				type: Array,
				default: new Array
			},
			select_work: {
				type: Object,
				default: new Object
			}
		},
		data() {
			return {
				multiple: false,
				selectParent: false,
				flod: false,
				// 日期
				datatime: Number(new Date()),
				// 时间弹框
				datetimeShow: false,
				rules: {},
				// 选择的那个弹框 1 取数  2 工废原因   3 原因  
				select_key: 0,
				// 报废弹框 和  工废  弹框
				select_show: false,
				// 弹框列表 工废  料废 选择
				columns: [],
				// 当前 form 取值 下标
				indexs: this.keys,
				saveLoading: false, //保存按钮的加载状态
				form: {
					work_card_no: '', //流转卡号
					work_position_name: '', //工位
					goods_name: '', //产品
					work_card_qu: '', //卡数量
					pre_work_procedure_name: '', //上序
					pre_qu: '', //上序号报工数
					work_procedure_name: '', //本工序
					ok_qu: '', //本工序已报数
					not_ok_qu: '', //可报数
					on_test_qu: '', //合格数
					gf_qu: '', //工废数
					lf_qu: '', //料废数
					not_bad_qu: '', //不良数
					other_qu: '', //其他数
					gf_reason: '', //工废原因
					lf_reason: '', //料废原因
					start_time: '', //作业开始时间
					end_time: '', //作业截止时间
					note: '', //备注
					work_card_id: '', //流转卡ID
					work_procedure_id: '', //工序ID
					make_line_id: '', //生产线ID
					work_position_id: '', //工位ID
					work_time_Id: '', //班次ID
				},
				// 生产线信息
				beltlineInfo: [],
				tree_list: []
			};
		},
		created() {
			let putStationArr = uni.getStorageSync('putStationArr')
			this.beltlineInfo = putStationArr
			this.form.make_line_id = putStationArr[1].make_line_id
		},
		mounted() {
			this.getform()
			this.findReasonTree()
		},
		methods: {
			// 日期选择
			changeLog(e, key) {
				console.log(e,key)
				if(key==1){
					this.form.start_time=e
				}else{
					this.form.end_time= e
				}
				this.$forceUpdate()
				console.log(this.form.end_time,this.form.start_time)
			},
			inputgf_reason(e){
				console.log(e,'sdfsf')
			},
			// 确定料废 工废  弹框 回调事件
			treeConfirm(e) {
				let indx = this.select_key
				console.log(indx, '点击的')
				
				if(indx==2){
					this.form.gf_reason= e[0].bad_reason_name
					console.log(this.form.gf_reason,'gf_reason')
				}else{
					this.form.lf_reason= e[0].bad_reason_name
					console.log(this.form.gf_reason,'lf_reason')
				}
				this.$forceUpdate()
			},
			// 取消回调事件
			treeCancel(e) {
				console.log(e)
			},
			
			// // 时间选择 1 开始时间  2 截止时间
			// confirmbtn(e) {
			// 	let time = this.formatDate(e.value)
			// 	switch (this.data_time_key) {
			// 		case 1:
			// 			this.form.start_time = time
			// 			break;
			// 		case 2:
			// 			this.form.end_time = time
			// 			break;
			// 	}
			// 	this.datetimeShow = false
			// },
			// // 时间格式化
			// formatDate(date) {
			// 	let time = new Date(date)
			// 	let y = time.getUTCFullYear();
			// 	let m = time.getMonth() + 1;
			// 	m = m < 10 ? "θ" + m : m;
			// 	let d = time.getDate();
			// 	d = d < 10 ? "θ" + d : d;
			// 	let h = time.getHours();
			// 	h = h < 10 ? "θ" + h : h;
			// 	let minute = time.getMinutes();
			// 	minute = minute < 10 ? "0" + minute : minute;
			// 	return y + "-" + m + "-" + d + " " + h + ":" + minute;
			// },
			// // 选择那个 时间 按钮 弹框
			// dateTimebtn(key) {
			// 	this.data_time_key = key
			// 	this.datetimeShow = true
			// },
			// form数据
			getform() {
				this.form = this.lists[this.indexs]
				this.form.on_test_qu = this.lists[this.indexs].not_ok_qu
				this.form.work_position_name = this.select_work.work_position_name
				this.form.work_position_id = this.select_work.work_position_id
			},
			// 打开 弹框 1  取数  2 工废  3 料废
			selectbtn(index) {
				this.select_key = index
				this.$refs.tkitree._show();
				// this.select_show = !this.select_show
			},
			// 取消弹框 1  取数  2 工废  3 料废
			Pop_cancel() {
				this.select_show = false
			},
			// 确定 弹框 1  取数  2 工废  3 料废
			confirm(e) {
				this.select_show = false
			},
			// 左右箭头 来回切换数据
			arrowbtn(index) {
				this.cancel()
				// if (index == 1) {
				// 	this.indexs = this.indexs - 1 < 0 ? 0 : this.indexs - 1
				// } else {
				// 	let index = this.indexs + 1
				// 	if (index > this.lists.length - 1) {
				// 		this.indexs = this.lists.length - 1
				// 	} else {
				// 		this.indexs = index
				// 	}
				// }
				// this.getform()
			},
			// 隐藏 当 界面
			cancel() {
				let current =this.prevcurrent
				this.$emit('cancel', current)
			},
			// 保存数据
			save() {
				let not_ok_qu=this.form.not_ok_qu==null?0:this.form.not_ok_qu
				let on_test_qu=this.form.on_test_qu==null?0:this.form.on_test_qu
				let gf_qu=this.form.gf_qu==null?0:this.form.gf_qu
				let lf_qu=this.form.lf_qu==null?0:this.form.lf_qu
				let not_bad_qu=this.form.not_bad_qu==null?0:this.form.not_bad_qu
				let other_qu=this.form.other_qu==null?0:this.form.other_qu
				let  surplus=parseFloat(not_ok_qu)-parseFloat(on_test_qu)-parseFloat(gf_qu)-parseFloat(lf_qu)-parseFloat(not_bad_qu)-parseFloat(other_qu)
				console.log(surplus,'数量超过可报数了')
				// 工废数>0时，工废原因需要填写
				if(surplus<0){
					uni.$u.toast('数量超过可报数了，不能报')
					return
				}
				if (this.form.gf_qu > 0) {
					console.log(this.form.gf_reason == null, 's111df')
					if (this.form.gf_reason == null) {
						uni.$u.toast('请选择工废原因')
						return
					}
				}
				// 料废数>0, 料废原因需要填写
				if (this.form.lf_qu > 0) {
					if (this.form.lf_reason == null) {
						uni.$u.toast('请选择料废原因')
						return
					}
				}
				let data = {
					work_card_emp_work_id:this.lists[this.indexs].work_card_emp_work_id,
					work_card_id: this.lists[this.indexs].work_card_id,
					work_procedure_id: this.lists[this.indexs].work_procedure_id,
					make_line_id: this.form.make_line_id,
					work_position_id: this.form.work_position_id,
					work_time_Id: this.form.work_time_Id,
					ok_qu: this.form.on_test_qu,
					gf_qu: this.form.gf_qu,
					lf_qu: this.form.lf_qu,
					not_bad_qu: this.form.not_bad_qu,
					other_qu: this.form.other_qu,
					gf_reason: this.form.gf_reason,
					lf_reason: this.form.lf_reason,
					start_time: this.form.start_time,
					end_time: this.form.end_time,
					note: this.form.note
				}
				this.requsetConfirm(data)
			},
			// 点击操作时弹框
			requsetConfirm(data) {	
				let that = this;
				uni.showModal({
					content: '确定此操作吗？',
					success: function(res) {
						if (res.confirm) {
							
							that.callReques(data)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			callReques(data){
				if(this.prevcurrent==0){
					this.saveOutPutRegister(data)
				}else{
					this.SaveOutedit(data)
				}
			},
			// 编辑报工  保存当前数据
			SaveOutedit(data) {
				this.saveLoading = true
				//保存报工数 参数 当前行数据
				NET.tempRequest(API.SaveOutedit,data, 'POST').then(res => {
					this.saveLoading = false
					if (res.data.code == '200') {
						this.cancel()
					} else {
						uni.$u.toast(res.data.msg)
					}
				})
			},
			// 保存当前数据
			saveOutPutRegister(data) {
				this.saveLoading = true
				//保存报工数 参数 当前行数据
				NET.tempRequest(API.SaveOutPutRegister,data, 'POST').then(res => {
					this.saveLoading = false
					if (res.data.code == '200') {
						this.cancel()
					} else {
						uni.$u.toast(res.data.msg)
					}
				})
			},
			//得到  工废  料废 原因 
			findReasonTree() {
				NET.tempRequest(API.findReasonTree, 'POST').then(res => {
					console.log(res, '得到的 树形 结构')
					if (res.data.code == '200') {
						this.tree_list = res.data.data;
					} else {
						uni.$u.toast(res.data.msg)
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.onetime /deep/ .uni-date-single--x{
		top:-200px !important;
;
	}
	.twotime /deep/ .uni-date-single--x{
		top:-200px !important;
	}
	.fetch {
		width:80px;
		height: 37px;
	}
	.haltType {
		width: 50px;
		height: 36.2px;
		line-height: 36.2px;
		text-align: center;
		background-color: #F5F7FA;
		border: 1px solid #dadada;
		color: #909399;
		margin-left: -1px;
		zz-index: 999;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.arrow-left {
		height: 30px;
		width: 50px;
		display: flex;

		align-items: center;
		justify-content: center;
		background-color: #2979FF;
		border-radius: 20px;
	}

	.arrow-right {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 20px;
		height: 30px;
		width: 50px;
		background-color: #F0F0F0;
		border-radius: 20px;
	}

	.arrow-l-r {
		display: flex;
	}

	.body {
		width: 100%;
		height: 100%;
	}

	.form {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;

		.form-item {
			width: 32%;
		}
	}
</style>
