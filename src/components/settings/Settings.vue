<template>
	<div @click.self="close" class="z-10 fixed h-screen w-screen top-0 bg-black bg-opacity-30 flex justify-center items-start">
		<div
			class="md:w-auto m-2 max-h-3/4 top-20 relative bg-dracula-background overflow-y-auto rounded scrollbar-thin scrollbar-track-transparent scrollbar-thumb-dracula-pink"
		>
			<div class="rounded flex flex-col">
				<section id="modal-navbar" class="relative top-0 py-2 px-4 text-right flex justify-between">
					<div class="flex space-x-2">
						<button
							v-if="!editing && !creating"
							@click="close"
							class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline-pink-dashed flex justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								aria-hidden="true"
								class="w-5 h-5"
								viewBox="0 0 20 20"
							>
								<path
									d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15l-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152l2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
									fill="currentColor"
								></path>
							</svg>
						</button>
						<button
							v-else
							@click="back"
							class="text-dracula-red hover:text-dracula-yellow transition duration-300 focus:outline-pink-dashed flex justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								aria-hidden="true"
								class="w-5 h-5"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 20 20"
							>
								<g fill="none">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M7.707 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 9H17a1 1 0 1 1 0 2H5.414l2.293 2.293a1 1 0 0 1 0 1.414z"
										fill="currentColor"
									></path>
								</g>
							</svg>
						</button>
						<button
							v-if="!editing && !creating"
							@click="refresh"
							class="text-dracula-comment hover:text-dracula-yellow transition duration-300 focus-within:outline-pink-dashed"
						>
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
						v-if="!editing && !creating"
						@click="creating = true"
						class="text-dracula-orange hover:text-dracula-yellow transition duration-300 focus:outline-pink-dashed flex justify-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							aria-hidden="true"
							class="h-5 w-5"
							viewBox="0 0 20 20"
						>
							<g fill="none">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"
									fill="currentColor"
								></path>
							</g>
						</svg>
					</button>
				</section>
				<section class="flex justify-center flex-col">
					<transition name="fade" mode="out-in">
						<LinkEdit v-if="editing || creating" :link="selectedLink" @complete="back" />
						<LinksList v-else @edit="edit" @refresh="refresh" />
					</transition>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import LinksList from './LinksList'
import LinksService from '../../services/LinksService'
import LinkEdit from './LinkEdit'
import { sortPropertyAlphabetically } from '../../helpers/helpers'

export default {
	components: {
		LinksList,
		LinkEdit,
	},
	emits: ['refresh', 'close'],
	data() {
		return {
			editing: false,
			creating: false,
			selectedLink: {},
		}
	},
	mounted() {
		this.get()
	},
	methods: {
		get() {
			LinksService.all()
				.then((response) => {
					this.$root.links = sortPropertyAlphabetically(response.data, 'name')
				})
				.catch((error) => {
					console.log(error)
				})
		},
		close() {
			this.creating = false
			this.editing = false
			this.selectedLink = {}

			this.$emit('close')
		},
		edit(link) {
			this.editing = true
			this.selectedLink = link
		},
		back() {
			this.editing = false
			this.creating = false
			this.selectedLink = {}
			this.refresh()
		},
		refresh() {
			this.get()
			this.$emit('refresh')
		},
	},
}
</script>

<style></style>
