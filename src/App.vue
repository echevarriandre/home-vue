<template>
  <div class="flex justify-center relative top-32 text-lg">
    <div v-if="authStore.token" id="settings-button" class="z-10 fixed right-0 top-0 m-5">
      <div class="z-10">
        <button class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline rounded" tabindex="-1" @click="toggleSettings">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="w-6 h-6" viewBox="0 0 20 20">
            <g fill="none">
              <path d="M5 4a1 1 0 0 0-2 0v7.268a2 2 0 0 0 0 3.464V16a1 1 0 1 0 2 0v-1.268a2 2 0 0 0 0-3.464V4z" fill="currentColor"></path>
              <path d="M11 4a1 1 0 1 0-2 0v1.268a2 2 0 0 0 0 3.464V16a1 1 0 1 0 2 0V8.732a2 2 0 0 0 0-3.464V4z" fill="currentColor"></path>
              <path d="M16 3a1 1 0 0 1 1 1v7.268a2 2 0 0 1 0 3.464V16a1 1 0 1 1-2 0v-1.268a2 2 0 0 1 0-3.464V4a1 1 0 0 1 1-1z" fill="currentColor"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>

    <div class="fixed bg-dracula-background top-0 h-32 w-full block sm:hidden" />
    <main class="min-w-[20%]">
      <search-bar />

      <router-view />
    </main>
  </div>

  <settings v-if="showSettings" @close="toggleSettings" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "./components/SearchBar.vue";
import Settings from "./components/settings/Settings.vue";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

const showSettings = ref<boolean>(false);

function toggleSettings() {
  showSettings.value = !showSettings.value;
}
</script>
