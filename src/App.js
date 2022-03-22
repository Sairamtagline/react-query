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

const link = [
  { path: "/", name: "Home", component: <HomePage /> },
  { path: "/super-heroes", name: "Traditional Super Heroes", component: <SuperHeroesPage /> },
  { path: "/rq-super-heroes", name: "RQ Super Heroes", component: <RQSuperHeroesPage /> },
  { path: "/rq-super-heroes/:heroId", name: "", component: <SuperHeroDetails /> },
  { path: "/onclick-fetch", name: "OnClick Fetch", component: <ExampleRefetch /> },
  { path: "/parallel-queries", name: "", component: <ParallelQueries /> },
  { path: "/dynamic-parallel-queries", name: "Dynamic parallel ", component: <DynamicParallelQueries heroIds={[1, 3, 6]} /> },
  { path: "/dependent-query", name: "", component: <DependentQueries email="Sincere@april.biz" /> },
  { path: "/paginated-query", name: "Paginated query", component: <PaginatedQueries /> },
  { path: "/infinite-query", name: "Infinite query", component: <InfiniteQuery /> },
]

function App() {
  return (
    <QueryClientProvider client={queryClient} > {/* with a QueryClient instance we can access the hooks provided by the react-query library*/}
      <Router>
        <div>
          <nav>
            <ul>
              {
                link.map((value) => {
                  return (<li>
                    <Link to={value?.path}>{value?.name}</Link>
                  </li>
                  )
                })
              }
            </ul>
          </nav>
          <Switch>
            {
              link.map((value) => {
                return (<Route exact path={value?.path}>
                  {value?.component}
                </Route>)
              })
            }
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> {/* It set a button at bottom-right on screen which helps us to view states */}
    </QueryClientProvider>
  );
}

export default App;
