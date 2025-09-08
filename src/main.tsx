import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LiffProvider } from 'react-liff';
import './index.css'
import App from './App.tsx'

const liffId = import.meta.env.VITE_REACT_APP_LINE_LIFF_ID;

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<LiffProvider liffId={liffId}>
			{liffId}
			<App />
		</LiffProvider>
	</StrictMode>,
)
