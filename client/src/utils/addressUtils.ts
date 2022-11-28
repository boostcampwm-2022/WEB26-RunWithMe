import { Address } from "#types/Address";

const isEupMyeonDong = (local: Address) => local.address_type === "REGION" && local.address.region_3depth_h_name;
export { isEupMyeonDong };
