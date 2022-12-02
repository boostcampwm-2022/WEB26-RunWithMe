import useAxios from "./useAxios";
const useHttpGet = <Res = any>() => {
    const { axios } = useAxios();

    const get = async (url: string, query?: { [key: string]: any }): Promise<Res> => {
        try {
            const res = await axios.get(url, {
                params: query,
            });
            if (res.data.statusCode >= 400) {
                throw new Error(res.data.message);
            }
            return res.data;
        } catch (error) {
            throw error;
        }
    };
    return { get };
};

export default useHttpGet;
