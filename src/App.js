import logo from './logo.svg';
import './App.css';
import Login from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultPage from './components/defaultPage/Default';
import { Container } from 'react-bootstrap';
import Register from './components/register/Register';


function App() {
  return (
    <BrowserRouter>
      <Container >
        <Routes>
          <Route path='/' element={<DefaultPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
