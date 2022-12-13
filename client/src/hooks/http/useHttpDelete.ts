import useAxios from "./useAxios";
const useHttpDelete = <Res = any>() => {
    const { axios } = useAxios();

    const _delete = async (url: string, query?: { [key: string]: any }): Promise<Res> => {
        try {
            const res = await axios.delete(url, {
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
    return { _delete };
};
export default useHttpDelete;
