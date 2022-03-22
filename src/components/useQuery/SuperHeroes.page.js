import React, { useState, useEffect } from 'react'
import axios from 'axios';

const SuperHeroesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}`)
            .then(res => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <h3>Loading........</h3>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <>
            <h2>Super Heroes Page</h2>
            <div className="ml-15">
                <ul>
                {
                    data && data.length && data.map((hero) => {
                        return <li key={hero.name}>{hero.name}</li>
                    })
                }
                </ul>
            </div>
        </>
    )
}

export default SuperHeroesPage