import './App.css';
import Login from './Login';
import Signup from './Signup';
import React, { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="app-container">
      <button className="switch-button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Signup' : 'Login'}
      </button>
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
}

export default App;
