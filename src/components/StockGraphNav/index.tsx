import { Nav } from "reactstrap";

import "./index.css";
import GraphNavigation from "../GraphNavigation";
// import { formatData } from "../../helpers/formatData";
// import { configureGraph } from "../../helpers/graphHelper";
import { useState } from "react";
export default function StockGraphNav() {
  const [active, setActive] = useState(0);

  const createButtons = () => {
    const ranges = ["1D", "5D", "1M", "3M", "1Y", "3Y", "YTD"];
    return ranges.map((range, i) => {
      return (
        <GraphNavigation
          key={range}
          range={range}
          setActive={setActive}
          isActive={active === i}
        />
      );
    });
  };

  return (
    <nav className="stock__graph__nav">
      <Nav className="py-3 px-0">{createButtons()}</Nav>
    </nav>
  );
}
