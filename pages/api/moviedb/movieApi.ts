import axiosInstance from ".";

export const latestMovieApi = axiosInstance.get("/movie/latest");
