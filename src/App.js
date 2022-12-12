import logo from './logo.svg';
import './App.css';
import Register from './Pages/Register';
import Login from './Pages/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import ShowImages from './Pages/ShowImages';
import OnlyImage from './Pages/OnlyImage';
import { useSelector } from 'react-redux';
import Loader from './Components/Loader';
import ProtectedRoute from './Components/ProtectedRoute';
import Logout from './Pages/Logout';
function App() {
  const {loading}=useSelector(state=>state.alerts)
  // let loading=true;
  return (
    <>
    {loading && <Loader/>}
    <BrowserRouter>
      <Routes>
        <Route path='/register' 
        element={
          <Register/>
        }/>
        <Route path='/login' element={
          <Login/>
        }/>
        <Route path='/all-images' element={
        <ProtectedRoute>
          <ShowImages/>
        </ProtectedRoute>}/>
        <Route path='/only-image/:id' element={
        <ProtectedRoute>
          <OnlyImage/>
        </ProtectedRoute>
        }/>
        <Route path='/' element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
