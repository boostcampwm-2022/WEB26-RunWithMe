import useAxios from "./useAxios";
const useHttpPatch = () => {
    const { axios } = useAxios();

    const patch = (url: string, data: { [key: string]: any }) => {
        return axios.patch(url, data).then((res) => {
            return res.data;
        });
    };
    return { patch };
};

export default useHttpPatch;
