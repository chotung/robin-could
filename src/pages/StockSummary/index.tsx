import "./index.css";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  stockSelector,
  getStockInAggragateRange,
  getFinancials,
  getDailyOpenClose,
	getTickerDetails,
} from "../../reducers/stocks/StockSlice";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Spinner } from "reactstrap";
import StockHeader from "../../components/StockHeader";
import StockDetails from "../../components/StockDetails";
import StockGraphNav from "../../components/StockGraphNav";
import { formatData } from "../../helpers/formatData";
import { configureGraph } from "../../helpers/graphHelper";

const StockSummary: React.FC = () => {
  const dispatch = useDispatch();
  const { tickerDetails, stock, currentRange, daily, loading, netGainLoss } = useSelector(stockSelector);

  useEffect(() => {
    dispatch(getStockInAggragateRange());
    dispatch(getDailyOpenClose());
    dispatch(getFinancials())
		dispatch(getTickerDetails())
  }, [dispatch]);
	
  const createGraph = () => {
    const canvas = document.createElement("canvas");
    const { data, options } = configureGraph(
      canvas,
      formatData,
      stock,
			false,
      currentRange,
			netGainLoss,
    );

    return (
      <Container className="graph p-0">
        <Line data={data} options={options} />
      </Container>
    );
  };

  return (
    <>
      <section
        id="stock__summary"
        className={`d-flex flex-column ${
          loading === false ? "" : "justify-content-center"
        } flex-grow-1 flex-shrink-1`}
      >
        {stock?.status ? <StockHeader stock={stock} /> : null}
        {stock?.status ? (
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
					{daily && tickerDetails ? tickerDetails.description : null}
				</section>
        <section className="stock-information-group container">
					{daily && tickerDetails? (
            <Row>
							<StockDetails sd1={tickerDetails.ceo} sd2={daily.open} label1="CEO" label2="Open" />
							<StockDetails sd1={tickerDetails.employees} sd2={daily.close} label1="Employees" label2="Close"  />
							<StockDetails sd1={tickerDetails.hq_address} sd2={daily.high} label1="Headquarters" label2="High" />
							<StockDetails sd1={(tickerDetails.marketcap / 100000000000).toFixed(2) + "T"} sd2={daily.low} label1="Market Cap" label2="Low"/>
            </Row>
          ) : null}
        </section>
      </section>
    </>
  );
}

export default StockSummary
