import './App.css';
import Header from './component/Header';
import Main from './component/Main';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className='container'>
        <Main />
        </div>
    </div>
  );
}

export default App;
