<template>
	<section id="login" class="text-center min-w-3/4">
		<form method="post" @keypress.enter="login" @submit.prevent="">
			<input
				name="username"
				v-model="username"
				autocomplete="off"
				type="password"
				:class="{ 'bg-dracula-red transition duration-300': error }"
				class="text-center shadow caret-input w-3/4 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline-pink-dashed mb-3"
			/>
			<input
				name="password"
				v-model="password"
				autocomplete="off"
				type="password"
				:class="{ 'bg-dracula-red transition duration-300': error }"
				class="text-center shadow caret-input w-3/4 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline-pink-dashed"
			/>

			<button
				@click="login"
				:class="{ 'bg-dracula-red': error }"
				class="group m-auto flex justify-center shadow mt-7 focus:outline-pink-dashed bg-dracula-currentline hover:bg-dracula-yellow transition duration-300 w-3/4 text-dracula-foreground rounded p-2"
			>
				<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				aria-hidden="true"
				class="w-5 h-5 text-dracula-foreground group-hover:text-dracula-currentline transition duration-300"
				viewBox="0 0 20 20"
			>
				<g fill="none">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z"
						fill="currentColor"
					></path>
				</g>
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
