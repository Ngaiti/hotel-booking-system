import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
	const loginImage =
		"https://cdn.kiwicollection.com/media/property/PR006778/xl/006778-01-Deluxe%20River%20Room-The%20Peninsula%20Shanghai.jpg?cb=1575478731";
	const [modalShow, setModalShow] = useState(null);
	const handleShowSignUp = () => setModalShow("signup");
	const handleShowLogin = () => setModalShow("login");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const auth = getAuth();
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	const [alertMessage, setAlertMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("danger");

	if (currentUser) navigate("/bookings");

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				username,
				password
			);
			console.log(res.user);
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!username || !password) {
			setAlertVariant("danger");
			setAlertMessage("Please enter your username and password.");
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, username, password);
		} catch (error) {
			console.error(error);
			setAlertVariant("danger");
			setAlertMessage("Invalid username or password!");
		}
	};

	const handleClose = () => setModalShow(null);

	return (
		<Row>
			<Col sm={6}>
				<Image src={loginImage} style={{ height: "120%" }} fluid />
			</Col>
			<Col sm={6} className="p-4">
				<i
					className="bi bi-building-fill"
					style={{ fontSize: 50, color: "dodgerblue" }}
				></i>

				<p
					className="mt-5"
					style={{ fontSize: 64, fontWeight: "bold" }}
				>
					Peninsula Shanghai
				</p>
				<h2
					className="my-5"
					style={{ fontSize: 31, fontWeight: "bold" }}
				>
					🛏️ Book Your Preferred Room Now!
				</h2>
				<Col sm={5} className="d-grid gap-2">
					<Button
						className="rounded-pill"
						variant="primary"
						onClick={handleShowLogin}
					>
						Login
					</Button>
					<p className="mt-4" style={{ fontWeight: "bold" }}>
						Don&apos;t have an account?
					</p>
					<Button
						className="rounded-pill"
						variant="outline-primary"
						onClick={handleShowSignUp}
					>
						Sign Up
					</Button>
					<p style={{ fontSize: "12px" }}>
						By signing up, you agree to the{" "}
						<span style={{ color: "dodgerblue", fontWeight: 600 }}>
							Terms of Service
						</span>{" "}
						and
						<span style={{ color: "dodgerblue", fontWeight: 600 }}>
							&nbsp;Privacy Policy
						</span>
						, including{" "}
						<span style={{ color: "dodgerblue", fontWeight: 600 }}>
							Cookie Use.
						</span>
					</p>
				</Col>
				<Modal
					show={modalShow !== null}
					onHide={handleClose}
					animation={false}
					centered
				>
					<Modal.Body>
						<i
							className="bi bi-person-fill"
							style={{
								fontSize: 80,
								color: "dodgerblue",
								display: "flex",
								justifyContent: "center",
							}}
						></i>

						<h2
							className="mb-4"
							style={{ fontWeight: "bold", textAlign: "center" }}
						>
							{modalShow === "signup" ? "Sign Up" : "Login"}
						</h2>

						<Form
							className="d-grid gap-2 px-5"
							onSubmit={
								modalShow === "signup"
									? handleSignUp
									: handleLogin
							}
						>
							{alertMessage && (
								<Alert variant={alertVariant}>
									{alertMessage}
								</Alert>
							)}
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<Form.Control
									onChange={(e) =>
										setUsername(e.target.value)
									}
									type="email"
									placeholder="Enter E-mail"
								/>
							</Form.Group>

							<Form.Group
								className="mb-3"
								controlId="formBasicPassword"
							>
								<Form.Control
									onChange={(e) =>
										setPassword(e.target.value)
									}
									type="password"
									placeholder="Enter Password"
								/>
							</Form.Group>

							<Button className="rounded-pill" type="submit">
								{modalShow === "signup" ? "Sign Up" : "Login"}
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</Col>
		</Row>
	);
}
