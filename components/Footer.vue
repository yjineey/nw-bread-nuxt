<template>
  <footer class="bg-white">
    <div class="container mx-auto px-4 py-4 text-center text-sm text-black">
      © {{ year }} NEWWAY CHURCH All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
