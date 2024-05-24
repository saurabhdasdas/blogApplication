import './App.css';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import YourPosts from './pages/YourPosts';
import Form from './pages/Form';
import Singlapage from './pages/Singlapage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
          <Routes>
              <Route path='/'element={<Login/>}/>
              <Route path='/register'element={<Signup/>}/>
              <Route path='/home'element={<Home/>}/>
              <Route path='/YourPosts'element={<YourPosts/>}/>
              <Route path='/Form'element={<Form/>}/>
              <Route path='/Singla'element={<Singlapage/>}/>
          </Routes>
          <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
