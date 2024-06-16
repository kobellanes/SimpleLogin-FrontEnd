
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost/Laravel-BE-/laravelbe/public/api/",

    headers: {
        "Content-Type": "Application/json"
    }
});