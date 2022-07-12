import React, { useState, useEffect } from "react";

import axios from "axios";

import "../css/prefuctureCheckBox.css";

export default function CreatePrefecturesList() {
	const [prefectures, setPrefectures] = useState([]);
	const [prefCode, setPrefCode] = useState(0);

	const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
	const x_api_key = "5EzK33skK2zOAhFGmdNFor4mAgaPRGoarzhXf0R4";
	const getPrefCode = (e) => {
		console.log("checked:", e.target.id, e.target.checked);
		setPrefCode(e.target.id);
	};
	// 都道府県リストの取得
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

	return (
		<form>
			<ul>
				{prefectures.map((prefecture) => (
					<li key={prefecture.prefCode} className="prefuctureCheckBox">
						<input
							type="checkbox"
							id={prefecture.prefCode}
							name={prefecture.prefCode}
							onChange={getPrefCode}
						></input>
						{prefecture.prefName}
					</li>
				))}
			</ul>
		</form>
	);
}
