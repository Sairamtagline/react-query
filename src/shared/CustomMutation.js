import axios from "axios"
import { useMutation, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"

// useMutation used to perform create/update/delete operations.

//Perform add operation
const addSuperHero = (hero) => {
    // return axios.post(`${process.env.REACT_APP_BASE_URL}/superheroes`, hero)
    return request({ url: `superheroes`, method: 'post', data: hero })
}

export const AddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        // queryClient.invalidateQueries('super-heroes') ,//used to perform quick response of operations(add,update,delete).
        // queryClient.setQueryData('super-heroes', (oldQueryData) => { // used to push new data to old data. No need to call get request.
        //     return {
        //         ...oldQueryData,
        //         data: [...oldQueryData.data, data.data]
        //     }
        // })
        // },
        onMutate: async (newHero) => {  //Useful to perform optimistic updates
            await queryClient.cancelQueries('super-heroes');
            const previousHeroData = queryClient.getQueryData('super-heroes');
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData, data: [...oldQueryData.data, { id: oldQueryData?.data.length + 1, ...newHero }]
                }
            })
            return { previousHeroData }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData) //If error occurs, it will set old data. 
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes'); // Perform get request if performed operation is succeed or not.
        }
    })
}

//Per1form update operation 
const updateHeroRequest = (data) => {
    return request({ url: `superheroes/${data?.id}`, method: 'put', data: data?.formData })
}

export const UpdateSuperHeroes = () => {
    const queryClient = useQueryClient();
    return useMutation(updateHeroRequest, {
        // onSuccess: (data, variables) => {
        //     queryClient.invalidateQueries('super-heroes')//used to perform quick response of operations(add,update,delete).
        // },
        onMutate: async (data) => {  //Useful to perform optimistic updates
            console.log('data', data)
            await queryClient.cancelQueries('super-heroes');
            const previousHeroData = queryClient.getQueryData('super-heroes');
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData, data: [...oldQueryData.data, { id: data?.id, ...data?.formData }]
                }
            })
            return { previousHeroData }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('super-heroes', context.previousHeroData) //If error occurs, it will set old data. 
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes'); // Perform get request if performed operation is succeed or not.
        }
    })
}

// Perform delete operation
const deleteRequest = (id) => {
    return request({ url: `superheroes/${id}`, method: 'delete' })
}

export const DeleteSuperHeroes = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteRequest, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('super-heroes')//used to perform quick response of operations(add,update,delete).
        },
        // onMutate: async (id) => {  //Useful to perform optimistic updates
        //     console.log('id', id)
        //     await queryClient.cancelQueries('super-heroes');
        //     const previousHeroData = queryClient.getQueryData('super-heroes');
        //     queryClient.setQueryData('super-heroes', (oldQueryData) => {
        //         console.log('oldQueryData', oldQueryData)
        //         const newData = oldQueryData?.data.filter(obj => obj?.id !== id)
        //         console.log('newData :>> ', newData);
        //         return newData
        //     })
        //     return { previousHeroData }
        // },
        // onError: (_error, _hero, context) => {
        //     queryClient.setQueryData('super-heroes', context.previousHeroData) //If error occurs, it will set old data. 
        // },
        // onSettled: () => {
        //     queryClient.invalidateQueries('super-heroes'); // Perform get request if performed operation is succeed or not.
        // }
    })
}


