import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import BookingList from "../components/BookingList";
import { AuthContext } from "../components/AuthProvider";

function BookingsPage({ bookings, onUpdate, onDelete }) {
	const auth = getAuth();
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser, navigate]);

	const handleLogout = () => {
		const confirmed = window.confirm("Are you sure you want to logout?");
		if (confirmed) {
			auth.signOut();
		}
	};

	return (
		<div className="bookings-page">
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

			<Container className="text-center">
				<h1 className="my-5">Hotel Booking System</h1>
				<BookingList
					bookings={bookings}
					onUpdate={onUpdate}
					onDelete={onDelete}
				/>
			</Container>
		</div>
	);
}

export default BookingsPage;
