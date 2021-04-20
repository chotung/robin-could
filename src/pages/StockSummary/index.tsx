import "./index.css";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  stockSelector,
  getStockInAggragateRange,
  getFinancials,
  getDailyOpenClose,
} from "../../reducers/stocks/StockSlice";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col, Spinner } from "reactstrap";
import StockHeader from "../../components/StockHeader";
import StockDetails from "../../components/StockDetails";
import StockGraphNav from "../../components/StockGraphNav";
import { formatData } from "../../helpers/formatData";
import { configureGraph } from "../../helpers/graphHelper";

export default function StockSummary() {
  const dispatch = useDispatch();
  const { stock, currentRange, daily, loading, netGainLoss } = useSelector(stockSelector);
  useEffect(() => {
    dispatch(getStockInAggragateRange());
    dispatch(getDailyOpenClose());
    // dispatch(getFinancials())
  }, [dispatch]);

  const createGraph = () => {
    const canvas = document.createElement("canvas");
    const { data, options } = configureGraph(
      canvas,
      formatData,
      stock,
      currentRange,
			netGainLoss
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
        {stock.status ? <StockHeader stock={stock} /> : null}
        {stock.status ? (
          <>
            <StockGraphNav />
            {createGraph()}
          </>
        ) : (
          <Spinner className="align-self-center">Loading...</Spinner>
        )}
        <section className="stock-information-group container">
          {daily ? (
            <Row>
              <Col className="col-12 flex-row py-1 p-0">
                <Card className="flex-md-row stock-card">
                  <StockDetails details={daily} dir={"left"} />
                  <StockDetails details={daily} dir={"right"} />
                </Card>
              </Col>
            </Row>
          ) : null}
        </section>
      </section>
    </>
  );
}
