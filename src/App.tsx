import { Board } from './components/Board';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className="dark flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 relative">
        <Board />
      </div>
    </div>
  );
}

export default App;
