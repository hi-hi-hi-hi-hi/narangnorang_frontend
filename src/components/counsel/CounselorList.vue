<template>
    <div class="counselorListArea">
        <select id="searchCol">
            <option value="name">이름</option>
            <option value="location">위치</option>
        </select>
        <input type="text" id="keyword">

	<table v-for="(counselor, idx) in list" :key="idx" style="width: 600px; border: 1px solid gray; margin: 20px">
		<tr align="center">
			<td rowspan="6"><img :src="require('@/assets/counsel/'+ counselor.id + '.jpg')"
				width="150" height="200"></td>
			<td><b style="font-size: 20px">{{ counselor.name }}</b></td>
		</tr>
		<tr align="center">
			<td>{{ counselor.job }}</td>
		</tr>
		<tr>
			<td><b>병원정보:</b> {{ counselor.address2 }} {{ counselor.address3 }}
				[{{ counselor.address1 }}]</td>
		</tr>
		<tr>
			<td><b>연락처:</b> {{ counselor.phone }}</td>
		</tr>
		<tr>
			<td>{{ counselor.introduction }}</td>
		</tr>
		<tr align="right">
			<td>
				<button>쪽지 보내기</button>
			</td>
		</tr>
	</table>
    </div>
</template>

<script>
export default {
    name: 'CounselorList',
    data () {
        return {
            list: {}
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList () {
            this.axios.get('/api/counsel/list', {

            })
            .then((res) => {
                this.list = res.data.counselorList
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
