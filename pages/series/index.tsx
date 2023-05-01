import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useSeries from "../../hooks/useSeries";

export async function getServerSideProps(context: NextPageContext) {
	const session = getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function Series() {
	const { data: series = [] } = useSeries();
}
