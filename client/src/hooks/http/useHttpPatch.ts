import useAxios from "./useAxios";
const useHttpPatch = () => {
    const { axios } = useAxios();
    const patch = async (url: string, data: { [key: string]: any }) => {
        const res = await axios.patch(url, data);
        return res.data;
    };
    return { patch };
};

export default useHttpPatch;
