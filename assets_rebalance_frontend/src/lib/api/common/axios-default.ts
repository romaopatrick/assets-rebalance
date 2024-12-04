import axios from "axios";

export function configAxios() {
    axios.defaults.validateStatus = () => true
}