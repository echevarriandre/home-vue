<template>
  <section id="login" class="text-center min-w-[75%]">
    <form method="post" @keypress.enter.prevent="login" @submit.prevent="">
      <input
        v-model="username"
        name="username"
        autocomplete="off"
        type="text"
        :class="{ '!bg-dracula-red': errorMessage }"
        class="text-center shadow caret-input w-3/4 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline focus:outline-2 focus:outline-dracula-pink mb-3 transition duration-300"
      />
      <input
        v-model="password"
        name="password"
        autocomplete="off"
        type="password"
        :class="{ '!bg-dracula-red': errorMessage }"
        class="text-center shadow caret-input w-3/4 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline focus:outline-2 focus:outline-dracula-pink transition duration-300"
      />

      <p v-if="errorMessage" class="text-dracula-red mt-3">{{ errorMessage }}</p>

      <button
        :class="{ '!bg-dracula-red': errorMessage }"
        class="group m-auto flex justify-center shadow mt-7 focus:outline focus:outline-2 focus:outline-dracula-pink bg-dracula-currentline hover:bg-dracula-yellow transition duration-300 w-3/4 text-dracula-foreground rounded p-2"
        @click="login"
      >
        <CheckIcon class="w-5 h-5 text-dracula-foreground group-hover:text-dracula-currentline transition duration-300" />
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { routeNames } from "@/router/routes";
import { useAuthStore } from "@/stores/auth";
import { useShellStore } from "@/stores/shell";
import { CheckIcon } from "@heroicons/vue/solid";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

// Setup shell
const shellStore = useShellStore();
shellStore.user = "guest";
shellStore.path = "~/login";

const username = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

async function login(): Promise<void> {
  const loginError = await authStore.login(username.value, password.value);
  if (loginError) {
    errorMessage.value = loginError;
  } else {
    const currentUrl = new URL(window.location.href);

    const redirectUrl = currentUrl.searchParams.get("redirect");
    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push({ name: routeNames.links });
    }
  }
}

function resetError() {
  if (errorMessage.value) errorMessage.value = "";
}
watch(username, () => resetError());
watch(password, () => resetError());
</script>
