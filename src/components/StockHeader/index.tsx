import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Jumbotron } from "reactstrap";
import { calculateNetDiff } from "../../helpers/calculateNetDiff";
import { setNetGainLoss } from "../../reducers/stocks/StockSlice";
import './index.css'

interface Props {
  stock: any;
}


const StockHeader = (props: Props) : ReactElement =>{
	const dispatch = useDispatch()
  const { results, ticker } = props.stock;
  const first = results[0].o;
  const latestPrice = results[results.length - 1].o;
  const gainLoss = calculateNetDiff(latestPrice, first);
	dispatch(setNetGainLoss(gainLoss))
  return (
    <section>
			<Jumbotron fluid className={"text-left py-1 m-0 stock__jumbo"} >
				<div className={"stock__header__group " }>
          <h1 className="ticker__symbol">{ticker}</h1>
          <h2 id="price">${latestPrice} </h2>
          <p id="percentage__change">${(latestPrice - first).toFixed(2)} ({gainLoss}%)</p>
        </div>
      </Jumbotron>
    </section>
  );
}


export default StockHeader