import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";

function BookingItem({ booking, onUpdate, onDelete }) {
	const [isEditMode, setIsEditMode] = useState(false);
	const [updatedBooking, setUpdatedBooking] = useState(booking);
	const [loading, setLoading] = useState(false);

	const handleEdit = () => {
		setIsEditMode(true);
	};

	const handleSave = async () => {
		setLoading(true);

		try {
			await onUpdate(updatedBooking);
		} finally {
			setLoading(false);
			setIsEditMode(false);
		}
	};

	const handleCancel = () => {
		setIsEditMode(false);
		setUpdatedBooking(booking);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedBooking((prevBooking) => ({
			...prevBooking,
			[name]: value,
		}));
	};

	const handleDelete = async () => {
		setLoading(true);

		try {
			await onDelete(booking.id);
		} finally {
			setLoading(false);
		}
	};

	return (
		<tr>
			{isEditMode ? (
				<>
					<td>
						<Form.Control
							type="text"
							name="title"
							value={updatedBooking.title}
							onChange={handleChange}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							name="description"
							value={updatedBooking.description}
							onChange={handleChange}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							name="date"
							value={updatedBooking.date}
							onChange={handleChange}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							name="time"
							value={updatedBooking.time}
							onChange={handleChange}
						/>
					</td>
					<td>
						<Form.Control
							type="tel"
							name="phone_number"
							value={updatedBooking.phone_number}
							onChange={handleChange}
						/>
					</td>
					<td>
						<Form.Control
							type="email"
							name="email"
							value={updatedBooking.email}
							onChange={handleChange}
						/>
					</td>
					<td>
						<Form.Control
							type="text"
							name="user_id"
							value={updatedBooking.user_id}
							onChange={handleChange}
						/>
					</td>
					<td>
						<Button
							onClick={handleSave}
							disabled={loading}
							variant="outline-primary"
						>
							{loading ? (
								<Spinner
									animation="border"
									variant="primary"
									size="sm"
								/>
							) : (
								<i className="bi bi-save"></i>
							)}
						</Button>
						<Button
							onClick={handleCancel}
							variant="outline-dark"
							className="ms-3"
						>
							<i className="bi bi-arrow-return-left"></i>
						</Button>
					</td>
				</>
			) : (
				<>
					<td>{booking.title}</td>
					<td>{booking.description}</td>
					<td>{booking.date}</td>
					<td>{booking.time}</td>
					<td>{booking.phone_number}</td>
					<td>{booking.email}</td>
					<td>{booking.user_id}</td>
					<td style={{ width: "13%" }}>
						<Button onClick={handleEdit} variant="outline-primary">
							<i className="bi bi-pencil-square"></i>
						</Button>
						<Button
							onClick={handleDelete}
							disabled={loading}
							variant="outline-danger"
							className="ms-3"
						>
							{loading ? (
								<Spinner
									animation="border"
									variant="danger"
									size="sm"
								/>
							) : (
								<i className="bi bi-trash"></i>
							)}
						</Button>
					</td>
				</>
			)}
		</tr>
	);
}

export default BookingItem;
