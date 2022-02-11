<template>
  <div id="shell" class="flex gap-2 justify-center">
    <span class="text-dracula-red">{{ shellStore.user }}</span>
    <span class="text-dracula-purple">{{ shellStore.path }}</span>
    <span class="text-dracula-green"> > </span>
    <span class="text-dracula-foreground">{{ shellStore.program }}</span>
  </div>
</template>

<script setup lang="ts">
import { useShellStore } from "@/stores/shell";

const shellStore = useShellStore();
</script>
