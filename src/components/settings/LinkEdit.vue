<template>
	<div class="m-4 flex flex-col w-96" @keypress.enter="confirm">
		<p v-if="isCreating" class="text-dracula-foreground px-2 text-center">Create</p>
		<p v-else class="text-dracula-foreground px-2 text-center">Edit</p>
		<div class="flex flex-col">
			<label class="text-dracula-comment p-2">name</label>
			<input
				v-model="name"
				type="text"
				:class="{ 'bg-dracula-red': error }"
				class="shadow caret-input transition duration-300 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline-pink-dashed"
			/>
		</div>
		<div class="flex flex-col">
			<label class="text-dracula-comment p-2">url</label>
			<input
				v-model="url"
				type="text"
				:class="{ 'bg-dracula-red': error }"
				class="shadow caret-input transition duration-300 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline-pink-dashed"
			/>
		</div>
		<div class="flex flex-col">
			<label class="text-dracula-comment p-2">type</label>
			<input
				v-model="type"
				type="text"
				:class="{ 'bg-dracula-red': error }"
				class="shadow caret-input transition duration-300 p-2 text-dracula-foreground bg-dracula-currentline rounded focus:outline-pink-dashed"
			/>
		</div>

		<button
			@click="confirm"
			:class="{ 'bg-dracula-red': error }"
			class="group bg-dracula-currentline p-2 flex justify-center shadow mt-9 focus:outline-pink-dashed rounded hover:bg-dracula-yellow transition duration-300"
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
	</div>
</template>

<script>
import LinksService from '../../services/LinksService'
export default {
	props: {
		link: Object,
	},
	emits: ['complete'],
	data() {
		return {
			name: '',
			url: '',
			type: '',
			error: false,
		}
	},
	mounted() {
		if (!this.isCreating) {
			this.name = this.link.name
			this.url = this.link.url
			this.type = this.link.type
		}
	},
	methods: {
		confirm() {
			const data = {
				name: this.name,
				url: this.url,
				type: this.type,
			}

			let promise
			if (this.isCreating) promise = LinksService.create(data)
			else promise = LinksService.update(this.link.id, data)

			promise
				.then(() => {
					this.$emit('complete')
				})
				.catch(() => {
					this.error = true
					setTimeout(() => {
						this.error = false
					}, 1000);
				})
		},
	},
	computed: {
		isCreating() {
			if (Object.keys(this.link).length <= 0) return true

			return false
		},
	},
}
</script>

<style></style>
