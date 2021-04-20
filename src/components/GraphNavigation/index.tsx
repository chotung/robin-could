import moment from "moment";
import { adjustRange } from "../../helpers/formatData";
import { useDispatch, useSelector } from "react-redux";
import {
  getStockInAggragateRange,
  setRange,
	stockSelector,
} from "../../reducers/stocks/StockSlice";
import { Button, NavItem } from "reactstrap";
import "./index.css"

export default function GraphNavigation(props: any) {
  const dispatch = useDispatch();
	const { searchStock } = useSelector(stockSelector);
  const { range, setActive, isActive } = props;
	
  const changeRange = (e: any) => {
    const range: string = e.target.innerText;
    let fromDate, toDate, timeSpan, multiplier;
    switch (range) {
      case "1D":
        multiplier = 5;
        timeSpan = "minute";
        fromDate = moment().format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange,
					searchStock
        );
        setActive(0);
        break;

      case "5D":
        multiplier = 5;
        timeSpan = "minute";
        fromDate = moment().subtract(6, "days").format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange,
					searchStock
        );
        setActive(1);
        break;

      case "1M":
        multiplier = 1;
        timeSpan = "week";
        fromDate = moment().subtract(5, "weeks").format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange,
					searchStock
        );
        setActive(2);
        break;

      case "3M":
        multiplier = 1;
        timeSpan = "month";
        fromDate = moment().subtract(4, "months").format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange,
					searchStock
        );
        setActive(3);
        break;

      case "1Y":
        multiplier = 1;
        timeSpan = "month";
        fromDate = moment().subtract(13, "months").format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange,
					searchStock
        );
        setActive(4);
        break;

      case "3Y":
        multiplier = 1;
        timeSpan = "year";
        fromDate = moment().subtract(4, "years").format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange,
					searchStock
        );
        setActive(5);
        break;

      case "YTD":
        multiplier = 1;
        timeSpan = "month";
        fromDate = moment().startOf("year").format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange,
					searchStock
        );
        setActive(6);
        break;

      default:
        break;
    }
  };

  return (
    <NavItem>
      <Button
				className={isActive ? "active": ""}
        onClick={(e) => changeRange(e)}
        color={isActive ? "success" : "link"}
      >
        {range}
      </Button>
    </NavItem>
  );
}