import moment from "moment";
import { adjustRange } from "../../helpers/formatData";
import { useDispatch } from "react-redux";
import {
  getStockInAggragateRange,
  setRange,
} from "../../reducers/stocks/StockSlice";
import { Button, NavItem } from "reactstrap";

export default function GraphNavigation(props: any) {
  const dispatch = useDispatch();

  const { range, setActive, isActive } = props;

  const changeRange = (e: any) => {
    const range: string = e.target.innerText;
    let fromDate, toDate, timeSpan, multiplier;
    switch (range) {
      case "1D":
        multiplier = 5;
        timeSpan = "minute";
        fromDate = moment().subtract(1, "day").format("YYYY-MM-DD");
        toDate = moment().format("YYYY-MM-DD");
        adjustRange(
          multiplier,
          timeSpan,
          fromDate,
          toDate,
          range,
          dispatch,
          setRange,
          getStockInAggragateRange
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
          getStockInAggragateRange
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
          getStockInAggragateRange
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
          getStockInAggragateRange
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
          getStockInAggragateRange
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
          getStockInAggragateRange
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
          getStockInAggragateRange
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
        onClick={(e) => changeRange(e)}
        color={isActive ? "success" : "link"}
      >
        {range}
      </Button>
    </NavItem>
  );
}
