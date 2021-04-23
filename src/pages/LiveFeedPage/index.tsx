import { useEffect } from "react";
import { Container } from "reactstrap";
import { Line } from "react-chartjs-2";
import { configureGraph } from "../../helpers/graphHelper";
import { formatData } from "../../helpers/formatData";
// Wanted to implement however the websocket gave me unauthorized despite saying I was unautheticated
// export default class LiveFeedPage extends Component {
import { stockSelector, getLiveFeed } from "../../reducers/stocks/StockSlice";
import { useSelector, useDispatch } from "react-redux";

const LiveFeedPage = () => {
  const dispatch = useDispatch();
  const { liveFeed } = useSelector(stockSelector);
  useEffect(() => {
    dispatch(getLiveFeed());

    // return () => {
    // }
  }, []);

  const createGraph = () => {
    if (liveFeed !== undefined) {
      const canvas = document.createElement("canvas");
      const { data, options } = configureGraph(
        canvas,
        formatData,
        liveFeed,
        true,
        undefined,
        undefined
      );

      return (
        <Container className="graph p-0">
          <Line data={data} options={options} />
        </Container>
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">{createGraph()}</header>
    </div>
  );
};

export default LiveFeedPage;
