<template>
  <div>
    <keyboard />
  </div>
</template>
<script>
import keyboard from './keyboard.vue'

export default {
  components:{
    keyboard
  },
  data(){
    return{
      show: true,
      keyState:false,
    }
  },
  methods:{
    exit(){
      this.keyState = false
    },
    getKey(val){
      if (this.str.length >= 8&&val!="delete") {
        return false
      }
      if(val == 'delete'){
        this.str = this.str.slice(0, this.str.length-1)
      }else{
        this.str+=val
      }
    },
    confirm(){
      this.keyState = false
    },
  }
}
</script>