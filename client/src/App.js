import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api') // Ruta del servidor Flask
      .then(response => response.text())
      .then(data => setData(data));
  }, []);

  return (
    <div className="App">
      <h1>React with Flask</h1>
      <p>Response from Flask: {data}</p>
    </div>
  );
}

export default App;
