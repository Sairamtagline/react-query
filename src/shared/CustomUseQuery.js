import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const fetchSuperHeroes = (link) => {
    return axios.get(link)
}

const CustomUseQuery = (link, arg) => {
    return useQuery(
        'users', //first one is a string to cache and tracks the query result.
        () => fetchSuperHeroes(link), //second argument is the function we define to make HTTP requests.
        arg
        // {   //3rd argument is optional.Please read at the bottom of the page to understand below configurations.
        //     // cacheTime: 5000,
        //     // staleTime: 10000,
        //     // refetchOnMount: true,
        //     // refetchOnWindowFocus: false,
        //     // refetchInterval: intervalTime,
        //     // refetchIntervalInBackground: true,
        //     // enabled: false,
        //     // onSuccess: (data) => {
        //     //     if (data?.data.length > 3) {
        //     //         setIntervalTime(0)
        //     //     }
        //     // },
        //     // onSuccess,
        //     // onError,
        //     // refetchOnWindowFocus: false,
        //     // select: dataTransformation
        // }
    )
}

export default CustomUseQuery


// Custom useQuery: get results by id 
export const useQueryById = (link, id) => {
    return useQuery(
        ['users', id],
        () => fetchSuperHeroes(link),
    )
    // pass a link in fetchSuperHeroes func or if we wants to pass an id then 
    // const fetchSuperHeroes = ({queryKey}) => {
    // const id=queryKey[1]     //queryKey returns 1st argument value of useQuery.
    //     return axios.get(`${process.env.REACT_APP_BASE_URL}/superheroes/${id}`)
    // }
}

// query fetch first time and load the data. After that it uses initial data. So if we need a same data then it doesn't load on every click.
export const CustomInitialQuery = (link, heroId) => {
    const queryClient = useQueryClient();
    return useQuery(['users', heroId], () => fetchSuperHeroes(link), {
        initialData: () => {
            const hero = queryClient.getQueryData('users')?.data?.find(hero => hero?.id === parseInt(heroId));
            if (hero) {
                return { data: hero }
            } else {
                return undefined;
            }
        }
    })
}


/*
--> There are many configurations for fetching request set as an 3rd option in useQuery : 
    1> cacheTime: 5000
        - used for set caching time (default caching time is 5 min).
    2> staleTime: 10000
        - used for reduce network request for the same for requested time (default staleTime is 0). used for delay request time. 
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
    9> onSuccess:
        - It will perform after fetching query is successful. 
    10> onError:
        - It will perform when fetching encounters an error. 
    11> select : 
        - It will help you to set response data as per your need.
    12> refetchOnWindowFocus: 
        - It will refetch query automatically when window focused is value is true.
    13> retry:      
        - retry: false -> will disable retries.
        - retry: 6 -> will retry failing requests 6 times before showing the final error thrown by the function.
        - retry: true -> will infinitely retry failing requests.
        - retry = (failureCount, error) => ... -> allows for custom logic based on why the request failed.
    14> retryDelay:
        - retryDelay: 1000 -> it will delay retry calling.
*/