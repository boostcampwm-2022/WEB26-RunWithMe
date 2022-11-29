import useAxios from "./useAxios";
const useHttpGet = () => {
    const { isLoading, setIsLoading, error, setError, axios } = useAxios();

    const get = (url: string, query?: { [key: string]: any }) => {
        setError(null);
        setIsLoading(true);
        return axios
            .get(url, {
                params: query,
            })
            .then((res) => {
                setIsLoading(false);
                return res.data;
            })
            .catch(setError);
    };
    return { isLoading, error, get };
};

export default useHttpGet;
