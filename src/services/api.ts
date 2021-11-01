import axios from "axios";
import { appEnv } from "../../env";

const api = axios.create({
    baseURL: appEnv.url,
});

export default api;
