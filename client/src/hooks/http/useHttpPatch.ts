import useAxios from "./useAxios";
const usePatch = () => {
    const { isLoading, setIsLoading, error, setError, axios } = useAxios();

    const patch = (url: string, data: { [key: string]: any }) => {
        setError(null);
        setIsLoading(true);
        return axios
            .patch(url, data)
            .then((res) => {
                setIsLoading(false);
                return res.data;
            })
            .catch(setError);
    };
    return { isLoading, error, patch };
};

export default usePatch;
