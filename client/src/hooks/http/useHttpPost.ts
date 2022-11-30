import { AxiosResponse } from "axios";
import useAxios from "./useAxios";
const useHttpPost = <Res = any, Req = any>() => {
    const { axios } = useAxios();

    const post = (url: string, data: Req): Promise<AxiosResponse<Res>> => {
        return axios
            .post(url, data)
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                throw error;
            });
    };
    return { post };
};

export default useHttpPost;
