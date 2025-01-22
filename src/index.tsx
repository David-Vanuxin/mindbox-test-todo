import { createRoot } from 'react-dom/client';
import React, { StrictMode } from "react"
import App from "./App"
import '@fontsource/roboto/400.css';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
	<StrictMode>
		<App/>
	</StrictMode>);