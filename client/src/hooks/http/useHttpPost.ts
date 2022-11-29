import useAxios from "./useAxios";
const useHttpPost = () => {
    const { axios } = useAxios();

    const post = (url: string, data: { [key: string]: any }) => {
        return axios
            .post(url, data)
            .then((res) => {
                const data = res.data;
                if (data.statusCode >= 400) {
                    throw new Error(data.message);
                }
                return res.data;
            })
            .catch((error) => {
                throw error;
            });
    };
    return { post };
};

export default useHttpPost;
