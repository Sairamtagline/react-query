import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { request } from '../../utils/axios-utils'

const fetchColors = ({ pageParam = 1 }) => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/colors?_limit=2&_page=${pageParam}`)
    return request({ url: `/colors?_limit=2&_page=${pageParam}` })
}


// It returns next page data with current page data.
const InfiniteQuery = () => {
    const { isLoading, data, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, hasPreviousPage } = useInfiniteQuery(['colors'], fetchColors,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length) {
                    return pages.length + 1
                } else {
                    return undefined
                }
            }
        })

    if (isLoading) {
        <h2>Loading....</h2>
    }

    if (isError) {
        <h2>{error.message}</h2>
    }

    return (
        <div>
            <h2>Infinite Queries</h2>
            <div className="ml-30">
                {data?.pages?.map((page, index) => {
                    return (
                        <div key={index}>{
                            page?.data.map((value, i) =>
                                <h3 key={i} >{value?.id} - {value?.label}</h3>)}</div>)
                })}
            </div>
            <div className="ml-30">
                <button className="btn" disabled={!hasNextPage} onClick={fetchNextPage} >Load More</button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
    )
}

export default InfiniteQuery