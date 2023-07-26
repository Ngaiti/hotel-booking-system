import { getAuth } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { AuthContext } from "../components/AuthProvider";
import NavigationBar from "../components/NavigationBar";

function AddBookingPage({ onCreate }) {
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
		<div className="add-booking-page">
			<NavigationBar handleLogout={handleLogout} />

			<Container className="mt-3 text-center">
				<BookingForm onCreate={onCreate} />
			</Container>
		</div>
	);
}

export default AddBookingPage;
