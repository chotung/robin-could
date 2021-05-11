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
import SearchBar from "../../components/SearchBar";
const StockSummary: React.FC = () => {
	const dispatch = useDispatch();
	const {
		TwelveDataStockTimeSeries,
		TwelveDataQuoteState,
		loading,
		netGainLoss,
	} = useSelector(stockSelector);

	useEffect(() => {
		dispatch(twelveDataTimeSeries());
		dispatch(twelveDataQuote());
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

	const {
		name,
		exchange,
		open,
		high,
		close,
		low,
		volume,
		average_volume,
	} = TwelveDataQuoteState;
	return (
		<>
			{TwelveDataStockTimeSeries?.status === "ok" && TwelveDataQuoteState ? (
				<>
					<header className="jumbotron jumbotron-fluid m-0 py-3 px-0">
						<SearchBar />
					</header>
					<div className="wrapper ">
						<section
							id="stock__summary"
							className={`d-flex flex-column ${loading === false ? "" : "justify-content-center"
								} flex-grow-1 flex-shrink-1`}
						>
							<StockHeader stock={TwelveDataStockTimeSeries} />
							<>
								{createGraph()}
								<StockGraphNav />
							</>
							<section className="about mt-5 py-3">
								{TwelveDataQuoteState ? <h3>About</h3> : null}
							</section>
							{/* Don't have descriptions with twelveData */}
							{/* <section className="description py-3"> */}
							{/* {daily && tickerDetails ? tickerDetails.description : null} */}
							{/* </section> */}
							<section className="stock-information-group container py-3">
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
					</div>
				</>
			) : (
				<span className="loading">
					<Spinner className="align-self-center"></Spinner>
					<span className="align-self-center">
						Loading... Please Wait 1 minute and Refresh
          </span>
				</span>
			)}
		</>
	);
};

export default StockSummary;
