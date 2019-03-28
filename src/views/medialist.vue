<template>
  <div>asdasdas1{{type}}</div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.params.id
    }
  }
}
</script>
