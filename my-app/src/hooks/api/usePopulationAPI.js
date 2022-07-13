import { useState, useEffect } from "react";

import axios from "axios";

export default function usePopulationAPI(prefCode) {
	// 配列のuseState
	const [populationCompositions, setPopulationCompositions] = useState([]);

	const url =
		"https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
		prefCode;
	const x_api_key = "5EzK33skK2zOAhFGmdNFor4mAgaPRGoarzhXf0R4";

	useEffect(() => {
		axios
			.get(url, {
				headers: {
					"X-API-KEY": x_api_key,
				},
			})
			.then((res) => {
				if (res.data.statusCode !== "429") {
					setPopulationCompositions(res.data.result.data[0].data);
				}
			});
	}, [prefCode]);

	return [populationCompositions, setPopulationCompositions];
}
