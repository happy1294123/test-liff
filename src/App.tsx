// src/App.js
import { useEffect, useState } from 'react';
import liff from '@line/liff';

const LIFF_ID = import.meta.env.VITE_REACT_APP_LINE_LIFF_ID; // Replace with your actual LIFF ID

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [profile, setProfile] = useState<any>(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const initLiff = async () => {
			try {
				await liff.init({ liffId: LIFF_ID });
				setIsLoggedIn(liff.isLoggedIn());

				if (liff.isLoggedIn()) {
					const userProfile: any = await liff.getProfile();
					setProfile(userProfile);
				}
			} catch (e: any) {
				setError(e.message);
			}
		};

		initLiff();
	}, []);

	const handleLogin = () => {
		liff.login();
	};

	const handleLogout = () => {
		liff.logout();
		setIsLoggedIn(false);
		setProfile(null);
	};

	const handleSendMsg = () => {
		liff.sendMessages([{
			"type": "text",
			"text": "Hello, World!"
		}]);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="App">
			<h1>LIFF React Example</h1>
			{isLoggedIn ? (
				<div>
					<p>Welcome, {profile?.displayName}!</p>
					<button onClick={handleSendMsg}>send msg</button>
					<button onClick={handleLogout}>Logout</button>
					{/* Add more LIFF interactions here */}
				</div>
			) : (
				<div>
					<p>Please log in to use the LIFF app.</p>
					<button onClick={handleLogin} style={{ backgroundColor: "#ffffff" }}>Login with LINE</button>
				</div>
			)}
		</div>
	);
}

export default App;