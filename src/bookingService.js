const API_URL =
	"https://booking-system-api-ngenchangwang.sigma-school-full-stack.repl.co/bookings";

export const fetchBookings = async () => {
	try {
		const response = await fetch(API_URL);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error("Error fetching bookings:", response.statusText);
			return [];
		}
	} catch (error) {
		console.error("Error fetching bookings:", error);
		return [];
	}
};

export const createBooking = async (newBooking) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newBooking),
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			console.error("Error creating booking:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Error creating booking:", error);
		return null;
	}
};

export const updateBooking = async (updatedBooking) => {
	try {
		const response = await fetch(`${API_URL}/${updatedBooking.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedBooking),
		});
		if (response.ok) {
			return updatedBooking;
		} else {
			console.error("Error updating booking:", response.statusText);
			return null;
		}
	} catch (error) {
		console.error("Error updating booking:", error);
		return null;
	}
};

export const deleteBooking = async (id) => {
	try {
		const confirmed = window.confirm(
			"Are you sure you want to delete this booking?"
		);
		if (!confirmed) {
			return false;
		}

		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			return true;
		} else {
			console.error("Error deleting booking:", response.statusText);
			return false;
		}
	} catch (error) {
		console.error("Error deleting booking:", error);
		return false;
	}
};
