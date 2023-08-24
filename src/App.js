import { useContext } from 'react';
import './App.css';
import SearchPage from './components/SearchPage';
import UpdatePage from './components/UpdatePage';
import { AppContext } from './context/AppContext';



function App() {

  const { titleClick } = useContext(AppContext);

  return (
    <div>
        {titleClick? <UpdatePage/> : <SearchPage/> }
    </div>
  );
}

export default App;
