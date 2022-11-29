import { AxiosResponse } from "axios";
import useAxios from "./useAxios";
const useHttpPost = <Res, Req>() => {
    const { axios } = useAxios();

    const post = (url: string, data: Req): Promise<AxiosResponse<Res>> => {
        return axios
            .post(url, data)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                throw error;
            });
    };
    return { post };
};

export default useHttpPost;
