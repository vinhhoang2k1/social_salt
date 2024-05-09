import axiosLib from "axios";
export const fetcher = axiosLib.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 6000,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        Accept: "application/json",
    },
});

fetcher.interceptors.response.use(null, (err) => {
    const error = {
        status: err.response?.status,
        original: err,
        validation: {},
        message: null,
    };

    if (err.response?.status === 422) {
        for (let field in err.response.data.errors) {
            error.validation[field] = err.response.data.errors[field][0];
        }
    } else {
        // error.message = "Something went wrong. Please try again later.";
    }

    return Promise.reject(error);
});
