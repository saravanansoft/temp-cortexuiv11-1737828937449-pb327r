import { environment } from "../config/environment";
import { authStore } from "./authService";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${environment.apiBaseUrl}`;
  }

  private async getHeaders(): Promise<Headers> {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const token = await authStore.getIdToken();
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "API request failed");
    }
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }
}

export const apiService = new ApiService();
