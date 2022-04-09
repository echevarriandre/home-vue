<template>
  <div class="flex justify-center relative top-32 text-lg">
    <div v-if="authStore.token" id="settings-button" class="z-10 fixed right-0 top-0 m-5">
      <div class="z-10">
        <button class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline rounded" tabindex="-1" @click="toggleSettings">
          <AdjustmentsIcon class="w-6 h-6" />
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
import { AdjustmentsIcon } from "@heroicons/vue/solid";
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
