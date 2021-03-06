<template>
	<section id="login" class="text-center min-w-3/4">
		<form method="post" @keypress.enter="login" @submit.prevent="">
			<input
				name="username"
				v-model="username"
				autocomplete="off"
				type="password"
				:class="{ 'bg-dracula-red transition duration-300': error }"
				class="shadow caret-input w-3/4 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline-yellow-dashed mb-3"
			/>
			<input
				name="password"
				v-model="password"
				autocomplete="off"
				type="password"
				:class="{ 'bg-dracula-red transition duration-300': error }"
				class="shadow caret-input w-3/4 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline-yellow-dashed"
			/>

			<button
				@click="login"
				:class="{ 'bg-dracula-red': error }"
				class="group m-auto flex justify-center shadow mt-7 focus:outline-yellow-dashed bg-dracula-currentline hover:bg-dracula-pink transition duration-300 w-3/4 text-white rounded p-2"
			>
				<svg
					class="w-5 h-5 group-hover:text-dracula-foreground transition duration-300"
					:class="{ 'text-dracula-foreground': error, 'text-dracula-pink': !error }"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
		</form>
	</section>
</template>

<script>
import AuthService from '../services/AuthService'
export default {
	data() {
		return {
			username: '',
			password: '',
			error: false,
		}
	},
	methods: {
		login() {
			AuthService.login({ username: this.username, password: this.password })
				.then((response) => {
					const user = response.data
					this.error = false
					localStorage.setItem('user', JSON.stringify(user))
					this.$emit('auth', user)
				})
				.catch(() => {
					this.error = true
				})
		},
	},
}
</script>

<style></style>
