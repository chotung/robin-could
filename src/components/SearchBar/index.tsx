import { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  getDailyOpenClose,
  getStockInAggragateRange,
  getTickerDetails,
  stockSelector,
} from "../../reducers/stocks/StockSlice";
import { Container } from "reactstrap";

export default function SearchBar() {
  const options = [
    { value: "AAPL", label: "AAPL/Apple" },
    { value: "MSFT", label: "MSFT/Microsoft Corporation" },
    { value: "GOOG", label: "GOOG/Alphabet Inc." },
  ];
  const { stock } = useSelector(stockSelector);

  const [option, setOption] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (option: any) => {
    setOption(option);
    dispatch(getStockInAggragateRange(undefined, option.value));
    dispatch(getDailyOpenClose(undefined, option.value));
    dispatch(getTickerDetails(undefined, option.value));
  };

  return (
    <>
      <Container>
        <Select
          placeholder="Search"
          value={option}
          onChange={handleChange}
          options={options}
        />
      </Container>
    </>
  );
}
