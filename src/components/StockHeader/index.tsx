import { useDispatch } from "react-redux";
import { Jumbotron } from "reactstrap";
import { calculateNetDiff } from "../../helpers/calculateNetDiff";
import { setNetGainLoss } from "../../reducers/stocks/StockSlice";
import './index.css'

interface Props {
  stock: any;
}


export default function StockHeader(props: Props) {
	const dispatch = useDispatch()
  const { results, ticker } = props.stock;
  const lastestPrice = results[0].o;
  const secondLastestPrice = results[results.length - 2].o;
  const gainLoss = calculateNetDiff(lastestPrice, secondLastestPrice);
	dispatch(setNetGainLoss(gainLoss))
		// (parseFloat(gainLoss) < 0 ? 'bearish' : 'bullish')
  return (
    <section>
			<Jumbotron fluid className={"text-left py-1 m-0 stock__jumbo"} >
				<div className={"stock__header__group " }>
          <h1 className="ticker__symbol">{ticker}</h1>
          <h2 id="price">Price: {lastestPrice} </h2>
          <p id="percentage__change">{gainLoss}%</p>
        </div>
      </Jumbotron>
    </section>
  );
}
