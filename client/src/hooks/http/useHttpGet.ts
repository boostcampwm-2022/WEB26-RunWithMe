import useAxios from "./useAxios";
const useHttpGet = <Res = any>() => {
    const { axios } = useAxios();

    const get = (url: string, query?: { [key: string]: any }): Promise<Res> => {
        return axios
            .get(url, {
                params: query,
            })
            .then((res) => {
                const data: Res = res.data;
                return data;
            });
    };
    return { get };
};

export default useHttpGet;
