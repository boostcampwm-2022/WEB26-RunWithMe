import useAxios from "./useAxios";
const useHttpPost = <Res = any, Req = any>() => {
    const { axios } = useAxios();

    const post = async (url: string, data: Req): Promise<Res> => {
        return await axios
            .post(url, data)
            .then((res) => {
                if (res.data.statusCode >= 400) {
                    throw new Error(res.data.message);
                }
                if (res) return res.data;
            })
            .catch((error) => {
                throw error;
            });
    };
    return { post };
};

export default useHttpPost;
