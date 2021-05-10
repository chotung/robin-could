import { useState, ReactElement, useEffect } from "react";
// import Select from "react-select";
import Select, { ValueType } from "react-select";
import { useDispatch } from "react-redux";
import {
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import axios from "axios";
import {
  twelveDataQuote,
  twelveDataTimeSeries,
} from "../../clients/twelveData";

type TickerSearchOption = {
  label: string;
  instrumentName: string;
};

export default function SearchBar(): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [val, setValue] = useState("");
  // const [option, setOption] = useState<ValueType<OptionType, false>>(null);
  const dispatch = useDispatch();

  // const handleChange = (option: ValueType<OptionType, false>) => {
  // const handleChange = (option: any) => {
  // setOption(option);
  // dispatch;
  // dispatch(getPolygonAggregateStock(undefined, option?.value));
  // dispatch(getPolygonDailyOpenClose(option?.value));
  // dispatch(getPolygonTickerDetails(option?.value));
  // };
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const res = await axios(
      `https://api.twelvedata.com/symbol_search?symbol=${query}`
    );
    const items = res.data.data;
    const labels = items.map((item: any) => ({
      label: item.symbol,
      instrumentName: item.instrument_name,
    }));
    setOptions(labels);
    setIsLoading(false);
  };
  const filterBy = () => true;
  const handleChange = (e: any) => {
    // stock: TickerSearchOption[]
    if (e.key === "Enter") {
      console.log("Enter was press");
      dispatch(twelveDataTimeSeries(undefined, e.target.value));
      dispatch(twelveDataQuote(undefined, e.target.value));
    }
  };

  const handleSelectOption = (e: any) => {
    const selectedTickerSymbol = e.target.firstChild.data;
    dispatch(twelveDataTimeSeries(undefined, selectedTickerSymbol));
    dispatch(twelveDataQuote(undefined, selectedTickerSymbol));
  };
  return (
    <>
      <Container>
        <AsyncTypeahead
          filterBy={filterBy}
          id="async-example"
          isLoading={isLoading}
          minLength={1}
          onSearch={handleSearch}
          onKeyDown={handleChange}
          options={options}
          placeholder="Search for Company"
          renderMenuItemChildren={(option: any, props) => {
            return (
              <>
                <div onClick={handleSelectOption}>
                  <span>
                    {option.label}/{option.instrumentName}
                  </span>
                </div>
              </>
            );
          }}
          // renderMenuItemChildren={(option: any, props) => (
          // 	<>
          // 		<span>{option.label}/{option.instrumentName}</span>
          // 	</>
          // )}
        />
        {/* <FormGroup onSubmit={requestFromAPI}>
					<InputGroup>
						<Input
							type="search"
							name="search"
							id="exampleSearch"
							placeholder="Enter Ticker Symbol... "
						// onChange={handleChange}
						// value={option?.value}
						/>
						<InputGroupAddon onClick={requestFromAPI} addonType="append">
							<InputGroupText>
								<FontAwesomeIcon icon={["fas", "search"]} />
							</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				</FormGroup> */}
      </Container>
    </>
  );
}
