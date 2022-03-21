import React from 'react'
import { useQueries, useQuery } from 'react-query'
import { request } from '../../utils/axios-utils'


const fetchSuperHeroes = () => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/superheroes`)
    return request({ url: `/superheroes` })
}

const fetchFriends = (link) => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/friends`)
    return request({ url: `/friends` })
}

const ParallelQueries = () => {

    const { data: heroesData, refetch: heroesFetch } = useQuery('super-heroes', fetchSuperHeroes, { enabled: false })
    const { data: friendsData, refetch: friendsFetch } = useQuery('friends', fetchFriends, { enabled: false })
    return (
        <div>
            <h2>Parallel Queries</h2>
            <button onClick={heroesFetch}>Heroes</button>
            <div>
                {
                    heroesData?.data.map(name => {
                        return <h3>{name.name}</h3>
                    })
                }
            </div>
            <button onClick={friendsFetch}>Friends</button>
            <div>
                {
                    friendsData?.data.map(name => {
                        return <h3>{name.name}</h3>
                    })
                }
            </div>
        </div>
    )
}

export default ParallelQueries

// Dynamic parallel query
const fetchSuperHero = (id) => {
    console.log('id', id)
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/superheroes/${id}`)
    return request({ url: `/superheroes/${id}` })
}
export const DynamicParallelQueries = ({ heroIds }) => {
    const results = useQueries(
        heroIds.map(id => {
            // it returns selected id results dynamically.
            return { queryKey: ["super-hero", id], queryFn: () => fetchSuperHero(id), }
        })
    )
    console.log('results :>> ', results);
    return (
        <div>
            <h2>Dynamic parallel queries</h2>
        </div>
    )
}