import axios from "axios";

const axiosInstance = axios.create({
	baseURL: `${process.env.API_HOST}/3`,
	params: {
		api_key: process.env.API_KEY,
		language: "ko-KR",
	},
});

export default axiosInstance;
