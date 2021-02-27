<template>
	<section id="links-container" class="md:flex">
		<template v-if="links">
			<div v-for="link in links" :key="link.id">
				<a :href="link.url" class="text-gray-600 hover:text-red-500 duration-200 cursor-pointer">
					{{ link.name }}
				</a>
			</div>
		</template>

		<template v-else>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-pink-500 rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 4" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-pink-500 rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 6" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-pink-500 rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 3" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class=" my-2 animate-pulse">
					<div class="bg-pink-500 rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 5" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
		</template>
	</section>
</template>

<script>
import LinksService from '../services/LinksService';

export default {
	data() {
		return {
			links: null,
		};
	},
	mounted() {
		LinksService.getAll()
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	},
};
</script>
