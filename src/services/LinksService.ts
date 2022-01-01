import { Link, LinkDto } from "@/@types";
import { homeApi } from "../axios.config";

const API_LINKS_PATH = `/links/`;

class LinkService {
  all() {
    return homeApi.get<Link[]>(API_LINKS_PATH);
  }

  find(id: number) {
    return homeApi.get<Link>(API_LINKS_PATH + id);
  }

  create(data: LinkDto) {
    return homeApi.post<Link>(API_LINKS_PATH, data);
  }

  update(id: number, data: LinkDto) {
    return homeApi.put<Link>(API_LINKS_PATH + id, data);
  }

  delete(id: number) {
    return homeApi.delete<void>(API_LINKS_PATH + id);
  }
}

export default new LinkService();
