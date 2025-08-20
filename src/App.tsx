import { useState } from 'react';
import Navbar from './components/Navbar';
import ItemsList from './features/items/ItemsList';
import ItemForm from './features/items/ItemForm';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={setQuery} />
      <div className="p-4">
        <ItemForm />
      </div>
      <ItemsList query={query} />
    </div>
  );
}

export default App;
