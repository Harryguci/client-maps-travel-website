import React from 'react';

const Maps = React.lazy(() => import('./pages/Maps'));

function App() {
  return (
    <div className="App">
      <Maps />
    </div>
  );
}

export default App;
