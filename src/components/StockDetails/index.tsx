import { Col } from "reactstrap";
import "./index.css";

interface StockLabelAndInfo {
	sd1?: string;
	sd2?: string;
	sd3?: string;
	sd4?: string;
	label1?: string;
	label2?: string;
	label3?: string;
	label4?: string;
}

const StockDetails: React.FC<StockLabelAndInfo> = (
	props: StockLabelAndInfo
) => {
	const { sd1, sd2, sd3, sd4, label1, label2, label3, label4 } = props;
	const renderCols = () => {
		return (
			<>
				{sd1 ? (
					<div className="stock__detail">
						<p className={"stock__label " + label1}>{label1}</p>
						<p className={label1 + " value"}>{sd1}</p>
					</div>
				) : null}
				{sd2 ? (
					<div className="stock__detail">
						<p className={"stock__label " + label2}>{label2}</p>
						<p className={label2 + " value"}>{sd2}</p>
					</div>
				) : null}
				{sd3 ? (
					<div className="stock__detail">
						<p className={"stock__label " + label3}>{label3}</p>
						<p className={label3 + " value"}>{sd3}</p>
					</div>
				) : null}
				{sd4 ? (
					<div className="stock__detail">
						<p className={"stock__label " + label4}>{label4}</p>
						<p className={label4 + " value"}>{sd4}</p>
					</div>
				) : null}
			</>
		);
	};

	return (
		<Col className="p-0 col-12 col-md-3 d-flex flex-row flex-md-column justify-content-between">
			{renderCols()}
		</Col>
	);
};

export default StockDetails;
