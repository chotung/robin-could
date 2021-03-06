import React, { useState, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import {
	twelveDataQuote,
	twelveDataTimeSeries,
} from "../../clients/twelveData";
import { company } from "./searchSymbol";

type TickerSearchOption = {
	label: string;
	instrumentName: string;
};

export default function SearchBar(): ReactElement {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const dispatch = useDispatch();

	const handleSearch = async (query: string) => {
		setIsLoading(true);
		const res = await axios(
			`https://api.twelvedata.com/symbol_search?symbol=${query}`
		);
		const items = res.data.data;
		const labels = items.map((item: company) => ({
			label: item.symbol,
			instrumentName: item.instrument_name,
		}));
		setOptions(labels);
		setIsLoading(false);
	};
	const filterBy = () => true;

	const handleChange = (e: any) => {
		if (e.key === "Enter") {
			console.log("Enter was press");
			dispatch(twelveDataTimeSeries(undefined, e.currentTarget.value));
			dispatch(twelveDataQuote(undefined, e.currentTarget.value));
		}
	};

	const handleSelectOption = (e: any) => {
		const selectedTickerSymbol = e.currentTarget.firstChild?.data;
		dispatch(twelveDataTimeSeries(undefined, selectedTickerSymbol));
		dispatch(twelveDataQuote(undefined, selectedTickerSymbol));
	};
	return (
		<>
			<AsyncTypeahead
				filterBy={filterBy}
				id="async-search"
				isLoading={isLoading}
				minLength={1}
				onSearch={handleSearch}
				onKeyDown={handleChange}
				options={options}
				placeholder="Search for Company"
				renderMenuItemChildren={(option: TickerSearchOption) => {
					return (
						<>
							<div onClick={handleSelectOption}>
								<span>
									{option.label}/{option.instrumentName}
								</span>
							</div>
						</>
					);
				}}
			/>
		</>
	);
}
