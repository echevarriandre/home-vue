<template>
	<section id="login" class="min-w-3/4">
		<input
			name="username"
			v-model="username"
			autocomplete="off"
			type="password"
			class="shadow caret-input w-3/4 p-2 font-bold text-dracula-foreground bg-dracula-currentline rounded focus:outline-pink-dashed mb-3"
		/>
		<input
			name="password"
			v-model="password"
			autocomplete="off"
			type="password"
			class="shadow caret-input w-3/4 p-2 font-bold text-dracula-foreground bg-dracula-currentline rounded focus:outline-pink-dashed"
		/>

		<button
			@click="login"
			class="group flex justify-center shadow mt-7 focus:outline-pink-dashed bg-dracula-currentline hover:bg-dracula-pink transition duration-300 w-3/4 text-white rounded p-2"
		>
			<svg
				class="w-5 h-5 text-dracula-pink group-hover:text-dracula-foreground transition duration-300"
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
	</section>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
		};
	},
	methods: {
		login() {
			const user = {
				token: 'yeet',
				username: this.username,
			};

			sessionStorage.setItem('user', JSON.stringify(user));

			console.log(user.username);
		},
	},
};
</script>

<style></style>
