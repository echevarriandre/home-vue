<template>
	<section id="links-container" class="flex-col justify-center text-center sm:text-left flex flex-wrap items-center sm:items-start sm:flex-row">
		<template v-if="links">
			<div v-for="(category, i) in categories" :key="i" className="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div>
					<span className="text-dracula-purple">~/{{ category }}</span>
					<span className="text-dracula-green"> ></span>
				</div>
				<div className="pb-2">
					<div v-for="link in links[category]" :key="link.id">
						<a
							:href="link.url"
							class="text-gray-600 focus:outline-pink-dashed-text hover:text-dracula-yellow transition duration-300 cursor-pointer"
						>
							{{ link.name }}
						</a>
					</div>
				</div>
			</div>
		</template>

		<template v-else>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 4" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 6" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 3" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class=" my-2 animate-pulse">
					<div class="bg-dracula-purple rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 5" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
		</template>
	</section>
</template>

<script>
import LinksService from '../services/LinksService'
import { sortPropertyAlphabetically } from '../helpers/helpers'

export default {
	props: {
		needsToUpdate: Boolean,
	},
	emits: ['update:needsToUpdate'],
	data() {
		return {
			categories: [],
			links: null,
		}
	},
	mounted() {
		this.get()
	},
	methods: {
		get() {
			LinksService.all()
				.then((response) => {
					setTimeout(() => {
						this.$root.links = sortPropertyAlphabetically(response.data, 'name')
						this.handleLinks(response.data)
					}, 250)
				})
				.catch((error) => {
					console.log(error)
				})
		},
		handleLinks(rawLinks) {
			let categories = []
			let aux = {}
			rawLinks.forEach((link) => {
				// initialize categories
				if (aux[link.type] === undefined) {
					categories.push(link.type)
					aux[link.type] = []
				}

				aux[link.type].push(link)
			})

			const sortedLinks = this.sort(aux)

			this.categories = categories.sort()
			this.links = sortedLinks
		},
		sort(links) {
			for (const category of this.categories)
				links[category] = sortPropertyAlphabetically(links[category], 'name')

			return links
		},
	},
	watch: {
		needsToUpdate(newVal) {
			if (newVal == true) {
				this.get()
				this.$emit('update:needsToUpdate', false)
				this.handleLinks(this.$root.links)
			}
		},
	},
}
</script>
