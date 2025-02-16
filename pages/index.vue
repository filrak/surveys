<template>
  Hello World
  <a href="/list">Go to List</a>
  {{ user }}
</template>

<script setup>
const user = useCurrentUser()
</script>