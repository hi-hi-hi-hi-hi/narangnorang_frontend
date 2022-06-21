<template>
  <body class="text-center">
    <h3>변경 전</h3>
    <br>
    <div v-if="photo === null">
    <img :src="require('@/assets/member/noImage.jpg')" width="250" height="250">
    </div>
    <div v-else>
      <img :src="'/webapp/resources/images/member/' + id + '.png'" width="250" height="250">
    </div>
    <p>----------------------------------------</p>
    <h3>변경 후</h3>
    <br>
    <form @submit.prevent="photoUpdate">
      <div v-if="!image">
        <img :src="require('@/assets/member/noImage.jpg')" width="250" height="250">
        <br>
        <input type="file" @change="photoUpload" name="mfile">
      </div>
      <div v-else>
        <img :src="image" width="250" height="250">
        <br>
        <button class="btn btn-danger" @click="remove">지우기</button>
      </div>
      <br>
      <button type="submit" class="btn btn-lg btn-primary">수정</button>
    </form>
  </body>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      id: 0,
      photo: null,
      image: '',
      mFile: null
    }
  },
  methods: {
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
      this.photo = response.data.photo
      console.log(this.photo)
    })
  }
}

</script>
