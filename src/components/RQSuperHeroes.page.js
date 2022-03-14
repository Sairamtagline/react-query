import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes")
}

const RQSuperHeroesPage = () => {
    // The "useQuery" hook used for fetching a data.
    // useQuery hook takes two arguments.
    // If we want to set caching time then set a 3rd argument as cacheTime and set a caching time (default caching time is 5 min).
    // 
    const { isLoading, data, isError, error, refetch } = useQuery(
        'super-heroes', //first one is a string to cache and tracks the query result.
        fetchSuperHeroes, //second argument is the function we define to make HTTP requests.
        {   //3rd argument is optional.
            // cacheTime: 5000, 
            // staleTime: 10000,
            // refetchOnMount: true,
            // refetchOnWindowFocus: false,
            // refetchInterval: 3000,
            // refetchIntervalInBackground: true,
            enabled: false
        })

    if (isLoading) {
        return <h2>Loading.....</h2>
    }

    if (isError) {
        return <h3>{error.message}</h3>
    }

    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div className="ml-15">
                <button onClick={refetch}>Fetch Here</button>
                {
                    data && data?.data && data?.data.length && data?.data.map((hero) => {
                        return <div key={hero.name}>{hero.name}</div>
                    })
                }
            </div>
        </>
    )
}

export default RQSuperHeroesPage

/*
--> There are many configurations for fetching request set as an 3rd option in useQuery : 
    1> cacheTime: 5000
        - used for set caching time (default caching time is 5 min).
    2> staleTime: 10000
        - used for reduce network request for the same for requested time (default staleTime is 0). 
    3> refetchOnMount: true
        -> 3 options:
            - true: refetch request if in stale status. 
            - false: do not refetch request. 
            - 'always': always refetch request. (default is true).
            - default value is true.
    4> refetchOnWindowFocus: true
        -> 3 options:
            - true: refetch & update data. 
            - false: does not refetch data. 
            - 'always': refetch & update data always.  
            - default value is true.
    5> refetchInterval: 3000
        - refetch request after requested time when browser is in focus. 
    6> refetchIntervalInBackground: true
        - refetch request when browser is not focused. 
    7> enabled: false
        - It will disabled the network request calling.
    8> refetch (destructure from useQuery)
        - It will call network request when we want like onClick (ex : line 38)
    */