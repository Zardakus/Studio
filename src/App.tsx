import { Board } from './components/Board';

function App() {
  return (
    <div className="dark">
      {/* We apply a global dark class for MVP to get the dark mode look by default */}
      <Board />
    </div>
  );
}

export default App;
