import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GamePage } from './components/gamepage/gamepage.js';

function App() {
	return (
		<>
			<Router basename='/2bulls1cow'>
				<Routes>
					<Route path="/" element={<GamePage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
