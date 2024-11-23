import axios from "axios";

export function configAxios() {
    axios.interceptors.response.clear()
    axios.defaults.validateStatus = () => true
}