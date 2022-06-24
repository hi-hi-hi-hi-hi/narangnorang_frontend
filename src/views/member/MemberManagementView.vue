<template>
  <div class="container">
    <div class="col-md-12">
  <h3><b>계정관리</b></h3>
  <table class="table" border="1">
    <thead>
      <tr>
        <th scope="col">체크</th>
        <th scope="col">id</th>
        <th scope="col">이메일</th>
        <th scope="col">비밀번호</th>
        <th scope="col">전화번호</th>
        <th scope="col">권한등급</th>
        <th scope="col">이름(별명)</th>
        <th scope="col">지역</th>
        <th scope="col">가입날짜</th>
        <th scope="col">포인트</th>
        <th scope="col">우편번호</th>
        <th scope="col">도로명</th>
        <th scope="col">지번</th>
        <th scope="col">상세주소</th>
        <th scope="col">직업</th>
        <th scope="col">소개</th>
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
  <button type="button" class="btn btn-danger" @click="delSelected">선택 계정 삭제</button>
  <br>
  </div>
  </div>
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
      url: '/api/memberManagement',
      method: 'GET'
    })
    .then((response) => {
      this.list = response.data.memberDTO
    })
    .catch((error) => {
      console.log(error)
    })
    },
    // 선택 계정 삭제
    delSelected (event) {
      if (this.checked === []) {
        alert('선택된 항목이 없습니다.')
        event.prevendDefault()
      } else {
        if (confirm('선택된 계정들을 삭제하시겠습니까?')) {
          this.axios({
            url: '/api/delMember',
            method: 'DELETE',
            params: this.checked
          })
          .then((response) => {
            alert(response.data + '개의 계정이 삭제되었습니다.')
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

<style scoped>
table {
  width: 100%;
}
</style>
