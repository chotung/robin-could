import { useState, ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import Select from "react-select";
import Select, { ValueType } from 'react-select';
import { useDispatch } from "react-redux";
import { Container, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from "reactstrap";
import {
	getPolygonAggregateStock,
	getPolygonDailyOpenClose,
	getPolygonTickerDetails,
} from "../../clients/polygon";

type OptionType = {
	value: string;
	label: string;
}
const options: OptionType[] = [
	{ value: "AAPL", label: "AAPL/Apple" },
	{ value: "MSFT", label: "MSFT/Microsoft Corporation" },
	{ value: "GOOG", label: "GOOG/Alphabet Inc." },
];

export default function SearchBar(): ReactElement {
	const [option, setOption] = useState<ValueType<OptionType, false>>(null);
	const dispatch = useDispatch();

	const handleChange = (option: ValueType<OptionType, false>) => {
		setOption(option);
		dispatch(getPolygonAggregateStock(undefined, option?.value));
		dispatch(getPolygonDailyOpenClose(option?.value));
		dispatch(getPolygonTickerDetails(option?.value));
	};

	// const filterStocks = (inputValue: string) => {
	// 	return options.filter((option) => {
	// 		if (option.value.toUpperCase().includes(inputValue.toUpperCase())) return option
	// 	})
	// }


	// const promiseOptions = (inputValue: string) =>
	// 	new Promise<any>(resolve => {
	// 		setTimeout(() => {

	// 			resolve(filterStocks(inputValue))
	// 		}, 1000);
	// 	}).then(res => {
	// 		if (res.length === 0) {
	// 			setTimeout(() => {
	// 				const tickerSymbol = inputValue.toUpperCase()
	// 				dispatch(getPolygonAggregateStock(undefined, tickerSymbol));
	// 				// dispatch(getPolygonDailyOpenClose(tickerSymbol));
	// 				// dispatch(getPolygonTickerDetails(tickerSymbol));
	// 			}, 3000)
	// 		}
	// 	});

	return (
		<>
			<Container>
				<FormGroup>
					<InputGroup>
						<Input
							type="search"
							name="search"
							id="exampleSearch"
							placeholder="Enter Ticker Symbol... " />

						<InputGroupAddon addonType="append">
							<InputGroupText>
								<FontAwesomeIcon icon={["fas", "search"]} />
							</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				</FormGroup>

			</Container>
		</>
	);
}
