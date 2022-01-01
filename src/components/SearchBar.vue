<template>
  <section id="search" class="sticky top-20 bg-dracula-background pb-3 text-center mb-6 min-w-[75%]">
    <div id="shell">
      <span v-if="authStore.token" class="text-dracula-red">{{ authStore.username }}</span>
      <span v-else class="text-dracula-red">guest</span>
      <span class="text-dracula-purple"> ~/home</span>
      <span class="text-dracula-green"> > </span>
      <span class="text-dracula-foreground">ddg</span>
    </div>

    <div :class="{ 'bg-dracula-red': emptyError }" class="mt-4 w-full sm:w-[500px] bg-dracula-currentline transition duration-300 shadow flex m-auto justify-center rounded focus-within:outline focus-within:outline-dracula-pink">
      <input v-model="search" type="text" autocomplete="off" class="caret-input w-5/6 p-2 text-dracula-foreground bg-transparent focus:outline-none" @keypress.enter="shell" />
      <button tabindex="-1" class="group focus:outline-none flex justify-center items-center cursor-pointer w-1/6 p-2 bg-transparent duration-300 rounded-sm text-dracula-foreground" @click="shell">
        <svg class="w-5 h-5 text-dracula-foreground group-hover:text-dracula-yellow transition duration-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </section>

  <transition name="easter" mode="out-in">
    <div v-show="secret" class="top-0 h-screen w-screen duration-500 overflow-hidden fixed" @click="secret = false">
      <img src="@/assets/cow.png" alt="" class="right-0 absolute" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { routeNames } from "@/router/routes";
import { useAuthStore } from "@/stores/auth";
import { useLinksStore } from "@/stores/links";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const linksStore = useLinksStore();

const search = ref<string>("");
const emptyError = ref<boolean>(false);
const secret = ref<boolean>(false);

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
        secret.value = false;
        emptyError.value = false;
        linksStore.links = [];
        router.push({ name: routeNames.login });
      }
      search.value = "";
      break;
    case "porn":
      secret.value = !secret.value;
      search.value = "";
      break;
    default:
      window.open(`https://duckduckgo.com/?q=${search.value.replace(" ", "+")}`, "_self");
  }
}
</script>
