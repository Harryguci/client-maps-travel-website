import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Maps = React.lazy(() => import('./pages/Maps'));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/'} element={<Maps />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
