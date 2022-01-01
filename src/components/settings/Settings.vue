<template>
  <div class="z-10 fixed h-screen w-screen top-0 bg-black bg-opacity-30 flex justify-center items-start" @click.self="close">
    <div class="md:w-auto m-2 max-h-3/4 top-20 relative bg-dracula-background overflow-y-auto rounded scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dracula-pink">
      <div class="rounded flex flex-col min-w-[200px]">
        <section id="modal-navbar" class="relative top-0 py-2 px-4 text-right flex justify-between">
          <div class="flex space-x-2">
            <button v-if="!editing" class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline focus:outline-dracula-pink rounded flex justify-center" @click="close">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="w-5 h-5" viewBox="0 0 20 20">
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15l-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152l2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button v-else class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline focus:outline-dracula-pink rounded flex justify-center" @click="back">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="w-5 h-5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                <g fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.707 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 9H17a1 1 0 1 1 0 2H5.414l2.293 2.293a1 1 0 0 1 0 1.414z" fill="currentColor"></path>
                </g>
              </svg>
            </button>
          </div>
          <button v-if="!editing" class="text-dracula-orange hover:text-dracula-yellow transition duration-300 focus:outline focus:outline-dracula-pink rounded flex justify-center" @click="create">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20">
              <g fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z" fill="currentColor"></path>
              </g>
            </svg>
          </button>
        </section>
        <section class="flex justify-center flex-col">
          <transition name="fade" mode="out-in">
            <LinkEdit v-if="editing" :link="selectedLink" @complete="back" />
            <p v-else-if="linkStore.links.length === 0" class="text-white text-center p-2">No links were found</p>
            <LinksList v-else @edit="edit" />
          </transition>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link } from "@/@types";
import { useLinksStore } from "@/stores/links";
import { ref } from "vue";
import LinkEdit from "./LinkEdit.vue";
import LinksList from "./LinksList.vue";

const emit = defineEmits(["close"]);
const linkStore = useLinksStore();
const editing = ref(false);
const selectedLink = ref<Link>();

function close(): void {
  selectedLink.value = undefined;
  editing.value = false;

  emit("close");
}

function create() {
  editing.value = true;
}

function edit(link: Link): void {
  editing.value = true;
  selectedLink.value = link;
}

function back(): void {
  editing.value = false;
  selectedLink.value = undefined;
}
</script>
