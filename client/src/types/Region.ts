export interface RegionResponse {
    documents: Region[];
    meta: { total_count: number };
}

interface Region {
    address_name: string;
    code: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_4depth_name: string;
    region_type: string;
    x: string;
    y: string;
}
