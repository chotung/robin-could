import { adjustRange } from "../../helpers/formatData";
import { useDispatch, useSelector } from "react-redux";
import {
	setInterval,
	setNetGainLoss,
	stockSelector,
} from "../../reducers/stocks/StockSlice";
import { Button, NavItem } from "reactstrap";
import "./index.css";
import { ReactElement } from "react";
import { NavTabs } from "./types";
import {
	twelveDataQuote,
	twelveDataTimeSeries,
} from "../../clients/twelveData";
import { calculateNetDiff } from "../../helpers/calculateNetDiff";

const GraphNavItem = (props: NavTabs): ReactElement => {
	const dispatch = useDispatch();
	const { TwelveDataStockTimeSeries, netGainLoss } = useSelector(stockSelector);
	const { range, setActive, isActive } = props;
	const { values } = TwelveDataStockTimeSeries;
	const first = parseFloat(values[values.length - 1].open);
	const latestPrice = parseFloat(values[0].open);
	const gainLoss = calculateNetDiff(latestPrice, first);
	const net = parseFloat(netGainLoss);
	const changeRange = (e: React.MouseEvent<Element, MouseEvent>) => {
		const target = e.target as HTMLElement;
		const range: string = target.innerText;
		// let fromDate, toDate, timeSpan, multiplier;
		let interval, outputSize;
		switch (range) {
			// case "1D":
			// 	multiplier = 5;
			// 	timeSpan = "minute";
			// 	fromDate = moment().format("YYYY-MM-DD");
			// 	toDate = moment().format("YYYY-MM-DD");
			// 	adjustRange(
			// 		multiplier,
			// 		timeSpan,
			// 		fromDate,
			// 		toDate,
			// 		range,
			// 		dispatch,
			// 		setInterval,
			// 		twelveDataTimeSeries,
			// 		// getStockInAggragateRange,
			// 		searchStock
			// 	);
			case "1D":
				dispatch(setNetGainLoss(gainLoss));
				interval = "1min";
				outputSize = "390";
				adjustRange(
					interval,
					outputSize,
					dispatch,
					setInterval,
					twelveDataTimeSeries,
					twelveDataQuote,
					TwelveDataStockTimeSeries.meta.symbol
				);
				setActive(0);
				break;

			case "5D":
				dispatch(setNetGainLoss(gainLoss));
				interval = "5min";
				outputSize = "390";
				adjustRange(
					interval,
					outputSize,
					dispatch,
					setInterval,
					twelveDataTimeSeries,
					twelveDataQuote,
					TwelveDataStockTimeSeries.meta.symbol
				);
				setActive(1);
				break;

			case "1M":
				interval = "1h";
				outputSize = "731";
				adjustRange(
					interval,
					outputSize,
					dispatch,
					setInterval,
					twelveDataTimeSeries,
					twelveDataQuote,
					TwelveDataStockTimeSeries.meta.symbol
				);
				setActive(2);
				break;

			case "3M":
				interval = "1h";
				outputSize = "2192";
				adjustRange(
					interval,
					outputSize,
					dispatch,
					setInterval,
					twelveDataTimeSeries,
					twelveDataQuote,
					TwelveDataStockTimeSeries.meta.symbol
				);
				setActive(3);
				break;

			case "1Y":
				interval = "1day";
				outputSize = "365";
				adjustRange(
					interval,
					outputSize,
					dispatch,
					setInterval,
					twelveDataTimeSeries,
					twelveDataQuote,
					TwelveDataStockTimeSeries.meta.symbol
				);
				setActive(4);
				break;
			// If I had the paid version of the api
			// case "5Y":
			// 	interval = "5min"
			// 	outputSize = "390"
			// 	adjustRange(
			// 		interval,
			// 		outputSize,
			// 		range,
			// 		dispatch,
			// 		setInterval,
			// 		twelveDataTimeSeries,
			// 		// getStockInAggragateRange,
			// 		searchStock
			// 	);
			// 	setActive(5);
			// 	break;

			// case "YTD":
			// 	interval = "5min"
			// 	outputSize = "390"
			// 	adjustRange(
			// 		interval,
			// 		outputSize,
			// 		range,
			// 		dispatch,
			// 		setInterval,
			// 		twelveDataTimeSeries,
			// 		// getStockInAggragateRange,
			// 		searchStock
			// 	);
			// 	setActive(6);
			// 	break;

			default:
				break;
		}
	};
	// Move the state up so when you change companies you stay on the same range
	// ex: MSFT 1M => AAPL 1M instead of current MSFT 1M => AAPL 1D
	return (
		<NavItem>
			<Button
				className={
					(isActive ? "active-" : "") + (net > 0 ? "bullish" : "bearish")
				}
				onClick={(e) => changeRange(e)}
				color={isActive ? "" : "link"}
			>
				{range}
			</Button>
		</NavItem>
	);
};

export default GraphNavItem;
