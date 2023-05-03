import React from "react";

import { isEmpty } from "lodash";
import SeriesCard from "./SeriesCard";

interface SeriesListProps {
	data: Record<string, any>[];
	title: string;
}

const SeriesList: React.FC<SeriesListProps> = ({ data, title }) => {
	if (isEmpty(data)) {
		return null;
	}

	return (
		<>
			<div>Series</div>
			<div className="grid grid-cols-4 gaps-10 mt-20">
				{data.map((series) => (
					<SeriesCard key={series.id} data={series} />
				))}
			</div>
		</>
	);
};

export default SeriesList;
