<template>
  <footer class="border-t h-16">
    <div class="container mx-auto px-4 py-4 text-center text-sm">
      © {{ year }} NEWWAY CHURCH All rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
