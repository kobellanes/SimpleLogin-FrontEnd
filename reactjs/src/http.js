
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost/Capstone_System_BE/capstone_system_be/public/api/",
    headers: {
        "Content-Type": "Application/json"
    }
});