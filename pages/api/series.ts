import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		await serverAuth(req, res);

		const series = await prismadb.series.findMany();

		return res.status(200).json(series);
	} catch (error) {
		console.log(error);
		return res.status(200).end();
	}
}
