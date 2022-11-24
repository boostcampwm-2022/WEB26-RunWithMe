export interface LocalSearchResponse {
    documents: LocalData[];
}

export interface LocalData {
    address: {
        address_name: string;
        b_code: string;
        h_code: string;
        main_address_no: string;
        mountain_yn: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_h_name: string;
        region_3depth_name: string;
        sub_address_no: string;
        x: string;
        y: string;
    };
    address_name: string;
    address_type: string;
    x: string;
    y: string;
}
