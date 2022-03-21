import { click } from '@testing-library/user-event/dist/click';
import React from 'react'
import { useParams } from 'react-router-dom'
import { CustomInitialQuery, useQueryById } from '../../shared/CustomUseQuery'

const SuperHeroDetails = () => {
    const { heroId } = useParams();
    const link = `${process.env.REACT_APP_BASE_URL}/superheroes/${heroId}`;
    console.log('heroId :>> ', heroId);
    // It will load the new data on every click.
    // const { isLoading, data, isError, error } = useQueryById(link, heroId)

    // It will use initial data on every click if there is any initial data.
    const { isLoading, data, isError, error } = CustomInitialQuery(link, heroId)
    if (isLoading) {
        return <h2>Loading.....</h2>
    }

    if (isError) {
        return <h3>{error.message}</h3>
    }

    return (
        <div>
            <h2>Super Hero Details</h2>
            <table>
                <tbody>
                    <tr>
                        <td><b>Name : </b></td>
                        <td>{data?.data?.name}</td>
                    </tr>
                    <tr>
                        <td><b>AlterEgo : </b></td>
                        <td>{data?.data?.alterEgo}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SuperHeroDetails