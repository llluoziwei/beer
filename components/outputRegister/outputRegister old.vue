<template>
	<!-- 产出登记 -->
	<view class="body">
		<List @output_r_list="output_list" @openDetail="openDetail" v-if="current == 0"></List>
		<Contractor :select_work="select_work" :prevcurrent="prevcurrent" :lists="lists" @cancel="cancel" :keys="keys" v-if="current == 1"></Contractor>
	    <work-history v-if="current==2" @output_r_list="output_list" @openDetail="openDetail"></work-history>
	</view>
</template>

<script>
	import {user} from '../../config/index.js'
	import List from "./components/list.vue"
	import Contractor from "./components/contractor.vue"
	import workHistory from './components/workhistory.vue'
	export default {
		components: {
			List,
			Contractor,
			workHistory
		},
		data() {
			return {
				prevcurrent:0,
				current: 0, //0表示列表页 1表示报工页
				keys:0, //列表中点击报工传过来的值
				lists:[],
				select_work:{}
			};
		},
		mounted() {
			//user().then(res=>{})

		},
		methods: {
			output_list(list){
				
				console.log(this.lists,'父子得到的数据')
			},
			// 取消返回列表界面
			cancel(current) {
				this.current = current
			},
			openDetail(e) {
				this.current =e.current
				this.prevcurrent=e.prevcurrent
				this.keys = e.key
				this.lists=e.list
				this.select_work=e.select_work
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		width: 100%;
		height: 100%;
	}
</style>
