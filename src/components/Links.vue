<template>
	<section id="links-container" class="md:flex">
		<template v-if="links">
			<div v-for="(category, i) in categories" :key="i" className="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="font-bold">
					<span className="text-dracula-pink">~/{{ category }}</span>
					<span className="text-green-500"> ></span>
				</div>
				<div className="pb-2">
					<div v-for="link in links[category]" :key="link.id">
						<a
							:href="link.url"
							class="text-gray-600 font-bold focus:outline-green-dashed-text hover:text-dracula-red transition duration-200 cursor-pointer"
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
					<div class="bg-dracula-pink rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 4" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-dracula-pink rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 6" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class="my-2 animate-pulse">
					<div class="bg-dracula-pink rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 3" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
			<div class="bg-dracula-currentline shadow py-2 px-5 m-3 h-full rounded">
				<div class=" my-2 animate-pulse">
					<div class="bg-dracula-pink rounded w-28 mb-2 px-10 py-3 text-center" />
					<div v-for="n in 5" :key="n" class="bg-gray-700 rounded w-28 mb-2 px-10 py-3 text-center" />
				</div>
			</div>
		</template>
	</section>
</template>

<script>
import LinksService from '../services/LinksService'

export default {
	data() {
		return {
			links: null,
			categories: [],
		}
	},
	mounted() {
		LinksService.all()
			.then((response) => {
				setTimeout(() => {
					this.handleLinks(response.data)
				}, 500)
			})
			.catch((error) => {
				console.log(error)
			})
	},
	methods: {
		handleLinks(rawLinks) {
			let aux = {}
			for (let i = 0; i < rawLinks.length; i++) {
				const link = rawLinks[i]
				if (aux[link.type] === undefined) {
					this.categories.push(link.type)
					aux[link.type] = []
				}

				aux[link.type].push(link)
			}

			this.links = aux
		},
	},
}
</script>
