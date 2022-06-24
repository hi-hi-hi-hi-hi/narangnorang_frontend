<template>
        <div class="btn">
        <button @click="transfer" id="B" class="button-80" role="button"><i class="fa-solid fa-cart-shopping"></i>구매</button>
        <button @click="transfer" id="S" class="button-80" role="button">적용</button>
        <button @click="transfer" id="W" class="button-80" role="button"><i class="fa-solid fa-heart"></i>위시리스트</button>
        </div>
</template>

<script>
export default {
  created () {
    this.getImage()
  },
  props: ['login'],
  data () {
    return {
      privilege: '',
      point: '',
      group: ''
    }
  },
  methods: {
    transfer (event) {
      this.$emit('group', event.target.id)
    },
    getImage () {
      this.axios({
        url: '/api/home',
        method: 'get',
        responseType: 'json'
      }).then((response) => {
        this.privilege = response.data.privilege
        this.point = response.data.point
      })
    }
  }
}
</script>
<style scoped>

  .btn {
  position: absolute;
  right:    0;
  bottom:   0;
  border: none;
}

.btn button {
 margin-right: 5px;
}

i {
  pointer-events: none;
}

/* CSS */
.button-80 {
  background: #fff;
  backface-visibility: hidden;
  border-radius: .375rem;
  border-style: solid;
  border-width: .125rem;
  box-sizing: border-box;
  color: #212121;
  cursor: pointer;
  display: inline-block;
  font-family: Circular,Helvetica,sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -.01em;
  line-height: 1.3;
  padding: 8px 1.125rem;
  position: relative;
  text-align: left;
  text-decoration: none;
  transform: translateZ(0) scale(1);
  transition: transform .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-80:not(:disabled):hover {
  transform: scale(1.05);
}

.button-80:not(:disabled):hover:active {
  transform: scale(1.05) translateY(.125rem);
}

.button-80:focus {
  outline: 0 solid transparent;
}

.button-80:focus:before {
  content: "";
  left: calc(-1*.375rem);
  pointer-events: none;
  position: absolute;
  top: calc(-1*.375rem);
  transition: border-radius;
  user-select: none;
}

.button-80:focus:not(:focus-visible) {
  outline: 0 solid transparent;
}

.button-80:focus:not(:focus-visible):before {
  border-width: 0;
}

.button-80:not(:disabled):active {
  transform: translateY(.125rem);
}
</style>
