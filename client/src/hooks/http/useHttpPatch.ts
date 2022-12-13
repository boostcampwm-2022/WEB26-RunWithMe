import useAxios from "./useAxios";
const useHttpPatch = () => {
    const { axios } = useAxios();
    const patch = async (url: string, data: { [key: string]: any }) => {
        try {
            const res = await axios.patch(url, data);
            if (res.data.statusCode >= 400) {
                throw new Error(res.data.message);
            }
            return res.data;
        } catch (error) {
            throw error;
        }
    };
    return { patch };
};

export default useHttpPatch;
