import { LocalData } from "#types/Local";
import { MouseEventHandler } from "react";
import { PlaceList } from "./AddressList.styles";
interface AddressListProps {
    data: LocalData[];
    onClickLocal: (local: LocalData) => MouseEventHandler;
}

const AddressList = ({ data, onClickLocal }: AddressListProps) => {
    return (
        <PlaceList>
            {data.map((local) => (
                <li key={local.address.h_code} onClick={onClickLocal(local)}>
                    {local.address_name}
                </li>
            ))}
        </PlaceList>
    );
};
export default AddressList;
