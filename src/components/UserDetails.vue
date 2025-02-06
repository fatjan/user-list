<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-inner">
      <button @click="closeModal">×</button>
      <h4>User Details</h4>
      <div>
        <img :src="user.picture.large" alt="Dynamic Image" />
      </div>
      <p>User ID: {{ `${user.id.name}-${user.id.value}` }}</p>
      <p>Name: {{ `${user.name.first} ${user.name.last}` }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Date Of Birth: {{ formatDate(user.dob.date) }}</p>
      <p>Age: {{ user.dob.age }} years old</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-inner {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
}
</style>
