<template>
    <div id="chatsList">
		<table style="width: 500px">
			<tbody>
				<tr v-for="(message, idx) in list" :key="idx">
				<!-- 사용자 이름 -->
					<td v-if="message.senderName === null || message.recieverName === null">
							<b style="font-size: 11px; color: grey">탈퇴한 사용자</b>
					</td>
					<td v-else-if="message.senderId === userId">
						{{ message.recieverName }}
						<b style="font-size: 11px; color: green" v-if="message.recieverPrivilege == 1 && message.recieverName !== null">
						상담사
						</b>
					</td>
					<td v-else>
						{{ message.senderName }}
						<b style="font-size: 11px; color: green" v-if="message.senderPrivilege == 1 && message.senderName !== null">
						상담사
						</b>
					</td>
					<!-- 가장 최근 내용 -->
					<td>
						<a @click="showMessageHistory">{{ message.content }}</a>
						<b v-if="message.read === 0 && message.senderId !== userId" style="font-size: 11px; color: red">
						new!
						</b>
					</td>
					<!-- 가장 최근 시간 -->
					<td>
						{{ message.datetime }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
    name: 'TempVue',
    data () {
        return {
            list: {},
            userId: ''
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList () {
        this.axios.get('/api/message/list', {

        })
        .then((res) => {
            this.list = res.data.messageList
            this.userId = res.data.userId
        })
        .catch((err) => {
            console.log(err)
        })
        },
		showMessageHistory () {
			console.log('work well')
		}
    }
}
</script>

<style scoped>
a:hover {
  cursor:pointer;
}
</style>
