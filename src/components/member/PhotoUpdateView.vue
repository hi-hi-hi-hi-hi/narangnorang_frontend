<template>
  <p>변경 전</p>
  <div v-if="photo === null">
    <img :src="require('@/assets/member/noImage.jpg')" width="100" height="100">
  </div>
  <div v-else>
    <img :src="require('@/assets/member/' + id + '.png')" width="100" height="100">
  </div>
  <form @submit.prevent="photoUpdate">
    <p>변경 후</p>
    <div v-if="!image">
      <img :src="require('@/assets/member/noImage.jpg')" width="100" height="100">
      <input type="file" @change="photoUpload" name="mfile">
    </div>
    <div v-else>
      <img :src="image" width="100" height="100">
      <button @click="remove">Remove</button>
    </div>
    <button type="submit">수정</button>
  </form>
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
