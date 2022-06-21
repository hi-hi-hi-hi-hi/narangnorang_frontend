<template>
  <div class="card">
    <div class="infos">
      <img class="img-area" :src="require('@/assets/counsel/' + counselor.id + '.jpg')">
      <div class="name-area">
        <h2>{{ counselor.name }}</h2>
        <h4>{{ counselor.job }}</h4>
      </div>
    <p class="text">
      {{ counselor.introduction }}
    </p>
    <div class="bottom-area">
    <ul class="stats">
      <li>
        <h3>Phone</h3>
        <h4>{{ counselor.phone }}</h4>
      </li>
      <li>
        <h3>Address</h3>
        <h4>{{ counselor.address2 }}, <br>{{ counselor.address3 }}</h4>
      </li>
    </ul>
    <button @click="this.$parent.viewModal(counselor.id, counselor.name, counselor.privilege)" type="button" class="btn btn-outline-dark">상담하기</button>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      childInfo: {
        modal: null,
        recieverId: null,
        recieverName: null,
        recieverPrivilege: null
      }

    }
  },
  props: {
    counselor: Object
  }
}
</script>

<style scoped>

* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
align-items: center;
justify-content: center;
background-color: #c4e5f1;
min-height: 100vh;
}

img {
max-width: 100%;
display: block;
}
ul {
list-style: none;
}

/* Utilities */
.card::after,
.card img {
border-radius: 50%;
}
body,
.card,
.stats {
display: flex;
}

.card {
padding: 2.5rem 2rem;
border-radius: 10px;
background-color: rgba(255, 255, 255, .5);
max-width: 700px;
box-shadow: 0 0 30px rgba(0, 0, 0, .15);
margin: 1rem;
position: relative;
transform-style: preserve-3d;
overflow: hidden;
}
.card::before,
.card::after {
content: '';
position: absolute;
z-index: -1;
}
.card::before {
width: 100%;
height: 100%;
border: 1px solid #FFF;
border-radius: 10px;
top: -.7rem;
left: -.7rem;
}
.card::after {
height: 15rem;
width: 15rem;
background-color: rgb(255, 247, 101, 0.5);
top: -8rem;
right: -8rem;
}

.card img {
width: 8rem;
min-width: 80px;
height: 8rem;
box-shadow: 0 0 0 5px #FFF;
}

.infos {
margin-left: 1.5rem;
}

.text {
font-size: 1rem;
margin-bottom: 1rem;
clear: both;
padding: 20px;
background-color: rgba(253, 255, 198, 0.172);
border-radius: 8px;
}

.stats {
margin-bottom: 1rem;
text-align: center;
}
.stats li {
min-width: 5rem;
padding-right: 5%;
}
.stats li h3 {
font-size: .99rem;
}
.stats li h4 {
font-size: .75rem;
}

.btn {
padding: .2rem;
border: 1px solid rgb(137, 137, 137);
font-weight: bold;
}

@media screen and (max-width: 450px) {
.card {
  display: block;
}
.infos {
  margin-left: 0;
  margin-top: 1.5rem;
}

}

.img-area {
  float: left;
  margin-right: 10px;
}
.name-area {
  float: left;
  padding-left: 10%;
  padding-top: 5%;
}

.bottom-area {
  text-align: center;
}
</style>
