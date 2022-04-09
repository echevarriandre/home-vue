<template>
  <section id="search" class="sticky top-20 bg-dracula-background pb-3 text-center mb-6 min-w-[75%]">
    <shell-pwd />

    <div :class="{ 'bg-dracula-red': emptyError }" class="mt-4 w-full sm:w-[500px] bg-dracula-currentline transition duration-300 shadow flex m-auto justify-center rounded focus-within:outline focus-within:outline-dracula-pink">
      <input v-model="search" autofocus type="text" autocomplete="off" class="caret-input w-5/6 p-2 text-dracula-foreground bg-transparent focus:outline-none" @keypress.enter="shell" />
      <button tabindex="-1" class="group focus:outline-none flex justify-center items-center cursor-pointer w-1/6 p-2 bg-transparent duration-300 rounded-sm text-dracula-foreground" @click="shell">
        <HashtagIcon class="w-5 h-5 text-dracula-foreground group-hover:text-dracula-yellow transition duration-300" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { routeNames } from "@/router/routes";
import { useAuthStore } from "@/stores/auth";
import { useLinksStore } from "@/stores/links";
import { HashtagIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ShellPwd from "./ShellPwd.vue";

const router = useRouter();
const authStore = useAuthStore();
const linksStore = useLinksStore();

const search = ref<string>("");
const emptyError = ref<boolean>(false);

function shell() {
  if (search.value.length <= 0) {
    emptyError.value = true;
    setTimeout(() => {
      emptyError.value = false;
    }, 1000);
    return;
  }

  switch (search.value) {
    case "logout":
      if (authStore.token) {
        authStore.logout();
        emptyError.value = false;
        linksStore.links = [];
        router.push({ name: routeNames.login });
      }
      search.value = "";
      break;
    default:
      window.open(`https://duckduckgo.com/?q=${search.value.replace(" ", "+")}`, "_self");
  }
}
</script>
