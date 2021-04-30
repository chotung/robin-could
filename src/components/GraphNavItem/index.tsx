import moment from "moment";
import { adjustRange } from "../../helpers/formatData";
import { useDispatch, useSelector } from "react-redux";
import {
	setRange,
	stockSelector,
} from "../../reducers/stocks/StockSlice";
import { Button, NavItem } from "reactstrap";
import "./index.css";
import { ReactElement } from "react";
import { getPolygonAggregateStock } from "../../clients/polygon";
import { NavTabs } from "./types";

const GraphNavItem = (props: NavTabs): ReactElement => {
	const dispatch = useDispatch();
	const { searchStock } = useSelector(stockSelector);
	const { range, setActive, isActive } = props;

	const changeRange = (e: React.MouseEvent<Element, MouseEvent>) => {
		const target = e.target as HTMLElement;
		const range: string = target.innerText
		let fromDate, toDate, timeSpan, multiplier;
		switch (range) {
			case "1D":
				multiplier = 5;
				timeSpan = "minute";
				fromDate = moment().format("YYYY-MM-DD");
				toDate = moment().format("YYYY-MM-DD");
				adjustRange(
					multiplier,
					timeSpan,
					fromDate,
					toDate,
					range,
					dispatch,
					setRange,
					getPolygonAggregateStock,
					// getStockInAggragateRange,
					searchStock
				);
				setActive(0);
				break;

			case "5D":
				multiplier = 5;
				timeSpan = "minute";
				fromDate = moment().subtract(6, "days").format("YYYY-MM-DD");
				toDate = moment().format("YYYY-MM-DD");
				adjustRange(
					multiplier,
					timeSpan,
					fromDate,
					toDate,
					range,
					dispatch,
					setRange,
					getPolygonAggregateStock,
					// getStockInAggragateRange,
					searchStock
				);
				setActive(1);
				break;

			case "1M":
				multiplier = 8;
				timeSpan = "hour";
				fromDate = moment().subtract(5, "weeks").format("YYYY-MM-DD");
				toDate = moment().format("YYYY-MM-DD");
				adjustRange(
					multiplier,
					timeSpan,
					fromDate,
					toDate,
					range,
					dispatch,
					setRange,
					getPolygonAggregateStock,
					// getStockInAggragateRange,
					searchStock
				);
				setActive(2);
				break;

			case "3M":
				multiplier = 1;
				timeSpan = "day";
				fromDate = moment().subtract(4, "months").format("YYYY-MM-DD");
				toDate = moment().format("YYYY-MM-DD");
				adjustRange(
					multiplier,
					timeSpan,
					fromDate,
					toDate,
					range,
					dispatch,
					setRange,
					getPolygonAggregateStock,
					// getStockInAggragateRange,
					searchStock
				);
				setActive(3);
				break;

			case "1Y":
				multiplier = 1;
				timeSpan = "day";
				fromDate = moment().subtract(13, "months").format("YYYY-MM-DD");
				toDate = moment().format("YYYY-MM-DD");
				adjustRange(
					multiplier,
					timeSpan,
					fromDate,
					toDate,
					range,
					dispatch,
					setRange,
					getPolygonAggregateStock,
					// getStockInAggragateRange,
					searchStock
				);
				setActive(4);
				break;

			case "5Y":
				multiplier = 1;
				timeSpan = "day";
				fromDate = moment().subtract(6, "years").format("YYYY-MM-DD");
				toDate = moment().format("YYYY-MM-DD");
				adjustRange(
					multiplier,
					timeSpan,
					fromDate,
					toDate,
					range,
					dispatch,
					setRange,
					getPolygonAggregateStock,
					// getStockInAggragateRange,
					searchStock
				);
				setActive(5);
				break;

			case "YTD":
				multiplier = 1;
				timeSpan = "day";
				fromDate = moment().startOf("year").format("YYYY-MM-DD");
				toDate = moment().format("YYYY-MM-DD");
				adjustRange(
					multiplier,
					timeSpan,
					fromDate,
					toDate,
					range,
					dispatch,
					setRange,
					getPolygonAggregateStock,
					// getStockInAggragateRange,
					searchStock
				);
				setActive(6);
				break;

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
					(isActive ? "active-" : "") + (range ? "bullish" : "bearish")
				}
				onClick={(e) => changeRange(e)}
				color={isActive ? "success" : "link"}
			>
				{range}
			</Button>
		</NavItem>
	);
};

export default GraphNavItem;
