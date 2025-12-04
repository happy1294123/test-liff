// src/App.js
import { useEffect, useState } from 'react';
import liff from '@line/liff';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ticketImgUrl from '../public/ticket_example.png'
import { client } from '@passwordless-id/webauthn'
import { server } from '@passwordless-id/webauthn'

const LIFF_ID = import.meta.env.VITE_REACT_APP_LINE_LIFF_ID; // Replace with your actual LIFF ID

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [profile, setProfile] = useState<any>(null);
	const [error, setError] = useState(null);
	const [hasBuyTicket, setHasBuyTicket] = useState(true)


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

	const TicketStyle = {
		backgroundColor: "#ffffff",
		color: "black",
		height: "80px",
		marginTop: '20px',
		padding: '10px',
		position: 'fixed',
		borderRadius: '10px'
	} as React.CSSProperties

	const handleBuy = () => {
		setHasBuyTicket(true)
		alert('票卷購買成功')
	}

	const handleConvertToApplePass = async () => {
		console.log('handleConvertToApplePass', ticketImgUrl)
		const imgResponse = await fetch(ticketImgUrl);
		const blob = await imgResponse.blob()
		const formData = new FormData();
		const file = new File([blob], 'ticket.png', { type: 'image/png' })
		formData.append('file', file)

		await fetch('https://suppler-oma-anonymously.ngrok-free.dev/webhook-test/c0f32a0f-d400-4c5f-9f3e-607228ecd4ff', {
			method: 'POST',
			body: formData
		})
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	const Home = () => {
		return <div className="App">
			<h1>Home</h1>
			{isLoggedIn ? (
				<div>
					<p>Welcome, {profile?.displayName}!</p>
					<button onClick={handleSendMsg}>send msg</button>
					<button onClick={handleLogout}>Logout</button>
					{/* Add more LIFF interactions here */}
				</div>
			) : (
				<>
					<div>
						{/* <p>Please log in to use the LIFF app.</p> */}
						<button onClick={handleLogin} style={{ backgroundColor: "#ffffff" }}>Login with LINE</button>

					</div>
					<div>
						{/* <FileLoader /> */}
						{/* <input type="file" onChange={handleFileChange} /> */}
						{/* <a href="https://31a90c78cd4b.ngrok-free.app/hldE4O5B8gGY.pkpass">test link</a> */}

					</div>
				</>
			)
			}
			<div style={TicketStyle}>
				票卷範例 Ticket Example
				<a style={{ position: 'absolute', right: '10px', bottom: '5px', cursor: 'pointer' }} onClick={handleBuy}>購買</a>
			</div >
		</div >
	}

	const TicketHolder = () => {
		return <>
			<h1>Ticket Holder</h1>

			{hasBuyTicket ?
				<>
					<img src="/ticket_example.png" alt="" />
					<img src="/apple_wallet_example.png" alt="" style={{ width: '100px', top: 0, marginLeft: '10px', cursor: 'pointer' }} onClick={handleConvertToApplePass} />
				</>
				:
				'無票卷'
			}



			{/* <h1>ticket_holder</h1> */}

		</>
	}

	const triggerRegistration = async () => {
		const registration = await client.register({
			user: "user name",
			challenge: server.randomChallenge(),
			/* possibly other options */
		})

		return registration
	}

	const triggerAuth = async () => {
		const authentication = await client.authenticate({
			/* Required */
			challenge: server.randomChallenge(),
			/* Optional */
			// allowCredentials: [{ id: 'my-credential-id', transports: ['internal'] }, ...],
			timeout: 60000
		})

		console.log(authentication)
		return authentication
	}


	return (
		<BrowserRouter>
			<div style={{ paddingLeft: '40px' }}>
				test
				<nav>
					<Link to="/">home</Link> | {" "}
					<Link to="/ticket_holder">ticket_holder</Link>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ticket_holder" element={<TicketHolder />} />
				</Routes>
			</div>

			<div>
				<button onClick={triggerRegistration} style={{ backgroundColor: "#ffffff" }}>click</button>
			</div>

			<div>
				<button onClick={triggerAuth} style={{ backgroundColor: "#ffffff" }}>click</button>
			</div>
		</BrowserRouter>
	);
}

export default App;