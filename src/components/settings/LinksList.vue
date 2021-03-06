<template>
	<div class="w-full mb-2">
		<table v-if="$root.links.length > 0" class="min-w-full leading-normal">
			<thead class="sticky top-0 bg-dracula-currentline text-dracula-foreground">
				<tr>
					<th class="px-5 py-3 text-center text-xs uppercase tracking-wider">
						name
					</th>
					<th class="px-5 py-3 text-center text-xs uppercase tracking-wider hidden sm:table-cell">
						url
					</th>
					<th class="px-5 py-3 text-center text-xs uppercase tracking-wider">
						type
					</th>
					<th class="px-5 py-3 text-center text-xs uppercase tracking-wider">
						actions
					</th>
				</tr>
			</thead>
			<tbody class="text-dracula-comment">
				<tr
					v-for="link in $root.links"
					:key="link.id"
					:ref="
						(el) => {
							if (el) tableRows[link.id] = el
						}
					"
					class="transition duration-300"
				>
					<td class="px-5 py-1 text-sm">
						<div class="flex items-center">
							<span class="whitespace-no-wrap">
								{{ link.name }}
							</span>
						</div>
					</td>
					<td class="px-5 py-1 text-sm hidden sm:table-cell">
						<a
							:href="link.url"
							target="_blank"
							class="whitespace-no-wrap hover:text-dracula-yellow transition duration-300 text-dracula-cyan focus:outline-pink-dashed"
							>{{ link.url }}</a
						>
					</td>
					<td class="px-5 py-1 text-sm ">
						<span class="whitespace-no-wrap">
							{{ link.type }}
						</span>
					</td>
					<td class="mx-5 my-5 text-center">
						<button
							@click="edit(link)"
							class="text-xl focus:outline-pink-dashed hover:text-dracula-yellow transition duration-300 inline-block mx-1 my-1 text-dracula-comment"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								aria-hidden="true"
								width="1em"
								height="1em"
								viewBox="0 0 20 20"
							>
								<g fill="none">
									<path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-.793.793l-2.828-2.828l.793-.793z" fill="currentColor"></path>
									<path d="M11.379 5.793L3 14.172V17h2.828l8.38-8.379l-2.83-2.828z" fill="currentColor"></path>
								</g>
							</svg>
						</button>
						<button
							@click="remove(link)"
							class="text-xl focus:outline-pink-dashed hover:text-dracula-yellow transition duration-300 inline-table-cell mx-1 my-1 text-dracula-red"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								aria-hidden="true"
								width="1em"
								height="1em"
								viewBox="0 0 20 20"
							>
								<g fill="none">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M9 2a1 1 0 0 0-.894.553L7.382 4H4a1 1 0 0 0 0 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a1 1 0 1 0 0-2h-3.382l-.724-1.447A1 1 0 0 0 11 2H9zM7 8a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V8zm5-1a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1z"
										fill="currentColor"
									></path>
								</g>
							</svg>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import LinksService from '../../services/LinksService'
export default {
	emits: ['refresh', 'edit'],
	data() {
		return {
			tableRows: {},
		}
	},
	methods: {
		edit(link) {
			this.$emit('edit', link)
		},
		remove(link) {
			LinksService.delete(link.id)
				.then(() => {
					this.$emit('refresh')
				})
				.catch(() => {
					this.tableRows[link.id].classList.add('bg-dracula-red', 'text-dracula-foreground')
					setTimeout(() => {
						this.tableRows[link.id].classList.remove('bg-dracula-red', 'text-dracula-foreground')
					}, 1000)
				})
		},
		setTableRows(id, event) {
			this.tableRows[id] = event
		},
	},
}
</script>

<style></style>
