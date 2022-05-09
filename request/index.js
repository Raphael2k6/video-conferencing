import { apiService } from "../services";

export const getPosts = async () => {
	const response = await apiService.get("/posts");
	return response;
}