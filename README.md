==> React-Query
    - It is a data-fetching library for react.
    - It is used for fetching, caching, synchronizing and updating data.
    - React-Query performs pre-fetching so that the application can update data in the background.

==> Installation : 
    -> npx create-react-app react-query-demo
    -> npm i react-query axios
    -> npm start

==> Example : 
    -> import {QueryClient, QueryClientProvider} from 'react-query'.
    -> Wrap the components that need data fetching, with the "QueryClientProvider" component (refer app.js file).

    =>useQuery : 
        -> It reduce the line of code and browser loading.
        -> Refer RQSuperHeroes.page.js for using useQuery.
        -> Refer SuperHeroes.page.js for without using useQuery example.


