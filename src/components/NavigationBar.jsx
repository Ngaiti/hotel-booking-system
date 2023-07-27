import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({ handleLogout }) {
	return (
		<Navbar bg="primary" variant="dark">
			<Container>
				<Navbar.Brand>
					<Link to="/bookings">
						<i
							className="bi bi-building-fill"
							style={{ fontSize: 30, color: "white" }}
						></i>
					</Link>
				</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<Link
						to="/weather"
						className="nav-link text-white me-5"
						style={{ fontSize: "17px" }}
					>
						<i className="bi bi-cloud-sun-fill"></i> Weather
					</Link>
					<Link
						to="/file-upload"
						className="nav-link text-white me-5"
						style={{ fontSize: "17px" }}
					>
						View Rooms
					</Link>
					<Link
						to="/add-booking"
						className="nav-link text-white me-5"
						style={{ fontSize: "17px" }}
					>
						Add Booking
					</Link>
					<Button variant="danger" onClick={handleLogout}>
						<i className="bi bi-box-arrow-right"></i>
					</Button>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavigationBar;
