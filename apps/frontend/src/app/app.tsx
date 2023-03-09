import { NameSearch } from './components/name-search';
import Providers from './providers';

export function App() {
  return (
    <Providers>
      <div className="flex justify-center h-screen pt-16">
        <NameSearch />
      </div>
    </Providers>
  );
}

export default App;
