import "./index.css";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { stockSelector } from "../../reducers/stocks/StockSlice";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Spinner } from "reactstrap";
import StockHeader from "../../components/StockHeader";
import StockDetails from "../../components/StockDetails";
import StockGraphNav from "../../components/StockGraphNav";
import { formatData } from "../../helpers/formatData";
import { configureGraph } from "../../helpers/graphHelper";
import {
	twelveDataTimeSeries,
	twelveDataQuote,
} from "../../clients/twelveData";
const StockSummary: React.FC = () => {
	const dispatch = useDispatch();
	const {
		TwelveDataStockTimeSeries,
		TwelveDataQuoteState,
		loading,
		netGainLoss,
	} = useSelector(stockSelector);

	useEffect(() => {
		// dispatch(twelveDataTimeSeries());
		// dispatch(twelveDataQuote());
	}, [dispatch]);

	const createGraph = () => {
		const canvas = document.createElement("canvas");
		const { data, options } = configureGraph(
			canvas,
			formatData,
			TwelveDataStockTimeSeries,
			false,
			TwelveDataStockTimeSeries.meta.interval,
			netGainLoss
		);

		return (
			<Container className="graph p-0">
				<Line data={data} options={options} />
			</Container>
		);
	};

	const { symbol, name, exchange, currency, datetime, open, high, close, low, volume, previous_close, change, percent_change, average_volume, fifty_two_week } = TwelveDataQuoteState

	return (
		<>
			<section
				id="stock__summary"
				className={`d-flex flex-column ${loading === false ? "" : "justify-content-center"
					} flex-grow-1 flex-shrink-1`}
			>
				{TwelveDataStockTimeSeries?.status !== "" ? (
					<StockHeader stock={TwelveDataStockTimeSeries} />
				) : null}
				{TwelveDataStockTimeSeries?.status !== "" ? (
					<>
						{createGraph()}
						<StockGraphNav />
					</>
				) : (
					<Spinner className="align-self-center">Loading...</Spinner>
				)}
				<section className="about mt-5 py-3">
					<h3>About</h3>
				</section>
				<section className="description py-3">
					{/* {daily && tickerDetails ? tickerDetails.description : null} */}
				</section>
				<section className="stock-information-group container">
					{TwelveDataQuoteState ? null : 'something'}
					<Row>
						<StockDetails
							sd1={name}
							sd2={exchange}
							label1="Name"
							label2="Exchange"
						/>
						<StockDetails
							sd1={open}
							sd2={close}
							label1="Open"
							label2="Close"
						/>
						<StockDetails
							sd1={high}
							sd2={low}
							label1="High"
							label2="Low"
						/>
						<StockDetails
							sd1={volume}
							sd2={average_volume}
							label1="Volume"
							label2="Average Volume"
						/>
					</Row>
				</section>
			</section>
		</>
	);
};

export default StockSummary;
