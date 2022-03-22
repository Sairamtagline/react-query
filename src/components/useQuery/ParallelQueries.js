import React from 'react'
import { useQueries, useQuery } from 'react-query'
import { request } from '../../utils/axios-utils'


const fetchSuperHeroes = () => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/superheroes`)
    return request({ url: `` })
}

const fetchFriends = (link) => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/friends`)
    return request({ url: `` })
}

const ParallelQueries = () => {

    const { data: heroesData, refetch: heroesFetch } = useQuery('users', fetchSuperHeroes, { enabled: false })
    return (
        <div>
            <h2>Parallel Queries</h2>
            <button className="btn ml-15" onClick={heroesFetch}>Fetch Users</button>
            <div className="ml-30">
                {
                    heroesData?.data.map(name => {
                        return <h3>{name?.name}</h3>
                    })
                }
            </div>
        </div>
    )
}

export default ParallelQueries

// Dynamic parallel query
const fetchSuperHero = (id) => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/superheroes/${id}`)
    return request({ url: `/${id}` })
}
export const DynamicParallelQueries = ({ heroIds }) => {
    const results = useQueries(
        heroIds.map(id => {
            // it returns selected id results dynamically.
            return { queryKey: ["users", id], queryFn: () => fetchSuperHero(id), }
        })
    )

    return (
        <div>
            <h2>Dynamic parallel queries</h2>
            <div className="ml-15">{
                results.map((val) => {
                    return <h4>{val?.data?.data?.id} - {val?.data?.data?.username}</h4>
                })
            }</div>
        </div>
    )
}