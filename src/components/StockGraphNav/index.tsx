/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Nav } from "reactstrap";
import GraphNavigation from "../GraphNavItem";
import { useState } from "react";
import "./index.css";

export default function StockGraphNav() {
  const [active, setActive] = useState(0);

  const createButtons = () => {
    const ranges = ["1D", "5D", "1M", "3M", "1Y"];
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
      <Nav className=" pt-3 pb-0 px-0 button__group">{createButtons()}</Nav>
    </nav>
  );
}
