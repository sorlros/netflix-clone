import useSWR from "swr";
import fetcher from "../lib/fetcher";

const useSeries = () => {
	const { data, isLoading, error } = useSWR("/api/series", fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export default useSeries;
