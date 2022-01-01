import { LoginCredentials, User } from "@/@types";
import { homeApi } from "@/axios.config";

const API_AUTH_URL = "/login";

class AuthService {
  login(data: LoginCredentials) {
    return homeApi.post<User>(API_AUTH_URL, data);
  }

  logout(): void {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
