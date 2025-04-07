import React from 'react';
import MapComponents from './layout/MapComponents';
import YandexMapSidebar from './layout/YandexMapSidebar';

function App() {
  return (
    <div className="relative h-screen flex overflow-hidden">
      <YandexMapSidebar />
      
      <main className="flex-1 relative">
        <MapComponents />
      </main>
    </div>
  );
}

export default App;