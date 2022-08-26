<template>
	<!-- 生产投料 -->
	<view class="body">
		<prod-feed v-if="current == 1" @openList="openList" @openDetail="openDetail"></prod-feed>
		<prod-feed-list v-if="current== 2" :card_info="card_info" :prevCurrent="prevCurrent"  @openList="openList" @openDetail="openDetail"></prod-feed-list>
		<prod-feed-detail v-if="current == 3" :card_info="card_info" :prevCurrent="prevCurrent" @openList="openList" :data="data">
		</prod-feed-detail>
	</view>
</template>

<script>
	import prodFeed from "./components/prodFeed.vue"
	import prodFeedList from "./components/prodFeedList.vue"
	import prodFeedDetail from "./components/prodFeedDetail.vue"
	
	export default {
		components: {
			prodFeed,
			prodFeedList,
			prodFeedDetail
		},
		data() {
			return {
				current: 1,
				prevCurrent: 1,
				card_info:{}
			}
		},
		mounted() {
		},
		methods: {
			//打开已投列表
			openList(data) {
				this.card_info=data.work_card_info
				this.prevCurrent = data.current
				this.current = data.current
			},
			//接收单行数据
			openDetail(data) {
				this.card_info=data.work_card_info
				this.data = data
				this.current = data.current
			},

			
		}
	}
</script>

<style>
	.body {
		width: 100%;
		height: calc(100% - 14.91rpx);
	}
</style>
