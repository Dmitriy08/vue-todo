<template>
  <div class="modal" data-overlay @click="closeOnOverlay">
    <div class="modal-wrap">
      <div class="modal-title">
        <h3>{{title}}</h3>
      </div>
      <div class="modal-btns">
        <button
            class="btn btn_maincolor"
            @click="$emit('closeModal')"
        >Cancel</button>
        <button
            class="btn btn_maincolor2"
            @click="modalHand"
        >Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ['title', 'modalHandler'],
  methods: {
    modalHand(){
      this.$emit('closeModal');
      return this.modalHandler()
    },
    closeOnOverlay(e){
      if (e.target.hasAttribute('data-overlay')) this.$emit('closeModal');
    }
  }
}
</script>

<style scoped>
</style>
