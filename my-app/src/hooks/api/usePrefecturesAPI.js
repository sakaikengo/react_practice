import { useEffect, useState } from "react";

import axios from "axios";

// 都道府県一覧取得
export default function usePrefecturesAPI() {
	const [prefectures, setPrefectures] = useState([]);
	const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
	const x_api_key = "5EzK33skK2zOAhFGmdNFor4mAgaPRGoarzhXf0R4";

	useEffect(() => {
		axios
			.get(url, {
				headers: {
					"X-API-KEY": x_api_key,
				},
			})
			.then((res) => {
				if (res.data.result !== undefined) {
					setPrefectures(res.data.result);
				}
			});
	}, []);

	return [prefectures, setPrefectures];
}
