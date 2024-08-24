import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    /*<>
    <h1 className='text-5xl text-center text-violet-500'>Hello World</h1>
    </>*/

    <div >
    <Routes>
      <Route path='/' element = {'Home'} />
      <Route path='/signup' element = {<SignupPage/>} />
      <Route path='/login' element = {<LoginPage/>} />
    </Routes>
    </div>
  );
}
export default App;
