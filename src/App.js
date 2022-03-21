import './App.css';
import './style.scss';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'; // it helps us view the state and the cache.
import ExampleRefetch from './components/useQuery/ExampleRefetch';
import RQSuperHeroesPage from './components/useQuery/RQSuperHeroes.page';
import SuperHeroesPage from './components/useQuery/SuperHeroes.page';
import HomePage from './components/useQuery/Home.page';
import SuperHeroDetails from './components/useQuery/SuperHeroDetails';
import ParallelQueries, { DynamicParallelQueries } from './components/useQuery/ParallelQueries';
import DependentQueries from './components/useQuery/DependentQueries';
import PaginatedQueries from './components/useQuery/PaginatedQueries';
import InfiniteQuery from './components/useQuery/InfiniteQuery';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} > {/* with a QueryClient instance we can access the hooks provided by the react-query library*/}
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/onclick-fetch">Fetch onClick</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route exact path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route exact path="/rq-super-heroes/:heroId">
              <SuperHeroDetails />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/onclick-fetch">
              <ExampleRefetch />
            </Route>
            <Route exact path="/parallel-queries">
              <ParallelQueries />
            </Route>
            <Route exact path="/dynamic-parallel-queries">
              <DynamicParallelQueries heroIds={[1, 3]} />
            </Route>
            <Route exact path="/dependent-query">
              <DependentQueries email="jb@gmail.com" />
            </Route>
            <Route exact path="/paginated-query">
              <PaginatedQueries />
            </Route>
            <Route exact path="/infinite-query">
              <InfiniteQuery />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> {/* It set a button at bottom-right on screen which helps us to view states */}
    </QueryClientProvider>
  );
}

export default App;
