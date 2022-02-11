<template>
  <div class="w-full flex flex-col items-center">
    <h1 class="text-dracula-orange text-9xl">{{ route.params.error ?? 404 }}</h1>
    <p class="mt-16 text-2xl text-dracula-comment">Oops, page not found!</p>
  </div>
</template>

<script setup lang="ts">
import { useShellStore } from "@/stores/shell";
import { useRoute } from "vue-router";
const shellStore = useShellStore();
shellStore.path = "~/error";

const route = useRoute();
</script>
