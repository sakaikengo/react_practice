import React, { useState, useEffect } from "react";

import axios from "axios";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Legend,
} from "recharts";

export default function CreatePrefecturesList(props) {
	// 配列のuseState
	const [populationCompositions, setPopulationCompositions] = useState([]);

	const url =
		"https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
		props.prefCode;
	const x_api_key = "5EzK33skK2zOAhFGmdNFor4mAgaPRGoarzhXf0R4";

	// checkboxで選択された都道府県の人口構成APIを取得
	// 第二引数にpropsを指定し変化するごとに呼び出し
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
	}, [props]);

	// グラフの作成
	return (
		<ResponsiveContainer
			width="80%"
			height="40%"
			minWidth={400}
			minHeight={400}
		>
			<LineChart width={400} height={400} data={populationCompositions}>
				<Line type="monotone" dataKey="value" stroke="#8884d8" />
				<Legend
					align="right"
					verticalAlign="left"
					height={40}
					iconType="plainline"
				/>
				<XAxis
					dataKey="year"
					label={{ value: "年度", position: "insideRight", dx: 50 }}
					padding={{ left: 30, right: 30 }}
				/>
				<YAxis
					dataKey="value"
					label={{ value: "人口数", position: "insideTopLeft", dy: -50 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
