<template>
	<view class="body">
		<view class="">
			<u--form labelWidth="120" :rules="rules" :model="form" ref="uForm" labelAlign="right" :labelStyle="{ color: '#606266', fontSize: '10.25rpx' }">
				<view
					style="
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
						margin-top: 18.63rpx;
          "
				>
					<view style="width: 47%">
						<u-form-item label="生产线" prop="productionLine"><u--input maxlength="6" v-model="form.productionLine"></u--input></u-form-item>
					</view>
					<view style="width: 47%">
						<u-form-item label="设备" prop="equipment">
							<u--input v-model="form.equipment"></u--input>
							<view solt="right" name="arrow-right" class="haltType" @click="selectbtn(1)">请选择</view>
						</u-form-item>
					</view>
					<view style="width: 47%">
						<u-form-item solt="right" label="停机类型" prop="haltType">
							<u--input class="input" readonly v-model="form.haltType"></u--input>
							<view solt="right" name="arrow-right" class="haltType" @click="selectbtn(2)">请选择</view>
						</u-form-item>
					</view>
					<view style="width: 47%">
						<u-form-item label="停机时长" prop="haltTime"><u--input v-model="form.haltTime" disabled></u--input></u-form-item>
					</view>
					<view style="width: 47%">
						<u-form-item label="停机开始时间" prop="haltStartTime">
							<u--input readonly v-model="form.haltStartTime"></u--input>
							<view solt="right" name="arrow-right" class="haltType">
								<uni-datetime-picker v-model="form.haltStartTime" @change="changeLog($event, 1)">请选择</uni-datetime-picker>
							</view>
						</u-form-item>
					</view>
					<view style="width: 47%">
						<u-form-item label="停机截止时间" prop="haltStopTime">
							<u--input readonly v-model="form.haltStopTime"></u--input>
							<view solt="right" name="arrow-right" class="haltType">
								<uni-datetime-picker v-model="form.haltStopTime" @change="changeLog($event, 2)">请选择</uni-datetime-picker>
							</view>
						</u-form-item>
					</view>
					<view style="width: 47%">
						<u-form-item label="备注" prop="remark"><u--textarea v-model="form.remark" placeholder="请输入备注" autoHeight maxlength="-1"></u--textarea></u-form-item>
					</view>
					<view style="width: 47%"></view>
				</view>
			</u--form>
			<view>
				<u-button
					style="
            width: 74.55rpx;
            margin-left: 119.29rpx;
            background-color: #387bfc;
            color: #ffffff;
            margin-top:  27.95rpx;
          "
					:loading="loading"
					loadingText="保存中..."
					@click="submit"
				>
					保存
				</u-button>
			</view>
			<u-picker :show="select_show" :columns="columns" keyName="name" @confirm="confirm" @cancel="cancel"></u-picker>
		</view>
		<u-datetime-picker :show="datetimeShow" @confirm="confirmbtn" @cancel="datetimeShow = false" v-model="datatime" mode="datetime"></u-datetime-picker>
	</view>
</template>

<script>
import NET from '../../utils/request.js';
import API from '../../config/api.js';
export default {
	data() {
		return {
			loading: false,
			// 日期
			datatime: Number(new Date()),
			// 日期弹框
			datetimeShow: false,
			// 那个日期选项 1 开始  2 截止
			data_time_key: 0,
			// 生产线信息
			beltlineInfo: '',
			// 工位ID
			work_position_id: '',
			// 生产线id
			make_line_id: '',
			// 弹框列表选择
			columns: [],
			// 设备数据列表
			deviceList: [],
			// 停机类型列表
			deviceType: [],
			// 得到的列表
			list: [],
			// 弹框
			select_show: false,
			// 点击请选择按钮的下标
			select_key: 0,
			form: {
				device_id: '',
				device_stop_type_id: '',
				productionLine: '', //生产线
				equipment: '', //设备
				haltType: '', //停机类型
				haltTime: '', //停机时长
				haltStartTime: '', //停机开始时间
				haltStopTime: '', //停机截止时间
				remark: '' //备注
			},
			// 设备 所有参数
			check_equipment: '',
			// 停机类型 所有参数
			check_haltType: '',
			rules: {
				productionLine: [
					{
						required: true,
						message: '请填写生产线',
						trigger: ['blur', 'change']
					}
				],
				equipment: [
					{
						required: true,
						message: '请填写设备',
						trigger: ['blur', 'change']
					}
				],
				haltType: [
					{
						required: true,
						message: '请选择停机类型',
						trigger: ['blur', 'change']
					}
				],
				haltTime: [
					{
						required: false
					}
				],
				haltStartTime: [
					{
						required: true,
						message: '请填写停机开始时间',
						trigger: ['blur', 'change']
					}
				],
				haltStopTime: [
					{
						required: true,
						message: '请填写停机截止时间',
						trigger: ['blur', 'change']
					}
				],
				remark: [
					{
						required: false
					}
				]
			}
		};
	},
	created() {
		let putStationArr = uni.getStorageSync('putStationArr');
		this.beltlineInfo = putStationArr;
		this.form.productionLine = putStationArr[0].name;
		console.log('得到的生产线信息：', this.beltlineInfo);
		this.make_line_id = putStationArr[1].make_line_id;
		this.work_position_id = putStationArr[1].work_position_id;
	},
	mounted() {
		// 获取设备
		this.findDevice();
		// 获取设备类型
		this.findDeviceStopType();
	},
	methods: {
		// 日期选择
		changeLog(e, key) {
			switch (key) {
				case 1:
					this.form.haltStartTime = '';
					break;
				case 2:
					this.form.haltStopTime = e;
					break;
			}

			// 转换停机时长
			if (this.form.haltStartTime && this.form.haltStopTime) {
				let temp1 = this.form.haltStopTime.match(/\d+/g).join('');
				let temp2 = this.form.haltStartTime.match(/\d+/g).join('');
				let endTime = temp1.replace(/,/g, '');
				let startTime = temp2.replace(/,/g, '');
				let a = endTime - startTime + '';
				let b = a.substring(0, a.length - 2);
				if (b.length >= 5) {
					let min = b.substring(b.length - 2) + '分';
					let tempHour = b.substring(0, b.length - 2);
					let hour = tempHour.substring(tempHour.length - 2) + '时';
					let day = b.substring(0, b.length - 4) + '天';
					this.form.haltTime = day + hour + min;
				} else {
					let min = b.substring(b.length - 2) + '分';
					let tempHour = b.substring(0, b.length - 2);
					let hour = tempHour.substring(tempHour.length - 2) + '时';
					this.form.haltTime = hour + min;
				}
			}
		},
		// // 选择时间
		// confirmbtn(e) {
		// 	let time = this.formatDate(e.value)
		// 	switch (this.data_time_key) {
		// 		case 1:
		// 			this.form.haltStartTime = time
		// 			break;
		// 		case 2:
		// 			this.form.haltStopTime = time
		// 			break;
		// 	}
		// 	this.datetimeShow = false
		// },
		// // 格式化时间
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
		// 	return y + "-" + m + "-" + d + " " + h + ":" + minute ;
		// },
		// // 时间弹框
		// dateTimebtn(key) {
		// 	this.data_time_key=key
		// 	this.datetimeShow = true
		// },
		// 取消 报废 原因弹框
		cancel() {
			this.select_show = false;
		},
		// 确定 报废原因 选择
		confirm(e) {
			switch (this.select_key) {
				case 1:
					this.form.equipment = e.value[0].name;
					this.form.device_id = e.value[0].device_id;
					this.check_equipment = e.value[0];
					break;
				case 2:
					this.check_haltType = e.value[0];
					this.form.device_stop_type_id = e.value[0].device_stop_type_id;
					this.form.haltType = e.value[0].name;
					break;
			}
			this.select_show = false;
		},
		// 打开停机类型弹框
		selectbtn(index) {
			this.select_key = index;
			switch (index) {
				case 1:
					this.deviceList.forEach(item => {
						item.name = item.device_name;
					});
					this.columns = [this.deviceList];
					break;
				case 2:
					console.log(this.deviceType, 'this.deviceType');
					this.deviceType.forEach(item => {
						item.name = item.device_stop_type_name;
					});
					this.columns = [this.deviceType];
					break;
			}
			this.select_show = !this.select_show;
		},
		// 提交
		submit() {
			this.$refs.uForm
				.validate()
				.then(res => {
					let StartTime = new Date(this.form.haltStartTime);
					let StopTime = new Date(this.form.haltStopTime);
					let num = StopTime.getTime() - StartTime.getTime();
					if (num < 0) {
						uni.showToast({
							title: '停机开始时间不能大于停机截止时间',
							icon: 'none',
							duration: 2000
						});
						return;
					}
					this.requsetConfirm();
				})
				.catch(errors => {
					console.log('保存停机记录校验失败：', errors);
				});
		},
		// 点击操作时弹框
		requsetConfirm() {
			let that = this;
			uni.showModal({
				content: '确定此操作吗？',
				success: function(res) {
					if (res.confirm) {
						that.SaveProdFeed();
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		//保存停机记录 参数 当前行数据
		SaveProdFeed() {
			this.loading = true;
			let data = {
				make_line_id: this.make_line_id,
				device_id: this.form.device_id,
				device_stop_type_id: this.form.device_stop_type_id,
				start_time: this.form.haltStartTime,
				end_time: this.form.haltStopTime,
				stop_minute: this.form.haltTime,
				note: this.form.remark
			};
			NET.tempRequest(
				API.saveDeviceStopLog,
				{
					data
				},
				'POST'
			).then(res => {
				this.loading = false;
				if (res.data.code == '200') {
					// this.form.productionLine = ""
					this.form.equipment = '';
					this.form.haltType = '';
					this.form.haltTime = '';
					this.form.haltStartTime = '';
					this.form.haltStopTime = '';
					this.form.remark = '';
					uni.showToast({
						title: '保存成功',
						icon: 'none',
						duration: 2000
					});
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 得到的数据列表
		getList() {
			//获取列表 参数 生产线id make_line_id
			NET.tempRequest(
				API.deviceStopLogList,
				{
					make_line_id: this.make_line_id
				},
				'POST'
			).then(res => {
				console.log(res, 'sdfsd');
				if (res.data.code == 200) {
					this.list = res.data.data.list;
					this.total = res.data.data.totalResult;
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 停机登记 设备
		findDevice() {
			//获取列表 参数 生产线id make_line_id
			NET.tempRequest(
				API.findDevice,
				{
					make_line_id: this.make_line_id,
					work_position_id: this.work_position_id
				},
				'POST'
			).then(res => {
				console.log(res, '设备');
				if (res.data.code == 200) {
					this.deviceList = res.data.data;
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 停机登记 停机登记类型
		findDeviceStopType() {
			//获取列表 参数 生产线id make_line_id
			NET.tempRequest(
				API.findDeviceStopType,
				{
					make_line_id: this.make_line_id
				},
				'POST'
			).then(res => {
				console.log(res, '停机登记类型');
				if (res.data.code == 200) {
					this.deviceType = res.data.data;
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pop_box {
	padding: 9.31rpx;
	display: flex;
	flex-direction: column;
}

.body {
	width: 100%;
	height: calc(100% - 18.63rpx);
}

.haltType {
	width: 65.23rpx;
	height: 27.95rpx;
	line-height: 27.95rpx;
	text-align: center;
	background-color: #f5f7fa;
	border: 0.93rpx solid #dadada;
	color: #909399;
	margin-left: -0.93rpx;
	zz-index: 999;
	border-top-right-radius: 3.72rpx;
	border-bottom-right-radius: 3.72rpx;
}

/deep/ .input {
	border-radius: 0;
	border-top-left-radius: 3.72rpx;
	border-bottom-left-radius: 3.72rpx;
}

// 输入框高度
/deep/ .u-input {
	height: 16.77rpx;
}
/deep/ .u-textarea {
	height: 16.77rpx;
}
</style>
