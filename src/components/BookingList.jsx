import { Table } from "react-bootstrap";
import BookingItem from "./BookingItem";

function BookingList({ bookings, onUpdate, onDelete }) {
	return (
		<Table bordered hover responsive>
			<thead className="table-primary">
				<tr>
					<th>Title</th>
					<th>Description</th>
					<th>Date</th>
					<th>Time</th>
					<th>Phone Number</th>
					<th>E-mail</th>
					<th>User ID</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody className="table-light">
				{bookings.map((booking) => (
					<BookingItem
						key={booking.id}
						booking={booking}
						onUpdate={onUpdate}
						onDelete={onDelete}
					/>
				))}
			</tbody>
		</Table>
	);
}

export default BookingList;
