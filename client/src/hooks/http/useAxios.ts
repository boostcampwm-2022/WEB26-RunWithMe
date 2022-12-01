import { userState } from "#atoms/userState";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import Axios from "axios";

const useAxios = () => {
    const userInfo = useRecoilValue(userState);
    const { current: axios } = useRef(
        Axios.create({
            withCredentials: true,
            baseURL: process.env.REACT_APP_API_URL || "",
        }),
    );

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${userInfo.accessToken || ""}`;
    }, [userInfo]);

    return { axios };
};

export default useAxios;
