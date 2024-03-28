const API_BASE_URL = "https://edunet-backend.onrender.com/"

export const apiConfig = {
    API_BASE_URL,
}

export const endPoints= {
    LOGIN: `${API_BASE_URL}v1/login`,
    REGISTER: `${API_BASE_URL}auth/register`,
    GET_ALL_COURSES: `${API_BASE_URL}courses`,  
    GET_ALL_COURSES_BY_ID: (id) => `${API_BASE_URL}courses/${id}`
}