<template>
  <div class="m-4 flex flex-col w-64 sm:w-96" @keypress.enter="save">
    <p v-if="isCreating" class="text-dracula-foreground px-2 text-center">Create</p>
    <p v-else class="text-dracula-foreground px-2 text-center">Edit</p>
    <div class="flex flex-col">
      <label class="text-dracula-comment p-2">name</label>
      <input v-model="name" type="text" :class="{ 'bg-dracula-red': error }" class="shadow caret-input transition duration-300 p-2 text-dracula-foreground bg-dracula-currentline focus:outline focus:outline-dracula-pink rounded" />
    </div>
    <div class="flex flex-col">
      <label class="text-dracula-comment p-2">url</label>
      <input v-model="url" type="text" :class="{ 'bg-dracula-red': error }" class="shadow caret-input transition duration-300 p-2 text-dracula-foreground bg-dracula-currentline focus:outline focus:outline-dracula-pink rounded" />
    </div>
    <div class="flex flex-col">
      <label class="text-dracula-comment p-2">type</label>
      <input v-model="type" type="text" :class="{ 'bg-dracula-red': error }" class="shadow caret-input transition duration-300 p-2 text-dracula-foreground bg-dracula-currentline focus:outline focus:outline-dracula-pink rounded" />
    </div>

    <button :class="{ 'bg-dracula-red': error }" class="group bg-dracula-currentline p-2 flex justify-center shadow mt-9 focus:outline focus:outline-dracula-pink rounded hover:bg-dracula-yellow transition duration-300" @click="save">
      <CheckIcon class="w-5 h-5 text-dracula-foreground group-hover:text-dracula-currentline transition duration-300" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Link, LinkDto } from "@/@types";
import { useLinksStore } from "@/stores/links";
import { CheckIcon } from "@heroicons/vue/solid";
import { computed, onMounted, ref } from "vue";

const emit = defineEmits(["complete"]);
const props = defineProps<{ link?: Link }>();

const linkStore = useLinksStore();
const name = ref("");
const url = ref("");
const type = ref("");
const error = ref(false);

const isCreating = computed((): boolean => {
  if (props.link) return false;
  return true;
});

async function save(): Promise<void> {
  const link: LinkDto = { name: name.value, type: type.value, url: url.value };
  if (isCreating.value) await linkStore.create(link);
  if (props.link) await linkStore.edit(props.link.id, link);

  emit("complete");
}

onMounted(() => {
  if (props.link) {
    name.value = props.link.name;
    type.value = props.link.type;
    url.value = props.link.url;
  }
});
</script>
