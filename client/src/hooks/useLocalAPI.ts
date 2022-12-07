import { LOCAL_API_PATH } from "#types/LocalAPIType";
import Axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
type RequestParams = { [key: string]: any };
const axios = Axios.create({
    baseURL: "https://dapi.kakao.com/v2/local",
    headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_KEY}`,
    },
});

const useLocalAPI = <R>(url: LOCAL_API_PATH, options?: RequestParams) => {
    const query = useCallback((params: RequestParams): Promise<R> => {
        return axios
            .get<RequestParams, AxiosResponse<R>>(url, { params: Object.assign(options || {}, params) })
            .then((res) => res.data);
    }, []);

    return query;
};
export default useLocalAPI;
