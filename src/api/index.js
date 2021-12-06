import axios from "axios";
import { getCookie } from "../pages/cookieReader";
import { DisconnectionLogout, NoAPIConnection } from "../pages/Logout";

//export const BASE_URL = 'http://localhost:8080/';

export const BASE_URL = 'https://2lk8x0gj69.execute-api.ap-southeast-1.amazonaws.com/default/';

export const ORIGIN_URL = 'https://d3w269262cgvee.cloudfront.net/'; 

export const ENDPOINTS = {
    ADDUSER: 'addUser',  
    ADDMENU: 'addMenu',   
    MENUITEM: 'getAllMenu',
    SINGLEMENUITEM: 'getMenuById',
    AUTHENTICATE: 'authenticate',
    UPDATEMENU: 'updateMenu',
    DELETEMENU: 'deleteMenu',
    PING: 'pingCon'
}

export const endpointURL = endpoint => {
    return BASE_URL + endpoint;
}

export const createAPIEndpoint = endpoint => { 
    let url = BASE_URL + endpoint;
    let axiosHeaders = {headers: {
                            'Authorization': 'Bearer ' + getCookie("token")
                            }
                        };
                        
    return {
        fetchAll: () => axios.get(url, axiosHeaders),
        fetchById: (id, singleMenuItem) => axios.post(url, singleMenuItem, axiosHeaders),
        create: newItem => axios.post(url, newItem, axiosHeaders),
        update: (id, updateItem) => axios.post(url, updateItem, axiosHeaders),
        delete: (id, deleteItem) => axios.post(url, deleteItem, axiosHeaders),
    }
}