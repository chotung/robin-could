<<<<<<< HEAD
import { Nav, NavItem, NavLink } from "reactstrap"

export default function StockGraphNav() {
	return (
		<nav >
			<Nav>
				<NavItem>
					<NavLink >1D</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={true}>5D</NavLink>
				</NavItem>
				<NavItem>
					<NavLink>1M</NavLink>
				</NavItem>
				<NavItem>
					<NavLink>3M</NavLink>
				</NavItem>
				<NavItem>
					<NavLink>1Y</NavLink>
				</NavItem>
				<NavItem>
					<NavLink>3Y</NavLink>
				</NavItem>
				<NavItem>
					<NavLink>YTD</NavLink>
				</NavItem>
			</Nav>
		</nav>
	)
=======
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Nav } from "reactstrap";
import GraphNavigation from "../GraphNavItem";
import { useState } from "react";
import "./index.css";

export default function StockGraphNav() {
  const [active, setActive] = useState(0);

  const createButtons = () => {
    const ranges = ["1D", "5D", "1M", "3M", "1Y", "5Y", "YTD"];
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
>>>>>>> feature/charts
}
