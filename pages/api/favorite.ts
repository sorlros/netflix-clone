import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "../../lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method === "POST") {
			const { currentUser } = await serverAuth(req, res);

			const { movieId } = req.body;
			const { seriesId } = req.body;

			if (movieId) {
				const existingMovie = await prismadb.movie.findUnique({
					where: {
						id: movieId,
					},
				});
				if (!existingMovie) {
					throw new Error("Invalid ID");
				}
			} else if (seriesId) {
				const existingSeries = await prismadb.series.findUnique({
					where: {
						id: seriesId,
					},
				});
				if (!existingSeries) {
					throw new Error("Invalid ID");
				}
			}

			const user = await prismadb.user.update({
				where: {
					email: currentUser.email || "",
				},
				data: {
					favoriteIds: {
						push: movieId || seriesId,
					},
				},
			});

			return res.status(200).json(user);
		}

		if (req.method === "DELETE") {
			const { currentUser } = await serverAuth(req, res);
			const { movieId, seriesId } = req.query;

			const queryId = String(seriesId || movieId);

			// const table = req.query === "movieId" ? "movie" : "series";

			if (!seriesId) {
				const existingMovie = await prismadb.movie.findUnique({
					where: {
						id: queryId,
					},
				});

				if (!existingMovie) {
					throw new Error("Invalid ID");
				}
			} else if (!movieId) {
				const existingMovie = await prismadb.series.findUnique({
					where: {
						id: queryId,
					},
				});

				if (!existingMovie) {
					throw new Error("Invalid ID");
				}
			}

			const updatedFavoriteIds = without(currentUser.favoriteIds, queryId);

			const updatedUser = await prismadb.user.update({
				where: {
					email: currentUser.email || "",
				},
				data: {
					favoriteIds: updatedFavoriteIds,
				},
			});

			return res.status(200).json(updatedUser);
		}

		return res.status(405).end();
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}
}
