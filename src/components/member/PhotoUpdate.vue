<template>
  <div class="text-center">
    <div class="box">
      <h3>변경 전</h3>
      <div>
        <img :src="'/webapp/resources/images/member/' + id + '.png'" width="250" height="250" @error="replaceImg">
      </div>
    </div>
    <div class="box">
      <b><i class="fa-solid fa-chevron-right"></i></b>
    </div>
    <div class="box">
      <h3>변경 후</h3>
      <form @submit.prevent="photoUpdate">
        <div v-if="!image">
          <img :src="require('@/assets/member/noImage.jpg')">
          <br>
          <input type="file" @change="photoUpload" name="mfile">
        </div>
        <div v-else>
          <img :src="image">
          <br>
          <button class="btn btn-danger" @click="remove">지우기</button>
        </div>
        <br>
        <button type="submit" class="btn btn-outline-dark btn-lg">수정</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import img from '@/assets/member/noImage.jpg'

export default {
  data () {
    return {
      id: 0,
      image: '',
      mFile: null
    }
  },
  methods: {
    replaceImg (e) {
            e.target.src = img
        },
    photoUpload (e) {
      const files = e.target.files || e.dataTransfer.files
      this.createImage(files[0])
      this.mFile = files[0]
    },
    createImage (file) {
      // const image = new Image()
      const reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    remove () {
      this.image = ''
    },
    photoUpdate (event) {
      const formData = new FormData()
      formData.append('mFile', this.mFile)
      if (this.image === '') {
        alert('변경 후 사진이 없습니다.')
        event.preventDefault()
      } else {
        axios.put('/api/photoUpdate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          alert('프로필 사진이 수정되었습니다.')
          this.$router.push('/home')
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  },
  mounted () {
    this.axios({
      url: '/api/loginSession',
      method: 'get',
      responseType: 'json'
    })
    .then((response) => {
      this.id = response.data.id
    })
  }
}

</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
  border: 1px solid #303030;
  border-radius: 5px;
}

h3 {
  font-weight: bold;
  margin-left: 30%;
}

button {
  margin-left: 20%;
}

.box {
  float: left;
  width: 30%;
  padding:10px;
}
</style>
