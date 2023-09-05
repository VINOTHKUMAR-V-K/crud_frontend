import axios from "axios";
const serverConfig = "http://localhost:5000";
const isDeployment=process.env.NODE_ENV === 'developmet';
const baseUrl = isDeployment?serverConfig : "https://contactapp-8enp.onrender.com"

const axioxClient = axios.create({
    baseUrl,
})
export default axioxClient;