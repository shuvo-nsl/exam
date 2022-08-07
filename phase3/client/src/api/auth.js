import axios from "axios"
import { API } from "../utils/config"


export const login = user => {
    return axios.post(`${API}/users/signin`, user, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const register = user => {
    return axios.post(`${API}/users/signup`, user, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const getSingleUser = (userinfo,token) => {
    return axios.get(`${API}/users/user/${userinfo}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}
export const changePasswod = (user,token) => {
    return axios.put(`${API}/users/changepassword`,user,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getAllProjects = (token, data) => {
    return axios.get(`${API}/projects?projectLead=${data.projectLead}&startDate=${data.startDate}&endDate=${data.endDate}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getsingleProjects = (token, id) => {
    return axios.get(`${API}/projects/${id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getAllMember = (token) => {
    return axios.get(`${API}/users/allmember`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}
export const getAllTeamLead = (token) => {
    return axios.get(`${API}/users/allTeamLead`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}



export const addProject = (data, token) => {
    return axios.post(`${API}/projects/create`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}


export const updateSingleProject = (token, id, data) => {
    return axios.put(`${API}/projects/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}




export const createProject = (data, token) => {
    return axios.post(`${API}/projects/create`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}
export const createUser = (data, token) => {
    return axios.post(`${API}/users/createuser`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}
export const getAllReports = (token) => {
    return axios.get(`${API}/reports/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}
export const updateUser = (data, token, id) => {
    return axios.get(`${API}/users/${id}`, data,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}

export const deleteAproject = (token, id) => {
    return axios.delete(`${API}/projects/${id}`,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    } )
}