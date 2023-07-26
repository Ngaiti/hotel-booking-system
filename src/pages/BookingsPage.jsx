import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookingList from "../components/BookingList";
import { AuthContext } from "../components/AuthProvider";
import NavigationBar from "../components/NavigationBar";

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
			<NavigationBar handleLogout={handleLogout} />

			<Container className="text-center">
				<h1 className="my-5">List of Hotel Bookings</h1>
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
