import useAxios from "./useAxios";
const useHttpGet = <Res = any>() => {
    const { axios } = useAxios();

    const get = (url: string, query?: { [key: string]: any }): Promise<Res> => {
        return axios
            .get(url, {
                params: query,
            })
            .then((res) => {
                return res.data;
            });
    };
    return { get };
};

export default useHttpGet;
