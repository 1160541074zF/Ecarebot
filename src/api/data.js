import axios from "./axios"

//getMenu
export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: param                          
  })
}

export const getData = () => {
  return axios.request({
    url: '/home/getData'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: 'http://localhost:5000/read-user-info',
    method: 'get',
    params
  })
}

export const getMed = (params) => {
  return axios.request({
    url: 'http://localhost:5000/read-med-info',
    method: 'get',
    params
  })
}

export const getState = (params) => {
  return axios.request({
    url: 'http://localhost:5000/read-state-info',
    method: 'get',
    params
  })
}

export const getPosition = (params) => {
  return axios.request({
    url: 'http://localhost:5000/read-position-info',
    method: 'get',
    params
  })
}

export const getNavigator = (params) => {
  return axios.request({
    url: 'http://localhost:5000/read-navigator-info',
    method: 'get',
    params
  })
}

export const getPicture = () => {
  return axios.request({
    url: 'http://localhost:5000/receive-image',
    method: 'post'
  })
}
