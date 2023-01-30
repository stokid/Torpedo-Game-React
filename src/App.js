import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'

import './App.css';
import Describe from './components/Describe.Component';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={'*'}
            element={<Home />}
          />
          <Route
            path={'/describe'}
            element={<Describe />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
