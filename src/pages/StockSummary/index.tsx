import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { stockSelector, getStock } from '../../reducers/stocks/StockSlice'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import StockDetails from '../../components/StockDetails'
import { Container, Row } from 'reactstrap';

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
		const formattedStock = stock.results.map((stockObj:any) => {
			const time = moment(stockObj.t).format('h:mm:ss a')
			return { open: stockObj.o, time }
		})

		formattedStock.sort((a:any, b:any) => {
			return a.time - b.time
		})
		// rename the variables
		const openPriceArr = formattedStock.map((s:any) => s.open)
		// format time
		const timeArr = formattedStock.map((t:any) => t.time)
		const data = {
			labels: timeArr,
			datasets: [{
				label: stock.ticker,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: openPriceArr,
			}]
		}

		const options = {
			responsive: true
		}


		return (
			<Container>
				<Line data={data} options={options} />
			</Container>
		)
	}

	return (
		<>
			<div>
				{stock.status ? createGraph() : null }	
				<section className="stock-information-group container">
					<Row>
						<StockDetails />		
						<StockDetails />		
					</Row>
				</section>
			</div>
		</>
	)
}
