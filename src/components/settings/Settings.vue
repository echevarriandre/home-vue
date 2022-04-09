<template>
  <div class="z-10 fixed h-screen w-screen top-0 bg-black bg-opacity-30 flex justify-center items-start" @click.self="close">
    <div class="h-[70%] md:w-auto m-2 max-h-3/4 top-20 relative bg-dracula-background overflow-y-auto rounded scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dracula-pink">
      <div class="rounded flex flex-col min-w-[200px]">
        <section id="modal-navbar" class="relative top-0 py-2 px-4 text-right flex justify-between">
          <div class="flex space-x-2">
            <button v-if="!editing" class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline focus:outline-dracula-pink rounded flex justify-center" @click="close">
              <XIcon class="w-5 h-5" />
            </button>
            <button v-else class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline focus:outline-dracula-pink rounded flex justify-center" @click="back">
              <ArrowSmLeftIcon class="w-5 h-5" />
            </button>
          </div>
          <button v-if="!editing" class="text-dracula-orange hover:text-dracula-yellow transition duration-300 focus:outline focus:outline-dracula-pink rounded flex justify-center" @click="create">
            <PlusSmIcon class="w-5 h-5" />
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
import { ArrowSmLeftIcon, PlusSmIcon, XIcon } from "@heroicons/vue/solid";
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
