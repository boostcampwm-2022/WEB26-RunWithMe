import { userState } from "#atoms/userState";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Axios from "axios";

const useAxios = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const userInfo = useRecoilValue(userState);

    const { current: axios } = useRef(
        Axios.create({
            withCredentials: true,
            baseURL: "http://localhost:4000",
        }),
    );

    useEffect(() => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${userInfo.accessToken || ""}`;
    }, [userInfo]);

    return { isLoading, setIsLoading, error, setError, axios };
};

export default useAxios;
