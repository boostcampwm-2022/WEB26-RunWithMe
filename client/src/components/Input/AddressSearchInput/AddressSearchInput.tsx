import AddressList from "#components/AddressList/AddressList";
import ResetButton from "#components/ResetButton/ResetButton";
import { PLACEHOLDER } from "#constants/placeholder";
import useLocalAPI from "#hooks/useLocalAPI";
import { Address, AddressSearchResponse } from "#types/Address";
import { LOCAL_API_PATH } from "#types/LocalAPIType";
import { isEupMyeonDong } from "#utils/addressUtils";
import { debounce } from "#utils/timerUtils";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Input from "../Input";

interface AddressSearchInputProps {
    setRegion: Dispatch<SetStateAction<Address | null>>;
}

const AddressSearchInput = ({ setRegion }: AddressSearchInputProps) => {
    const [regionList, setRegionList] = useState<Address[]>([]);
    const [disabled, setDisabled] = useState(false);
    const search = useLocalAPI<AddressSearchResponse>(LOCAL_API_PATH.ADDRESS, { analyze_type: "exact", size: 20 });
    const inputRef = useRef<HTMLInputElement | null>();

    const onChangeInput = debounce((e: ChangeEvent<HTMLInputElement>) => getAddressList(e.target.value), 200);

    const onClickAddress = useCallback(
        (address: Address) => () => {
            setRegion(address);
            setDisabled(true);
            setRegionList([]);
            if (!inputRef.current) return;
            inputRef.current.value = address.address_name;
        },
        [],
    );

    const onClickResetButton = useCallback(() => {
        setRegion(null);
        setDisabled(false);
        if (!inputRef.current) return;
        inputRef.current.value = "";
    }, []);

    const getAddressList = useCallback(async (query: string) => {
        if (!query) return;
        const result = await search({ query });
        setRegionList(result.documents.filter(isEupMyeonDong));
    }, []);

    return (
        <div style={{ width: "100%", position: "relative" }}>
            <Input
                placeholder={PLACEHOLDER.REGION}
                child={disabled && <ResetButton width="1.2rem" onClick={onClickResetButton} />}
                attr={{ ref: inputRef, disabled }}
                onChange={onChangeInput}
            />
            {regionList.length > 0 && <AddressList data={regionList} onClickAddress={onClickAddress} />}
        </div>
    );
};

export default AddressSearchInput;
