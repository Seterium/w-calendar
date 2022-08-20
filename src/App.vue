<script setup lang="ts">
import Calendar from '@/components/Calendar.vue'
</script>
<template>
  <div class="app">
    <Calendar />
  </div>
</template>
<style lang="scss">
* {
  position: relative;
  box-sizing: border-box;
  outline: none;
}

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Russo One', sans-serif;
}

button,
input,
textarea {
  font-size: 16px;
  font-family: 'Russo One', sans-serif;
}

button {
  padding: 0;
  font-size: 16px;
  background-color: transparent;
  border: none;
}

@font-face {
  font-weight: 400;
  font-family: 'Russo One';
  font-style: normal;
  src:
    local('Russo One'),
    url('/fonts/RussoOne.woff') format('woff'),
    url('/fonts/RussoOne.woff2') format('woff2');
  font-display: swap;
}

#app {
  height: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>