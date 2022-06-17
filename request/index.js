import { apiService } from "../services";

export const getPosts = async () => {
	const response = await apiService.get("/posts");
	return response;
}

export const addPosts = async (post) => {
	const payload = {
		title: 'foo',
		body: post,
		userId: 1,
	}
	const response = await apiService.post({url: "/posts", payload});
	return response;
}

export const sendUserInfo = async (payload) => {
	console.log(payload);
	const response = await apiService.post({url: "/v1/users_connect", payload});
	return response;
}