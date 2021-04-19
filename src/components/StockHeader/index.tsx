import { Jumbotron } from "reactstrap"

interface Props {
	ticker:string
}

export default function StockHeader(props:Props) {
	return (
		<section>
			<Jumbotron fluid>
				color tab
				<h1>{props.ticker}</h1>
				PRice 10000
				price change %
			</Jumbotron>
		</section>
	)
}
