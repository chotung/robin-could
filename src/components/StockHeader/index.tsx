import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Jumbotron } from "reactstrap";
import { calculateNetDiff } from "../../helpers/calculateNetDiff";
import {
	setNetGainLoss,
} from "../../reducers/stocks/StockSlice";
import "./index.css";
import {
	TwelveDataStockTimeSeries
} from "../../reducers/stocks/types"

type StockHeaderProps = {
	stock: TwelveDataStockTimeSeries;
}

const StockHeader = (props: StockHeaderProps): ReactElement => {
	const dispatch = useDispatch();
	const { values, meta } = props.stock
	const { symbol } = meta
	const first = parseFloat(values[values.length - 1].open);
	const latestPrice = parseFloat(values[0].open);
	const gainLoss = calculateNetDiff(latestPrice, first);
	// console.log(first, latestPrice, gainLoss);
	useEffect(() => {
		dispatch(setNetGainLoss(gainLoss));

	}, [dispatch])

	return (
		<section>
			<Jumbotron fluid className={"text-left py-1 m-0 stock__jumbo"}>
				<div className={"stock__header__group "}>
					<h1 className="ticker__symbol">{symbol.toUpperCase()}</h1>
					<h2 id="price">
						$
            {latestPrice}
					</h2>
					<p id="percentage__change">
						${(latestPrice - first).toFixed(2)} ({gainLoss}%)
					</p>
				</div>
			</Jumbotron>
		</section>
	);
};

export default StockHeader;
