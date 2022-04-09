import { Link, LinkDto } from "@/@types";
import LinksService from "@/services/LinksService";
import { defineStore } from "pinia";

export const useLinksStore = defineStore({
  id: "links",
  state: () => ({
    links: [] as Link[],
    fetching: false,
  }),
  actions: {
    async get(): Promise<void> {
      this.fetching = true;
      LinksService.all()
        .then((response) => {
          this.links = response.data;
          this.fetching = false;
        })
        .catch(() => {
          console.error("Error fetching links!");
        });
    },
    async create(link: LinkDto): Promise<void> {
      LinksService.create(link)
        .then((response) => {
          this.links.push(response.data);
        })
        .catch(() => {
          console.error("Error creating link!");
        });
    },
    async edit(linkId: number, link: LinkDto): Promise<void> {
      LinksService.update(linkId, link)
        .then((response) => {
          const index = this.links.findIndex((l) => l.id === linkId);
          this.links.splice(index, 1, response.data);
        })
        .catch(() => {
          console.error("Error updating link!");
        });
    },
    async remove(linkId: number): Promise<void> {
      LinksService.delete(linkId)
        .then(() => {
          const index = this.links.findIndex((l) => l.id === linkId);
          this.links.splice(index, 1);
        })
        .catch(() => {
          console.error("Error deleting link!");
        });
    },
  },
  getters: {
    getCategories: (state): string[] => {
      const categories: string[] = [];
      if (!state.links) return [];

      state.links.forEach((l) => {
        if (!categories.includes(l.type)) {
          categories.push(l.type);
        }
      });

      return categories.sort();
    },
    getSortedLinksByCategory: (state): Record<string, Link[]> => {
      const links: Record<string, Link[]> = {};
      if (!state.links) return links;

      state.links.forEach((l) => {
        if (links[l.type] === undefined) {
          links[l.type] = [];
        }

        links[l.type].push(l);
      });

      return links;
    },
    filterLinksByValue:
      (state) =>
      (searchValue: string): Link[] =>
        state.links.filter((l) => l.name.includes(searchValue)),
  },
});
