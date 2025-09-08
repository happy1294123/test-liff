import { useEffect, useState } from 'react';
import { useLiff } from 'react-liff';

import './App.css';

const App = () => {
	const [displayName, setDisplayName] = useState('');
	const { error, isLoggedIn, isReady, liff } = useLiff();

	function handleLogin() {
		return liff.login
	}

	useEffect(() => {
		if (!isLoggedIn) return;

		(async () => {
			const profile = await liff.getProfile();
			setDisplayName(profile.displayName);
		})();
	}, [liff, isLoggedIn]);

	const showDisplayName = () => {
		if (error) return <p>Something is wrong.</p>;
		if (!isReady) return <p>Loading...</p>;

		if (!isLoggedIn) {
			return (
				<button className="App-button" onClick={handleLogin}>
					Login
				</button>
			);
		}
		return (
			<>
				<p>Welcome to the react-liff demo app, {displayName}!</p>
				<button className="App-button" onClick={liff.logout}>
					Logout
				</button>
			</>
		);
	};

	return (
		<div className="App">
			<header className="App-header">{showDisplayName()}</header>
		</div>
	);
};

export default App;