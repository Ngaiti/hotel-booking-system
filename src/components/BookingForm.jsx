import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

function BookingForm({ onCreate }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [user_id, setUserId] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const newBooking = {
			title,
			description,
			date,
			time,
			phone_number,
			email,
			user_id,
		};
		onCreate(newBooking);
		setTitle("");
		setDescription("");
		setDate("");
		setTime("");
		setPhoneNumber("");
		setEmail("");
		setUserId("");
		navigate("/bookings");
	};

	return (
		<Container className="p-5">
			<Form className="d-grid gap-2 px-5" onSubmit={handleSubmit}>
				<h1 className="mb-4">New Booking</h1>
				<Form.Group controlId="title" className="mb-3">
					<Form.Control
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter Title"
						style={{ border: "1px solid black" }}
						required
					/>
				</Form.Group>
				<Form.Group controlId="description" className="mb-3">
					<Form.Control
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Enter Description"
						style={{ border: "1px solid black" }}
						required
					/>
				</Form.Group>
				<Form.Group controlId="date" className="mb-3">
					<Form.Control
						type="text"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						placeholder="Enter Date"
						style={{ border: "1px solid black" }}
						required
					/>
				</Form.Group>
				<Form.Group controlId="time" className="mb-3">
					<Form.Control
						type="text"
						value={time}
						onChange={(e) => setTime(e.target.value)}
						placeholder="Enter Time"
						style={{ border: "1px solid black" }}
						required
					/>
				</Form.Group>
				<Form.Group controlId="phone_number" className="mb-3">
					<Form.Control
						type="tel"
						value={phone_number}
						onChange={(e) => setPhoneNumber(e.target.value)}
						placeholder="Enter Phone Number"
						style={{ border: "1px solid black" }}
						required
					/>
				</Form.Group>
				<Form.Group controlId="email" className="mb-3">
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter E-mail"
						style={{ border: "1px solid black" }}
						required
					/>
				</Form.Group>
				<Form.Group controlId="user_id" className="mb-3">
					<Form.Control
						type="text"
						value={user_id}
						onChange={(e) => setUserId(e.target.value)}
						placeholder="Enter User ID"
						style={{ border: "1px solid black" }}
						required
					/>
				</Form.Group>
				<Button
					className="rounded-pill"
					style={{ fontSize: "17px" }}
					type="submit"
				>
					Submit
				</Button>
			</Form>
		</Container>
	);
}

export default BookingForm;
