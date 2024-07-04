import './App.css';
import Navbar from './components/Navbar'
import Main from './components/Main';
import Categories from './components/Categories';
import Popular from './components/Popular';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Main/>
      <Categories/>
      <Popular/>
      <Dashboard/>
      <Explore/>
      <Footer/>
    </div>
  );
}

export default App;
