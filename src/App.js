import { useState } from 'react';
import './App.css';
import Create from './components/Create';
import UserTable from './components/UserTable';

function App() {
  const [update, setUpdate] = useState([])
  return (
    <div>
      <Create setUpdate={setUpdate} update={update} />
      <UserTable setUpdate={setUpdate} update={update} />
    </div>
  );
}

export default App;
