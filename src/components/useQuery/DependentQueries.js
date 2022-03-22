import { useQuery } from "react-query"
import { request } from "../../utils/axios-utils"

const fetchUserByEmail = (email) => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/users/${email}`)
    return request({ url: `/${email}` })

}

const fetchUserByChannel = (channelId) => {
    // return axios.get(`${process.env.REACT_APP_BASE_URL}/channels/${channelId}`)
    return request({ url: `/${channelId}` })
}


const DependentQueries = ({ email }) => {
    // Fetch a data based on emailId
    const { data: user } = useQuery(["users", email], () => fetchUserByEmail(email))
    const channelId = user?.data?.channelId
    // Fetch a query based on previous query result.
    const { data: channel } = useQuery(["channels", channelId], () => fetchUserByChannel(channelId),
        { enabled: !!channelId, })
    return (
        <div>
            <h2>Dependent Queries</h2>
            <div className="ml-15">
                <p><b>Email : </b>{user?.data?.id}</p>
                <p><b>Channel : </b>{user?.data?.channelId}</p>
                <p><b>Courses : </b>{channel?.data?.courses.map(course => <span>{course}, </span>)}</p>
            </div>
        </div>
    )
}

export default DependentQueries