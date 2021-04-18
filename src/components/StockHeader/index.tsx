
interface Props {
	ticker:string
}

export default function StockHeader(props:Props) {
	return (
		<header>
			<h1>{props.ticker}</h1>
		</header>
	)
}
