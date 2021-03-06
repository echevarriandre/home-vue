<template>
	<div v-if="user" class="z-10 fixed right-0 m-5">
		<button @click="toggleAll" class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline-green-dashed" tabindex="-1">
			<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
					clip-rule="evenodd"
				></path>
			</svg>
		</button>
	</div>

	<div class="flex justify-center relative top-32 text-lg">
		<main class="min-w-1/5">
			<section id="search" class="text-center mb-6 min-w-3/4">
				<div id="shell">
					<span v-if="user" class="text-dracula-red">{{ user.username }}</span>
					<span v-else class="text-dracula-red">guest</span>
					<span class="text-dracula-purple"> ~/home</span>
					<span class="text-dracula-green"> > </span>
					<span class="text-dracula-foreground">ddg</span>
				</div>

				<div class="mt-4 md:w-3/4 bg-dracula-currentline shadow flex m-auto justify-center rounded focus-within:outline-green-dashed">
					<input
						type="text"
						autocomplete="off"
						class="caret-input w-5/6 p-2 text-dracula-foreground bg-transparent focus:outline-none"
						v-model="search"
						@keypress.enter="shell"
					/>
					<button
						@click="shell"
						tabindex="-1"
						class="group focus:outline-none flex justify-center items-center cursor-pointer w-1/6 p-2 bg-transparent hover:bg-dracula-pink duration-200 rounded-sm text-dracula-foreground"
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
			<!-- add transition when changing (each component needs one transition) -->
			<Links v-if="user" />
			<Login v-else @auth="(newUser) => (user = newUser)" />
		</main>
	</div>
	<transition name="fade" mode="out-in">
		<div v-show="secret" @click="this.secret = false" class="top-0 h-screen w-screen duration-500 overflow-hidden fixed">
			<img src="@/assets/cow.png" alt="" class="right-0 absolute" />
		</div>
	</transition>
	<All v-if="showModal" @close="toggleAll" />
</template>

<script>
//Heroicons https://heroicons.dev/
import Links from './components/Links'
import Login from './components/Login'
import All from './components/All'
import AuthService from './services/AuthService'

export default {
	name: 'App',
	components: {
		Links,
		Login,
		All,
	},
	data() {
		return {
			search: '',
			user: null,
			secret: false,
			showModal: false,
		}
	},
	beforeMount() {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user) this.user = user
	},
	methods: {
		shell() {
			switch (this.search) {
				case 'logout':
					if (this.user) {
						AuthService.logout()
						this.user = null
					}
					this.search = ''
					break
				case 'porn':
					this.secret = !this.secret
					this.search = ''
					break
				default:
					window.open(`https://duckduckgo.com/?q=${this.search.replace(' ', '+')}`, '_self')
			}
		},

		toggleAll() {
			this.showModal = !this.showModal
			document.body.classList.toggle('modal-open')
		},

		// auth(user) {
		// 	this.user = user;
		// },
	},
}
</script>

<style>
.modal-open {
	overflow: hidden;
}
</style>
