import { Route } from 'react-router';
import './App.css'
import { BrowserRouter as Router, Routes} from "react-router";
import LoginPage from './Pages/Auth/Login';
function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />}/>
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
