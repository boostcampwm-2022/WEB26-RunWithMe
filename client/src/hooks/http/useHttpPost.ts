import useAxios from "./useAxios";
const useHttpPost = () => {
    const { isLoading, setIsLoading, error, setError, axios } = useAxios();

    const post = (url: string, data: { [key: string]: any }) => {
        setError(null);
        setIsLoading(true);
        return axios
            .post(url, data)
            .then((res) => {
                setIsLoading(false);
                const data = res.data;
                if (data.statusCode >= 400) {
                    throw new Error(data.message);
                }
                return res.data;
            })
            .catch((error) => {
                setError(error);
                throw error;
            });
    };
    return { isLoading, error, post };
};

export default useHttpPost;
