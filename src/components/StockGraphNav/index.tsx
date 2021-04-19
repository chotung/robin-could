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
}
