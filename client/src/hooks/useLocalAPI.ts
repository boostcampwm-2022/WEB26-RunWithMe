import { LOCAL_API_PATH } from "#types/LocalAPIType";
import Axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
type RequestParams = { [key: string]: any };
const axios = Axios.create({
    baseURL: "https://dapi.kakao.com/v2/local",
    headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
    },
});

const useLocalAPI = <D>(url: LOCAL_API_PATH, options?: RequestParams) => {
    const query = useCallback((params: RequestParams): Promise<D> => {
        return axios
            .get<RequestParams, AxiosResponse<D>>(url, { params: Object.assign(options || {}, params) })
            .then((res) => res.data);
    }, []);

    return query;
};
export default useLocalAPI;
