import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { AuthContext } from "../components/AuthProvider";

function AddBookingPage({ onCreate }) {
	const auth = getAuth();
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	if (!currentUser) navigate("/login");

	const handleLogout = () => {
		const confirmed = window.confirm("Are you sure you want to logout?");
		if (confirmed) {
			auth.signOut();
		}
	};

	return (
		<div className="add-booking-page">
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="/bookings">
						<i
							className="bi bi-building-fill"
							style={{ fontSize: 30, color: "white" }}
						></i>
					</Navbar.Brand>
					<Navbar.Collapse className="justify-content-end">
						<Link
							to="/add-booking"
							className="nav-link text-white me-4"
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

			<Container className="mt-3 text-center">
				<BookingForm onCreate={onCreate} />
			</Container>
		</div>
	);
}

export default AddBookingPage;
