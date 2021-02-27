<template>
	<div class="fixed right-0 m-5">
		<button @click="edit" class="text-dracula-red hover:text-pink-400 transition duration-300 focus:outline-pink-dashed">
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
					clip-rule="evenodd"
				></path>
			</svg>
		</button>
	</div>

	<div class="flex justify-center items-center h-screen text-lg">
		<main class="min-w-1/5 font-bold">
			<section id="search" class="mb-6 min-w-3/4">
				<div id="title">
					<span class="text-dracula-red">echevarria</span>
					<span class="text-dracula-purple"> ~/home</span>
					<span class="text-dracula-green"> > </span>
					<span class="text-dracula-foreground">ddg</span>
				</div>

				<div class="mt-4 w-3/4 bg-dracula-currentline shadow flex justify-center rounded focus-within:outline-pink-dashed">
					<input
						type="text"
						autocomplete="off"
						class="caret-input w-5/6 p-2 font-bold text-dracula-foreground bg-transparent focus:outline-none"
						v-model="search"
						@keypress.enter="duckduckgo"
					/>
					<button
						@click="duckduckgo"
						class="group focus:outline-none flex justify-center items-center cursor-pointer w-1/6 p-2 bg-transparent hover:bg-dracula-pink duration-200 rounded text-dracula-foreground"
					>
						<svg
							class="w-5 h-5 text-dracula-pink group-hover:text-dracula-foreground transition duration-300"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
								clip-rule="evenodd"
							></path>
						</svg>
					</button>
				</div>
			</section>

			<Links v-if="!user" />
			<Login v-else />
		</main>
	</div>
</template>

<script>
//Heroicons https://heroicons.dev/
import Links from './components/Links.vue';
import Login from './components/Login.vue';

export default {
	name: 'App',
	components: {
		Links,
		Login,
	},
	data() {
		return {
			search: '',
			user: null,
		};
	},
	beforeMount() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) this.user = user;
	},
	methods: {
		duckduckgo() {
			const updatedSearch = this.search.replace(' ', '+');
			window.open(`https://duckduckgo.com/?q=${updatedSearch}`, '_self');
		},

		edit() {
			alert('todo');
		},
	},
};
</script>
