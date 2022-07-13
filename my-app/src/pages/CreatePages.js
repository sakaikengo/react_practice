import React, { useState, useEffect } from "react";

import usePrefecturesAPI from "../hooks/api/usePrefecturesAPI";
import usePopulationAPI from "../hooks/api/usePopulationAPI";

import "../css/prefuctureCheckBox.css";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	ResponsiveContainer,
	Legend,
} from "recharts";

export default function CreatePages() {
	const [prefectures, setPrefectures] = usePrefecturesAPI();
	const [prefCode, setPrefCode] = useState(0);
	const [prefName, setPrefName] = useState("全国");
	const [populationCompositions, setPopulationCompositions] = usePopulationAPI(
		prefCode
	);
	// グラフ生成用のhooks
	const [prefCodeForGraph, setPrefCodeForGraph] = useState([]);

	// チェックボックスがチェックされたら動く
	const changePrefCode = (e) => {
		// チェックされたら配列に追加、チェックを外したら配列から削除
		if (e.target.checked) {
			setPrefCodeForGraph([...prefCodeForGraph, e.target.id]);
			setPrefCode(e.target.id);
			setPrefName(e.target.name);
		} else {
			setPrefCodeForGraph(
				prefCodeForGraph.filter(
					([prefCodeForGrapha, index]) => prefCodeForGrapha !== e.target.id
				)
			);
			setPrefCode(0);
			setPrefName("全国");
		}
	};

	return (
		<React.StrictMode>
			<h3>都道府県</h3>
			<form>
				<ul>
					{prefectures.map((prefecture) => (
						<li key={prefecture.prefCode} className="prefuctureCheckBox">
							<input
								type="checkbox"
								id={prefecture.prefCode}
								name={prefecture.prefName}
								onChange={changePrefCode}
							></input>
							{prefecture.prefName}
						</li>
					))}
				</ul>
			</form>
			<h3>グラフ</h3>
			<ResponsiveContainer
				width="80%"
				height="40%"
				minWidth={400}
				minHeight={400}
			>
				<LineChart width={400} height={400} data={populationCompositions}>
					<Line
						type="monotone"
						dataKey="value"
						stroke="#8884d8"
						name={prefName}
					/>
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
		</React.StrictMode>
	);
}
