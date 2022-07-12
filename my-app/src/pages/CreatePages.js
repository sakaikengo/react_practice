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
	const [populationCompositions, setPopulationCompositions] = usePopulationAPI(
		prefCode
	);

	// チェックボックスがチェックされたら動く
	const changePrefCode = (e) => {
		if (e.target.checked) {
			setPrefCode(e.target.id);
		} else {
			setPrefCode(0);
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
								name={prefecture.prefCode}
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
		</React.StrictMode>
	);
}
