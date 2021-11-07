<script>
export default {
  name: '{{ pascalCase NAME }}Page',
  data: () => ({}),
  computed: {},
  methods: {}
}
</script>
<template>
  <div class="app-page {{ dashCase NAME }}-page">
    {{ pascalCase NAME }}
  </div>
</template>
<style src="@/assets/styles/pages/{{ camelCase PATH }}/{{ pascalCase NAME }}.scss" lang="scss"></style>