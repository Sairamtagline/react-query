import React from 'react'
import CustomUseQuery from '../../shared/CustomUseQuery'

const ExampleRefetch = () => {

    const onError = (error) => {
        console.log('error :>> ', error);
    }

    const onSuccess = (data) => {
        console.log('data', data)
    }

    const link = `${process.env.REACT_APP_BASE_URL}/superheroes`;
    const arg = { enabled: false, onSuccess, onError };

    const { isLoading, data, isError, error, refetch, isFetching } = CustomUseQuery(link, arg)

    if (isLoading || isFetching) {
        return <h2>Loading.....</h2>
    }

    if (isError) {
        return <h3>{error.message}</h3>
    }

    return (
        <div>
            <h2>OnClick Refetch</h2>
            <button onClick={refetch}>Fetch table</button>
            <table className="heroTable">
                <tbody>
                    {
                        data && data?.data && data?.data.length && data.data.map((hero) => {
                            return (
                                <tr key={hero?.id}>
                                    <td>{hero?.id}</td>
                                    <td>{hero?.name}</td>
                                    <td>{hero?.alterEgo}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExampleRefetch