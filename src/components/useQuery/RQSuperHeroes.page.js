import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { AddSuperHeroData, DeleteSuperHeroes, UpdateSuperHeroes } from '../../shared/CustomMutation';
import CustomUseQuery from '../../shared/CustomUseQuery';

// const dataTransformation = (data) => {
//     const names = data?.data.map(name => name.name)
//     return names
// }

const RQSuperHeroesPage = () => {
    // const [intervalTime, setIntervalTime] = useState(3000);
    const initialData = { name: "", email: "" };
    const [formData, setFormData] = useState(initialData);
    const [updateIndex, setUpdateIndex] = useState();
    const onSuccess = (data) => {
        console.log('After success', data);
    }

    const onError = (error) => {
        console.log('After error', error);
    }

    // useQuery hook takes two arguments.
    const args = { onSuccess, onError }
    const { isLoading, data, isError, error, refetch } = CustomUseQuery(`${process.env.REACT_APP_BASE_URL}`, args)
    const { mutate: addHero } = AddSuperHeroData();
    const { mutate: updateHero } = UpdateSuperHeroes();
    const { mutate: deleteHero } = DeleteSuperHeroes();

    if (isLoading) {
        return <h2>Loading.....</h2>
    }

    if (isError) {
        return <h3>{error.message}</h3>
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    // Perform add data using useMutation. 
    const handleSubmit = () => {
        addHero(formData)
        setFormData(initialData)
    }

    const handleEdit = (index, id) => {
        setUpdateIndex(id)
        let tempData = { name: data?.data?.[index].name, email: data?.data?.[index].email }
        setFormData(tempData);
    }

    const updateClick = () => {
        updateHero({ id: updateIndex, formData })
        setFormData(initialData)
    }

    const handleDelete = (index) => {
        deleteHero(index)
    }

    const handleCancel = () => {
        setFormData(initialData)
        setUpdateIndex()
    }

    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            <div className="ml-15 form">
                <b> Name : </b><input type="text" onChange={handleChange} name="name" value={formData.name} /><br />
                <b>Email : </b><input type="text" onChange={handleChange} name="email" value={formData.email} /><br />
                <button className="btn" onClick={handleSubmit} disabled={updateIndex}>ADD</button>
                <button className="btn" onClick={updateClick} disabled={!updateIndex}>UPDATE</button>
                <button className="btn" onClick={handleCancel}>Cancel</button>
            </div>
            <div className="ml-30">
                <button className='btn' onClick={refetch}>Fetch Here</button>
                <div className="update-table">
                    <table>
                        <tbody>
                            {/* when we have whole data */}
                            {
                                data && data?.data && data?.data.length && data?.data.map((hero, index) => {
                                    return <tr key={hero?.index}>
                                        <td><Link to={`rq-super-heroes/${hero.id}`}>{hero.name}</Link></td>
                                        <td><button onClick={() => handleEdit(index, hero?.id)}>Edit</button></td>
                                        <td><button onClick={() => handleDelete(hero?.id)}>Delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                {/* when we have our selected data */}
                {/* {
                    data.length && data.map((hero) => {
                        return <div key={hero}>{hero}</div>
                    })
                } */}
            </div>
        </>
    )
}

export default RQSuperHeroesPage
