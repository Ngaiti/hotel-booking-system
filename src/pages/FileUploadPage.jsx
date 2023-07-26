import { getAuth } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	listAll,
} from "@firebase/storage";
import { storage } from "../firebase";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import NavigationBar from "../components/NavigationBar";

const FileUploadPage = () => {
	const [progrss, setProgrss] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState(null);
	const [url, setUrl] = useState(null);
	const [pastUrls, setPastUrls] = useState([]);

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

	const onFileUpload = () => {
		if (!file) return;
		setIsLoading(true);
		const storageRef = ref(storage, `/files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				var progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgrss(progress);
			},
			(err) => {
				console.log(err);
				setIsLoading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setUrl(url);
					setIsLoading(false);
				});
			}
		);
	};

	const onFileChange = (e) => {
		setFile(e.target.files[0]);
		e.preventDefault();
	};

	const loadPastImages = async () => {
		const storageRef = ref(storage, "/files");
		const imagesList = await listAll(storageRef);
		const urls = await Promise.all(
			imagesList.items.map(async (item) => await getDownloadURL(item))
		);
		setPastUrls(urls);
	};

	useEffect(() => {
		loadPastImages();
	}, []);

	return (
		<>
			<NavigationBar handleLogout={handleLogout} />

			<input type="file" onChange={onFileChange} />
			<button onClick={onFileUpload}>Upload!</button>
			<div className="break"></div>
			{isLoading && (
				<p>
					File upload <b>{progrss}%</b>
				</p>
			)}
			{url && (
				<>
					<Image src={url} fluid alt="Uploaded" />
				</>
			)}
			<div className="break"></div>
			<h2>Past Images</h2>
			{pastUrls.map((pastUrl, index) => (
				<div key={index}>
					<Image src={pastUrl} fluid alt={`Past Image ${index}`} />
				</div>
			))}
		</>
	);
};

export default FileUploadPage;
