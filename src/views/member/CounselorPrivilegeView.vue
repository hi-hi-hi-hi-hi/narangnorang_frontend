<template>
  <h2>상담사 승인 관리</h2>
  <table border="1">
    <thead>
      <tr>
        <th>체크</th>
        <th>id</th>
        <th>email</th>
        <th>password</th>
        <th>phone</th>
        <th>privilege</th>
        <th>name</th>
        <th>region</th>
        <th>datetime</th>
        <th>point</th>
        <th>zipcode</th>
        <th>address1</th>
        <th>address2</th>
        <th>address3</th>
        <th>job</th>
        <th>introduction</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in list" :key="idx">
        <td><input type="checkbox" :value="row.id" v-model="checked"></td>
        <td>{{ row.id }}</td>
        <td>{{ row.email }}</td>
        <td>{{ row.password }}</td>
        <td>{{ row.phone }}</td>
        <td>{{ row.privilege }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.region }}</td>
        <td>{{ row.datetime }}</td>
        <td>{{ row.point }}</td>
        <td>{{ row.zipcode }}</td>
        <td>{{ row.address1 }}</td>
        <td>{{ row.address2 }}</td>
        <td>{{ row.address3 }}</td>
        <td>{{ row.job }}</td>
        <td>{{ row.introduction }}</td>
      </tr>
    </tbody>
  </table>
  <br>
  <button type="button" @click="privilegeUP">선택 상담사 승인</button>
  <br>
</template>

<script>

export default {
  data () {
    return {
      list: {},
      checked: []
    }
  },
  methods: {
    // list 호출
    getList () {
      this.axios({
      url: '/api/counselorPrivilege',
      method: 'GET'
    })
    .then((response) => {
      this.list = response.data.memberDTO
    })
    .catch((error) => {
      console.log(error)
    })
    },
    // 선택 상담사 승인
    privilegeUP (event) {
      if (this.checked === []) {
        alert('선택된 항목이 없습니다.')
        event.prevendDefault()
      } else {
        if (confirm('선택된 계정들을 승인하시겠습니까?')) {
          this.axios({
            url: '/api/privilegeUp',
            method: 'PUT',
            params: this.checked
          })
          .then((response) => {
            alert(response.data + '개의 계정이 승인되었습니다.')
            this.$router.push('/admin')
          })
          .catch((error) => {
            console.log(error)
          })
        } else {
          event.prevendDefault()
        }
      }
    }
  },
  mounted () {
    this.getList()
  }
}
</script>
