import Home from './pages/Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext } from "react";
import History from './pages/History/History';
import './App.css'

export const CountContext = createContext<any>({});

function App() {
  const count_local =Number(localStorage.getItem((`count`)));
  const [count, setCount] = useState(count_local ? count_local : 0);
  return (
    <>
    <CountContext.Provider value={{count, setCount}}>
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        </Routes>
      </BrowserRouter>
    </CountContext.Provider>
    </>
  )
}

export default App
