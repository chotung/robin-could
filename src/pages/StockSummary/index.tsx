import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { stockSelector, getStock } from '../../reducers/stocks/StockSlice'
import { useSelector, useDispatch } from 'react-redux'
// import * as Moment from 'moment';
// import { extendMoment } from 'moment-range';

// const moment = extendMoment(Moment);

export default function StockSummary() {
	const dispatch = useDispatch()
	const { stock, loading, errors } = useSelector(stockSelector)
	console.log(stock);
	useEffect(() => {
		dispatch(getStock())
	},[dispatch])

	const data = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: stock.ticker,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [0, 10, 5, 2, 20, 30, 45],
		}]
	}
	const options = {
		responsive:true
	}

	return (
		<>
			<div>
				{stock.success ? <Line data={data} options={options} /> : null }
				
			</div>
		</>
	)
}
