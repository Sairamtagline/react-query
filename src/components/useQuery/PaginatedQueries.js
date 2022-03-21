import { useState } from 'react';
import { useQuery } from "react-query"
import { request } from '../../utils/axios-utils';

const fetchSuperHeroes = (pageLimit, pageNo) => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/colors?_limit=${pageLimit}&_page=${pageNo}`)
    return request({ url: `/colors?_limit=${pageLimit}&_page=${pageNo}` })
}

// set pagination to fetch query result pagination-wise.
const PaginatedQueries = () => {
    const [pageNo, setPageNo] = useState(1);
    const [pageLimit, setPageLimit] = useState(1)
    const { isLoading, data, isError, error, isFetching } = useQuery(
        ['colors', pageLimit, pageNo],
        () => fetchSuperHeroes(pageLimit, pageNo),
        { keepPreviousData: true })

    if (isLoading) {
        <h2>Loading....</h2>
    }

    if (isError) {
        <h2>{error.message}</h2>
    }
    console.log('parseInt(data?.data.length)', parseInt(data?.data.length))
    return (
        <div>
            <h2>Paginated Queries</h2>
            <div className="ml-30">
                {data?.data.map(val => {
                    return (<h3>{val?.id} - {val?.label}</h3>)
                })}
            </div>
            <div className="ml-30">
                Page Limit : <select className="btn" value={pageLimit} onChange={(e) => setPageLimit(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
            </div>
            <div className="ml-15">
                <button className="btn" onClick={() => setPageNo(pageNo - 1)} disabled={pageNo === 1}>Previous Page</button>
                <button className="btn" onClick={() => setPageNo(pageNo + 1)} disabled={!data?.data.length}>Next Page</button>
            </div>
            {isFetching && 'Loading..'}
        </div>
    )
}

export default PaginatedQueries