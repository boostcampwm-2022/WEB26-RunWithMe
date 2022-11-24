import useAxios from "./useAxios";
const useGet = () => {
    const { isLoading, setIsLoading, error, setError, axios } = useAxios();

    const post = (url: string, data: { [key: string]: any }) => {
        setError(null);
        setIsLoading(true);
        return axios
            .post(url, data)
            .then((res) => {
                setIsLoading(false);
                return res.data;
            })
            .catch(setError);
    };
    return { isLoading, error, post };
};

export default useGet;
