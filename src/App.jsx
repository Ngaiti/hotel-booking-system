import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import BookingsPage from "./pages/BookingsPage";
import AddBookingPage from "./pages/AddBookingPage";
import WeatherPage from "./pages/WeatherPage";
import FileUploadPage from "./pages/FileUploadPage";
import { AuthProvider } from "./components/AuthProvider";
import {
	fetchBookings,
	createBooking,
	updateBooking,
	deleteBooking,
} from "./bookingService";

function App() {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		loadBookings();
	}, []);

	const loadBookings = async () => {
		try {
			const data = await fetchBookings();
			setBookings(data);
		} catch (error) {
			console.error("Error loading bookings:", error);
		}
	};

	const handleCreate = async (newBooking) => {
		const createdBooking = await createBooking(newBooking);
		if (createdBooking) {
			setBookings((prevBookings) => [
				...prevBookings,
				createdBooking.data,
			]);
		}
	};

	const handleUpdate = async (updatedBooking) => {
		const updated = await updateBooking(updatedBooking);
		if (updated) {
			setBookings((prevBookings) =>
				prevBookings.map((booking) =>
					booking.id === updatedBooking.id ? updatedBooking : booking
				)
			);
		}
	};

	const handleDelete = async (id) => {
		const deleted = await deleteBooking(id);
		if (deleted) {
			setBookings((prevBookings) =>
				prevBookings.filter((booking) => booking.id !== id)
			);
		}
	};

	return (
		<AuthProvider>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route
							path="/bookings"
							element={
								<BookingsPage
									bookings={bookings}
									onUpdate={handleUpdate}
									onDelete={handleDelete}
								/>
							}
						/>
						<Route
							path="/add-booking"
							element={<AddBookingPage onCreate={handleCreate} />}
						/>
						<Route
							path="/file-upload"
							element={<FileUploadPage />}
						/>
						<Route path="/weather" element={<WeatherPage />} />
						<Route path="/login" element={<AuthPage />} />
						<Route path="*" element={<AuthPage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</AuthProvider>
	);
}

export default App;
