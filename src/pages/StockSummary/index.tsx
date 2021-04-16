import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { stockSelector, getStock } from '../../reducers/stocks/StockSlice'
import { useSelector, useDispatch } from 'react-redux'
// import * as Moment from 'moment';
// import { extendMoment } from 'moment-range';
// const moment = extendMoment(Moment);

interface OpenPrice {
	v: number;
	vw: number;
	o: number;
	c: number;
	h: number;
	l: number;
	t: number;
	n: number;
}


export default function StockSummary() {
	const dispatch = useDispatch()
	const { stock, loading, errors } = useSelector(stockSelector)
	useEffect(() => {
		dispatch(getStock())

	},[dispatch])
	
	const createGraph = () => {
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
			responsive: true
		}

		// if(stock.results.length !== 0) {
			const openPrices = stock.results.map((openPrice:any) => {
				return { open: openPrice.o }
			})
			console.log(openPrices);
		// }


		return (
			<Line data={data} options={options} />
		)
	}

	return (
		<>
			<div>
				{stock.status ? createGraph() : null }			
			</div>
		</>
	)
}
