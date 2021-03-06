<template>
	<div @click.self="close" class="fixed h-screen w-screen top-0 bg-black bg-opacity-30 flex justify-center items-start">
		<div
			class="z-10 w-full md:w-auto m-2 max-h-3/4 top-20 relative bg-dracula-background overflow-y-auto rounded scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dracula-pink"
		>
			<div class="rounded flex flex-col">
				<div class="relative top-0 py-2 px-4 text-right flex justify-between">
					<div class="flex space-x-2">
						<button
							@click="close"
							class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline-pink-dashed flex justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								aria-hidden="true"
								class="w-4 h-4"
								viewBox="0 0 20 20"
							>
								<path
									d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15l-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152l2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
									fill="currentColor"
								></path>
							</svg>
						</button>
						<button @click="refresh" class="text-dracula-comment hover:text-dracula-yellow transition duration-300 focus-within:outline-pink-dashed">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								aria-hidden="true"
								class="h-4 w-4"
								viewBox="0 0 20 20"
							>
								<g fill="none">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M4 2a1 1 0 0 1 1 1v2.101a7.002 7.002 0 0 1 11.601 2.566a1 1 0 1 1-1.885.666A5.002 5.002 0 0 0 5.999 7H9a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm.008 9.057a1 1 0 0 1 1.276.61A5.002 5.002 0 0 0 14.001 13H11a1 1 0 1 1 0-2h5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-2.101a7.002 7.002 0 0 1-11.601-2.566a1 1 0 0 1 .61-1.276z"
										fill="currentColor"
									></path>
								</g>
							</svg>
						</button>
					</div>
					<button
						@click="creating = true"
						class="text-dracula-orange hover:text-dracula-yellow transition duration-300 focus:outline-pink-dashed flex justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							aria-hidden="true"
							class="w-4 h-4"
							viewBox="0 0 20 20"
						>
							<g fill="none">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm1-11a1 1 0 1 0-2 0v2H7a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7z"
									fill="currentColor"
								></path>
							</g>
						</svg>
					</button>
				</div>
				<transition name="easter">
					<LinksList v-if="!editing && !creating" :links="links" @editing="edit" />
					<LinkEdit v-else :link="selectedLink" />
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import LinksList from './LinksList'
import LinksService from '../../services/LinksService'
import LinkEdit from './LinkEdit'

export default {
	components: {
		LinksList,
		LinkEdit,
	},
	data() {
		return {
			editing: false,
			creating: false,
			selectedLink: {},
			links: [],
		}
	},
	mounted() {
		LinksService.all()
			.then((response) => {
				this.links = response.data.sort((a, b) => {
					let firstName = a.name.toUpperCase()
					let secondName = b.name.toUpperCase()

					if (firstName < secondName) return -1
					if (firstName > secondName) return 1

					return 0
				})
			})
			.catch((error) => {
				console.log(error)
			})
	},
	methods: {
		close() {
			this.creating = false
			this.editing = false
			this.selectedLink = {}

			this.$emit('close')
		},
		edit(link) {
			this.editing = true
			this.selectedLink = link
		}
	},
}
</script>

<style></style>
