<template>
  <section id="links-container" class="gap-3 text-center md:text-left columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
    <template v-if="!linksStore.fetching">
      <div v-for="(category, i) in linksStore.getCategories" :key="i" className="mb-3 break-after-avoid break-before-avoid break-inside-avoid w-full sm:w-auto bg-dracula-currentline shadow py-2 px-5 h-full rounded">
        <div>
          <span className="text-dracula-purple">~/{{ category }}</span>
          <span className="text-dracula-green"> ></span>
        </div>
        <div className="pb-2">
          <div v-for="link in sortLinks(category)" :key="link.id">
            <a :href="link.url" class="text-gray-600 hover:text-dracula-yellow transition duration-300 cursor-pointer">
              {{ link.name }}
            </a>
          </div>
        </div>
      </div>
    </template>

    <!-- Skeleton Loading -->
    <template v-else>
      <div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
        <div class="my-2 animate-pulse">
          <div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
          <div v-for="n in 4" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
        </div>
      </div>
      <div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
        <div class="my-2 animate-pulse">
          <div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
          <div v-for="n in 6" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
        </div>
      </div>
      <div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
        <div class="my-2 animate-pulse">
          <div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
          <div v-for="n in 3" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
        </div>
      </div>
      <div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
        <div class="my-2 animate-pulse">
          <div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
          <div v-for="n in 5" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
        </div>
      </div>
    </template>
    <!-- End Skeleton Loading -->
  </section>
</template>

<script setup lang="ts">
import { Link } from "@/@types";
import { useLinksStore } from "@/stores/links";
import { useShellStore } from "@/stores/shell";

const shellStore = useShellStore();
shellStore.path = "~/home";

const linksStore = useLinksStore();
linksStore.get();

function sortLinks(category: string): Link[] {
  return linksStore.getSortedLinksByCategory[category].sort((a, b) => (a.name > b.name ? 1 : 0));
}
</script>
