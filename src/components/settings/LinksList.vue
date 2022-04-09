<template>
  <div class="w-full mb-2">
    <table v-if="linksStore.links.length > 0" class="min-w-full leading-normal">
      <thead class="sticky top-0 bg-dracula-currentline text-dracula-foreground">
        <tr>
          <th class="px-5 py-3 text-center text-xs uppercase tracking-wider">name</th>
          <th class="px-5 py-3 text-center text-xs uppercase tracking-wider hidden sm:table-cell">url</th>
          <th class="px-5 py-3 text-center text-xs uppercase tracking-wider">type</th>
          <th class="px-5 py-3 text-center text-xs uppercase tracking-wider">actions</th>
        </tr>
      </thead>
      <tbody class="text-dracula-comment">
        <tr v-for="link in linksStore.filterLinksByValue(props.search).sort((a, b) => (a.name > b.name ? 1 : 0))" :key="link.id" class="transition duration-300">
          <td class="px-5 py-1 text-sm">
            <div class="flex items-center">
              <span class="whitespace-no-wrap">
                {{ link.name }}
              </span>
            </div>
          </td>
          <td class="px-5 py-1 text-sm hidden sm:table-cell">
            <a :href="link.url" target="_blank" class="whitespace-no-wrap hover:text-dracula-yellow transition duration-300 text-dracula-cyan focus:outline-dracula-pink">{{ link.url }}</a>
          </td>
          <td class="px-5 py-1 text-sm">
            <span class="whitespace-no-wrap">
              {{ link.type }}
            </span>
          </td>
          <td class="mx-5 my-5 text-center">
            <button class="text-xl focus:outline focus:outline-dracula-pink rounded hover:text-dracula-yellow transition duration-300 inline-block mx-1 my-1 text-dracula-comment" @click="edit(link)">
              <PencilIcon class="w-5 h-5" />
            </button>
            <button class="text-xl focus:outline focus:outline-dracula-pink rounded hover:text-dracula-yellow transition duration-300 inline-table-cell mx-1 my-1 text-dracula-red" @click="remove(link)">
              <TrashIcon class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="linksStore.filterLinksByValue(props.search).length == 0" class="py-3 text-center text-dracula-foreground">No results found</p>
  </div>
</template>

<script setup lang="ts">
import { Link } from "@/@types";
import { useLinksStore } from "@/stores/links";
import { PencilIcon, TrashIcon } from "@heroicons/vue/solid";

const props = defineProps<{ search: string }>();

const emit = defineEmits(["edit"]);
const linksStore = useLinksStore();

function edit(link: Link) {
  emit("edit", link);
}

function remove(link: Link) {
  linksStore.remove(link.id);
}
</script>
