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
import SearchBar from "../../components/SearchBar";
import {
  twelveDataTimeSeries,
  twelveDataQuote,
} from "../../clients/twelveData";
import { getPolygonTickerDetails } from "../../clients/polygon";
import { polygonStockSelector } from "../../reducers/polygonStock/polygonStockSlice";

const StockSummary: React.FC = () => {
  const dispatch = useDispatch();
  const {
    TwelveDataStockTimeSeries,
    TwelveDataQuoteState,
    loading,
    netGainLoss,
  } = useSelector(stockSelector);
  const { polygonStockDetails } = useSelector(polygonStockSelector);
  useEffect(() => {
    dispatch(twelveDataTimeSeries());
    dispatch(twelveDataQuote());
    dispatch(getPolygonTickerDetails(TwelveDataStockTimeSeries.meta.symbol));
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
              className={`d-flex flex-column ${
                loading === false ? "" : "justify-content-center"
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
              <section className="description py-3">
                {polygonStockDetails ? polygonStockDetails.description : null}
              </section>
              {polygonStockDetails.symbol ? (
                <section className="stock-information-group container py-3">
                  <Row>
                    <StockDetails
                      sd1={polygonStockDetails.ceo}
                      sd2={polygonStockDetails.phone}
                      label1="CEO"
                      label2="Phone Number"
                    />
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
                    <StockDetails
                      sd1={polygonStockDetails.hq_address}
                      sd2={polygonStockDetails.employees.toString()}
                      label1="Address"
                      label2="Employees"
                    />
                    <StockDetails
                      sd1={polygonStockDetails.marketcap.toString()}
                      sd2={polygonStockDetails.url}
                      label1="Market Cap"
                      label2="Website"
                    />
                  </Row>
                </section>
              ) : null}
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
