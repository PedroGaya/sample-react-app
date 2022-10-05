import { useState } from "react";
import "./App.css";

const fireball_damage = async () => {
	const request = {
		jsonrpc: "2.0",
		method: "generateIntegers",
		params: {
			apiKey: "c27335c1-c35a-45f6-ada7-ee41b0da07b0",
			n: 8,
			min: 1,
			max: 6,
			replacement: true,
		},
		id: 42,
	};

	const response = await fetch("https://api.random.org/json-rpc/4/invoke", {
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
		method: "POST",
	});

	const data = await response.json();

	return data;
};

function App() {
	const [data, setData] = useState("Roll for damage!");

	return (
		<div className="App">
			<header className="App-header">
				<p>{data}</p>
				<button
					onClick={() => {
						fireball_damage().then((res) => {
							const rolls: number[] = res.result.random.data;
							const dmg = rolls.reduce((acc, val) => {
								return acc + val;
							}, 0);

							console.log(rolls);
							setData(`${dmg} damage`);
						});
					}}
				>
					Fireball!
				</button>
			</header>
		</div>
	);
}

export default App;
