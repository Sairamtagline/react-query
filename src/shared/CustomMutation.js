import { useMutation, useQueryClient } from "react-query"
import { request } from "../utils/axios-utils"

// useMutation used to perform create/update/delete operations.

//Perform add operation
const addSuperHero = (hero) => {
    // return axios.post(`${process.env.REACT_APP_BASE_URL}/superheroes`, hero)
    return request({ url: ``, method: 'post', data: hero })
}

export const AddSuperHeroData = () => {
    const queryClient = useQueryClient();
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        // queryClient.invalidateQueries('users') ,//used to perform quick response of operations(add,update,delete).
        // queryClient.setQueryData('users', (oldQueryData) => { // used to push new data to old data. No need to call get request.
        //     return {
        //         ...oldQueryData,
        //         data: [...oldQueryData.data, data.data]
        //     }
        // })
        // },
        onMutate: async (newHero) => {  //Useful to perform optimistic updates
            await queryClient.cancelQueries('users');
            const previousHeroData = queryClient.getQueryData('users');
            queryClient.setQueryData('users', (oldQueryData) => {
                return {
                    ...oldQueryData, data: [...oldQueryData.data, { id: oldQueryData?.data.length + 1, ...newHero }]
                }
            })
            return { previousHeroData }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('users', context.previousHeroData) //If error occurs, it will set old data. 
        },
        onSettled: () => {
            queryClient.invalidateQueries('users'); //  Always refetch after error or success.
        }
    })
}

//Per1form update operation 
const updateHeroRequest = (data) => {
    return request({ url: `/${data?.id}`, method: 'put', data: data?.formData })
}

export const UpdateSuperHeroes = () => {
    const queryClient = useQueryClient();
    return useMutation(updateHeroRequest, {
        // onSuccess: (data, variables) => {
        //     queryClient.invalidateQueries('users')//used to perform quick response of operations(add,update,delete).
        // },
        onMutate: async (data) => {  //Useful to perform optimistic updates
            await queryClient.cancelQueries('users');
            const previousHeroData = queryClient.getQueryData('users');
            queryClient.setQueryData('users', (oldQueryData) => {
                return {
                    ...oldQueryData, data: [...oldQueryData.data, { id: data?.id, ...data?.formData }]
                }
            })
            return { previousHeroData }
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData('users', context.previousHeroData) //If error occurs, it will set old data. 
        },
        onSettled: () => {
            queryClient.invalidateQueries('users'); //  Always refetch after error or success.
        }
    })
}

// Perform delete operation
const deleteRequest = (id) => {
    return request({ url: `/${id}`, method: 'delete' })
}

export const DeleteSuperHeroes = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteRequest, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('users')//used to perform quick response of operations(add,update,delete).
        },
        // onMutate: async (id) => {  //Useful to perform optimistic updates
        //     console.log('id', id)
        //     await queryClient.cancelQueries('users');
        //     const previousHeroData = queryClient.getQueryData('users');
        //     queryClient.setQueryData('users', (oldQueryData) => {
        //         console.log('oldQueryData', oldQueryData)
        //         const newData = oldQueryData?.data.filter(obj => obj?.id !== id)
        //         console.log('newData :>> ', newData);
        //         return newData
        //     })
        //     return { previousHeroData }
        // },
        // onError: (_error, _hero, context) => {
        //     queryClient.setQueryData('users', context.previousHeroData) //If error occurs, it will set old data.
        // },
        // onSettled: () => {
        //     queryClient.invalidateQueries('users'); // Always refetch after error or success.
        // }
    })
}


