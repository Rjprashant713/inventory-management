import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <div>
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
    </div>
  );
}

export default App;


