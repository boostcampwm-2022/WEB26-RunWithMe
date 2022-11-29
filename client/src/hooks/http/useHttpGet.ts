import useAxios from "./useAxios";
const useHttpGet = () => {
    const { axios } = useAxios();

    const get = (url: string, query?: { [key: string]: any }) => {
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
