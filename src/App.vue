<template>
	<div v-if="user" id="settings" class="z-10 fixed right-0 m-5">
		<div class="z-10">
			<button
				@click="toggleAll"
				class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline-pink-dashed"
				tabindex="-1"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					class="w-6 h-6"
					viewBox="0 0 20 20"
				>
					<g fill="none">
						<path d="M5 4a1 1 0 0 0-2 0v7.268a2 2 0 0 0 0 3.464V16a1 1 0 1 0 2 0v-1.268a2 2 0 0 0 0-3.464V4z" fill="currentColor"></path>
						<path d="M11 4a1 1 0 1 0-2 0v1.268a2 2 0 0 0 0 3.464V16a1 1 0 1 0 2 0V8.732a2 2 0 0 0 0-3.464V4z" fill="currentColor"></path>
						<path
							d="M16 3a1 1 0 0 1 1 1v7.268a2 2 0 0 1 0 3.464V16a1 1 0 1 1-2 0v-1.268a2 2 0 0 1 0-3.464V4a1 1 0 0 1 1-1z"
							fill="currentColor"
						></path>
					</g>
				</svg>
			</button>
		</div>

		<div class="z-10">
			<button
				@click="toggleNotes"
				class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline-pink-dashed"
				tabindex="-1"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
		</div>
	</div>

	<div class="flex justify-center relative top-32 text-lg">
		<div class="fixed bg-dracula-background top-0 h-32 w-full block sm:hidden" />
		<main class="min-w-1/5">
			<section id="search" class="sticky top-20 bg-dracula-background pb-3 text-center mb-6 min-w-3/4">
				<div id="shell">
					<span v-if="user" class="text-dracula-red">{{ user.username }}</span>
					<span v-else class="text-dracula-red">guest</span>
					<span class="text-dracula-purple"> ~/home</span>
					<span class="text-dracula-green"> > </span>
					<span class="text-dracula-foreground">ddg</span>
				</div>

				<div
					:class="{ 'bg-dracula-red': emptyError }"
					class="mt-4 w-full sm:w-500 bg-dracula-currentline transition duration-300 shadow flex m-auto justify-center rounded focus-within:outline-pink-dashed"
				>
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
						class="group focus:outline-none flex justify-center items-center cursor-pointer w-1/6 p-2 bg-transparent duration-300 rounded-sm text-dracula-foreground"
					>
						<svg
							class="w-5 h-5 text-dracula-foreground group-hover:text-dracula-yellow transition duration-300"
							fill="currentColor"
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
			<transition name="fade" mode="out-in">
				<Links v-if="user" v-model:needsToUpdate="needsToUpdate" />
				<Login v-else @auth="(newUser) => (user = newUser)" />
			</transition>
		</main>
	</div>
	<transition name="easter" mode="out-in">
		<div v-show="secret" @click="this.secret = false" class="top-0 h-screen w-screen duration-500 overflow-hidden fixed">
			<img src="@/assets/cow.png" alt="" class="right-0 absolute" />
		</div>
	</transition>

	<Settings v-show="showAllModal" @close="toggleAll" @refresh="needsToUpdate = true" />
</template>

<script>
//Heroicons https://heroicons.dev/
import Links from './components/Links'
import Login from './components/Login'
import Settings from './components/settings/Settings'
import AuthService from './services/AuthService'

export default {
	name: 'App',
	components: {
		Links,
		Login,
		Settings,
	},
	data() {
		return {
			search: '',
			user: null,
			links: [],
			secret: false,
			showAllModal: false,
			showNotesModal: false,
			emptyError: false,
			needsToUpdate: false,
		}
	},
	beforeMount() {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user) this.user = user
	},
	methods: {
		shell() {
			if (this.search.length <= 0) {
				this.emptyError = true
				setTimeout(() => {
					this.emptyError = false
				}, 1000)
				return
			}

			switch (this.search) {
				case 'logout':
					if (this.user) {
						AuthService.logout()
						this.user = null
						this.secret = false
						this.showAllModal = false
						this.emptyError = false
						this.links = []
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
			this.showAllModal = !this.showAllModal
		},
		toggleNotes() {
			this.showNotesModal = !this.showNotesModal
		},
	},
}
</script>
