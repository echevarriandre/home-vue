<template>
	<div class="fixed right-0 m-5">
		<button
			@click="edit"
			class="text-red-700 hover:text-red-400 duration-200 focus:outline-none text-2xl"
		>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
				></path>
			</svg>
		</button>
	</div>

	<div class="flex justify-center items-center h-screen">
		<div class="text-white text-lg">
			<section id="title" class="text-center mb-6 min-w-3/4">
				<span class="text-red-400">echevarria</span>
				<span class="text-indigo-400"> ~/home</span>
				<span class="text-green-500"> > </span>
				<span>ddg</span>

				<div
					class="mt-4 w-3/4 shadow flex justify-items-center m-auto focus-within:outline-green-dashed"
				>
					<input
						type="text"
						class="caret-input w-5/6 p-2 bg-gray-800 rounded-l focus:outline-none"
						placeholder="search"
						v-model="search"
						@keypress.enter="duckduckgo"
					/>
					<div
						@click="duckduckgo"
						class="focus:outline-none flex justify-center items-center cursor-pointer w-1/6 p-2 bg-gray-800 hover:bg-green-500 hover:text-white duration-200 rounded-r text-gray-600"
					>
						<svg
							class="h-6 w-6"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
				</div>
			</section>

			<Links />
		</div>
	</div>
</template>

<script>
//Heroicons https://heroicons.dev/
import Links from './components/Links.vue';

export default {
	name: 'App',
	components: {
		Links,
	},
	data() {
		return {
			search: '',
		};
	},
	methods: {
		duckduckgo() {
			let updatedSearch = this.search.replace(' ', '+');
			window.open(`https://duckduckgo.com/?q=${updatedSearch}`, '_self');
		},

		edit() {
			alert('todo');
		},
	},
};
</script>
