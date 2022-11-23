export interface PlaceSearchResponse {
    mata: PlaceMeta;
    documents: PlaceInfo[];
}
export interface PlaceMeta {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
    same_name: RegionInfo;
}
export interface RegionInfo {
    region: string[];
    keyword: string;
    selected_region: string;
}

export interface PlaceInfo {
    id: string;
    place_name: string;
    category_name: string;
    category_group_code: string;
    category_group_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    x: string;
    y: string;
    place_url: string;
    distance: string;
}
