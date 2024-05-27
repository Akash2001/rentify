import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './screens/login';
import { Seller } from './screens/seller';
import { Buyer } from './screens/buyer';
import './App.css';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user?._id ? (
            user.type === "Seller" ? <Seller /> : <Buyer />
          ) : <Login isLogin={true} setUser={setUser} />} />
          <Route path="/signup" element={<Login setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
