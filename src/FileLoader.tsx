import { useState } from 'react';

function FileLoader() {
	const [fileContent, setFileContent] = useState<any>(null);
	const [error, setError] = useState(null);

	const readFileFromPublic = async () => {
		try {
			// Use the file's path relative to the public folder
			const response = await fetch('/ticket-for-skyline-film-4-event-on-2024-04-21-d59992.pkpass'); // Or '/text.txt'
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const content = await response.text(); // Use .json() for JSON files
			setFileContent(content);
			setError(null);
		} catch (err) {
			console.error("Failed to read file:", err);
			setError("Failed to read file. Check console for details.");
			setFileContent(null);
		}
	};

	return (
		<div>
			<button onClick={readFileFromPublic}>Read File from Public</button>
			{fileContent && (
				<div>
					<h3>File Content:</h3>
					<pre>{fileContent}</pre>
				</div>
			)}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}

export default FileLoader;