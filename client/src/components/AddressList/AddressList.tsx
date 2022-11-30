import { Address } from "#types/Address";
import { MouseEventHandler } from "react";
import { PlaceList } from "./AddressList.styles";
interface AddressListProps {
    data: Address[];
    onClickAddress: (address: Address) => MouseEventHandler;
}

const AddressList = ({ data, onClickAddress }: AddressListProps) => {
    return (
        <PlaceList>
            {data.map((address) => (
                <li key={address.address.h_code} onClick={onClickAddress(address)}>
                    {address.address_name}
                </li>
            ))}
        </PlaceList>
    );
};
export default AddressList;
