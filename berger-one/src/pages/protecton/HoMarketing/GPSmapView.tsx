import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import { GetRegion_report, GetRegnWiseUserList, GetUserGroupApplicable } from '../../../services/api/protectonReport/ProtectonReport';
import { commonErrorToast, commonSuccessToast } from '../../../services/functions/commonToast';

declare global {
    type MapplsMapOptions = { center: [number, number]; zoom: number };
    type MapplsMarkerOptions = { map: unknown; position: { lat: number; lng: number } };
    type MapplsSdk = {
        Map: new (containerId: string, options: MapplsMapOptions) => unknown;
        Marker: new (options: MapplsMarkerOptions) => unknown;
    };
    interface Window {
        mappls?: MapplsSdk;
    }
}

const GPSmapView = () => {
    const navigate = useNavigate();

    type Option = { value: string; label: string };
    type RegionRow = { depot_regn?: string };
    type UserGroupRow = { grp_user_group_code?: string; grp_user_group_desc?: string };
    type UserRow = { usp_user_id?: string; usp_user_name?: string };
    type ApiTableResponse<T> = { data?: { table?: T[] } };

    const mapRef = React.useRef<unknown | null>(null);
    const markerRef = React.useRef<unknown | null>(null);

    type State = {
        region: Option[];
        selectedRegion: Option | null;
        userGroup: Option[];
        selectedUserGroup: Option | null;
        users: Option[];
        selectedUser: Option | null;
        devices: Option[];
        selectedDevice: Option | null;
    };

    const [data, setData] = React.useState<State>({
        region: [],
        selectedRegion: null,
        userGroup: [],
        selectedUserGroup: null,
        users: [],
        selectedUser: null,
        devices: [],
        selectedDevice: null,
    });

    const setField = <K extends keyof State>(keyName: K, value: State[K]) => {
        setData((prev) => ({ ...prev, [keyName]: value }));
    };

    React.useEffect(() => {
        const loadRegionAndUserGroup = async () => {
            try {
                const [regionRes, userGroupRes] = await Promise.all([
                    GetRegion_report<unknown, ApiTableResponse<RegionRow>>({}),
                    GetUserGroupApplicable<unknown, ApiTableResponse<UserGroupRow>>({}),
                ]);
                setData((prev) => ({
                    ...prev,
                    region: regionRes?.data?.table?.map((r) => ({ value: r?.depot_regn ?? '', label: r?.depot_regn ?? '' })) || [],
                    userGroup:
                        userGroupRes?.data?.table?.map((r) => ({ value: r?.grp_user_group_code ?? '', label: r?.grp_user_group_desc ?? '' })) || [],
                }));
            } catch {
                commonErrorToast("Error loading ");
            }
        };
        loadRegionAndUserGroup();
    }, []);

    React.useEffect(() => {
        const loadUsers = async () => {
            if (!data.selectedRegion || !data.selectedUserGroup) {
                setData((prev) => ({ ...prev, users: [], selectedUser: null }));
                return;
            }

            // Clear user while loading new list (keeps UI consistent if Region/UserGroup changed)
            setData((prev) => ({ ...prev, users: [], selectedUser: null }));

            try {
                const payload = {
                    regn: data.selectedRegion.value,
                    group_code: data.selectedUserGroup.value,
                };
                const res = await GetRegnWiseUserList<unknown, ApiTableResponse<UserRow>>(payload);
                setData((prev) => ({
                    ...prev,
                    users: res?.data?.table?.map((u) => ({ value: u?.usp_user_id ?? '', label: u?.usp_user_name ?? '' })) || [],
                }));
            } catch {
                // keep empty dropdown on failure
            }
        };

        loadUsers();
    }, [data.selectedRegion, data.selectedUserGroup]);

    React.useEffect(() => {
        if (!window.mappls) return;
        if (mapRef.current) return;

        const map = new window.mappls.Map('map', {
            center: [28.61, 77.23],
            zoom: 10,
        });

        mapRef.current = map;
        markerRef.current = new window.mappls.Marker({
            map,
            position: { lat: 28.61, lng: 77.23 },
        });
    }, []);


    // ---------------------------------------------------------------------------

    function initMap(dataForMapPoints: any, googlePolylineModel: any) {
        if (!window.mappls) {
            console.error('mappls is not available on window');
            return;
        }
        const map = new window.mappls.Map('map', {
            center: [28.544, 77.5454],
            zoom: 10,
        });

        const mapWithListener = map as { addListener?: (event: string, callback: () => void) => void };
        if (typeof mapWithListener.addListener !== "function") {
            console.error('addListener is not a function on map');
            return;
        }
        mapWithListener.addListener('load', function () {
            const geoData = {
                "type": "FeatureCollection",
                "features": dataForMapPoints
            };

            const pts = googlePolylineModel;

            const polyline: any = (window.mappls as any).Polyline({
                map: map,
                paths: pts,
                strokeColor: '#4e8bed',
                strokeOpacity: 1.0,
                strokeWeight: 5,
                fitbounds: true
            });

            const marker: any = (window.mappls as any).addGeoJson({
                map: map,
                data: geoData,
                fitbounds: true,
                cType: 0
            });
        });
    }

    const mapMarkerData = async () => {
        const postData = { uid: "5678", did: "e6115d066ebfa663", dpc: "006", trc: "", dt: "29/12/2025" };
        try {
            const response: any = await fetch('https://bpilmobile.bergerindia.com/TRACKING/MapViewV3.aspx/GetDatalatLong', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            const data = await response.json();
            const parsedArray = JSON.parse(data.d);
            console.log("parsedArray", parsedArray);

            const googlePolylineModel = parsedArray?.googlePolylineModel;
            const googlePointModel = parsedArray?.googlePointModel;

            const resolveIconUrl = (iconPath?: string) => {
                if (!iconPath) return undefined;
                if (/^(https?:)?\/\//i.test(iconPath) || iconPath.startsWith('data:')) {
                    return iconPath;
                }
                const remoteBase = 'https://bpilmobile.bergerindia.com/TRACKING/';
                return new URL(iconPath.replace(/^\/+/, ''), remoteBase).toString();
            };

            const dataForMapPoints = googlePointModel.map((item: any) => ({
                type: "Feature",
                properties: {
                    description: item?.InfoHTML,
                    icon: resolveIconUrl(item?.IconImage)
                    // icon: "https://apis.mappls.com/map_v3/1.png"
                    // icon: item?.IconImage
                },
                geometry: {
                    type: "Point",
                    coordinates: [
                        Number(item?.lat),
                        Number(item?.lng)
                    ]
                }
            }));

            console.log("dataForMapPoints", dataForMapPoints);

            initMap(dataForMapPoints, googlePolylineModel);
            // initMap1(dataForMapPoints);
            // initMap2(googlePolylineModel);


            // want to create a array of objects like this: 
            // const arr2 = [
            //     {
            //         type: "Feature",
            //         properties: {
            //             description: "<b>Depot:- </b>Calcutta-2 (006) <br /><b>Location:- </b>[22.6944225, 88.3747659] <br /><b>Accuracy:- </b>17.41900062561035",
            //             icon: "images/icon-depot-1.png"
            //         },
            //         geometry: {
            //             type: "Point",
            //             coordinates: [22.6944225, 88.3747659]
            //         }
            //     },
            //     {
            //         type: "Feature",
            //         properties: {
            //             description: "<b>Dealer:- </b>M/S BANERJEE BUILDER (112394) <br /><b>Location:- </b>[22.6118204, 88.3859079] <br /><b>Accuracy:- </b>33",
            //             icon: "images/icon-dealer-1.png"
            //         },
            //         geometry: {
            //             type: "Point",
            //             coordinates: [22.6118204, 88.3859079]
            //         }
            //     },
            // ] from
            // const arr1 = [
            //     {
            //         ID: "GPDLR0",
            //         lat: "22.6944225",
            //         lng: "88.3747659",
            //         dd_timestamp: null,
            //         InfoHTML: "<b>Depot:- </b>Calcutta-2 (006) <br /><b>Location:- </b>[22.6944225, 88.3747659] <br /><b>Accuracy:- </b>17.41900062561035",
            //         IconImage: "images/icon-depot-1.png"
            //     },
            //     {
            //         ID: "GPDLR2",
            //         lat: "22.6118204",
            //         lng: "88.3859079",
            //         dd_timestamp: null,
            //         InfoHTML: "<b>Dealer:- </b>M/S BANERJEE BUILDER (112394) <br /><b>Location:- </b>[22.6118204, 88.3859079] <br /><b>Accuracy:- </b>33",
            //         IconImage: "images/icon-dealer-1.png"
            //     }
            // ]

        } catch (err) {
            console.error('Fetch error:', err);
        }
    };
    // ---------------------------------------------------------------------------

    const handleView = () => {
        // if (!data.selectedRegion || !data.selectedUserGroup || !data.selectedDevice) {
        //     commonErrorToast('Please select Region, UserGroup, and Device');
        //     return;
        // }
        // commonSuccessToast('Filters applied');
        mapMarkerData();
        // TODO: plug GPS/marker API here and update map markers based on filters
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <>
            <div className="page-titlebar flex items-center justify-between bg-white px-4 py-1">
                <h5 className="text-lg font-semibold dark:text-white-light">GPS MAP VIEW</h5>
            </div>

            <div className="mb-2 bg-white rounded-lg px-4 py-2 shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-24">Region:</label>
                        <Select<Option, false>
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.region}
                            value={data.selectedRegion}
                            onChange={(event) => {
                                setData((prev) => ({ ...prev, selectedRegion: event, selectedUser: null }));
                            }}
                            placeholder="Select Region"
                            isClearable
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-24">UserGroup:</label>
                        <Select<Option, false>
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.userGroup}
                            value={data.selectedUserGroup}
                            onChange={(event) => {
                                setData((prev) => ({ ...prev, selectedUserGroup: event, selectedUser: null }));
                            }}
                            placeholder="Select UserGroup"
                            isClearable
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-24">User:</label>
                        <Select<Option, false>
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.users}
                            value={data.selectedUser}
                            onChange={(event) => setField('selectedUser', event)}
                            placeholder="Select User"
                            isClearable
                            isDisabled={!data.selectedRegion || !data.selectedUserGroup}
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="block text-sm font-semibold text-gray-700 w-24">Device:</label>
                        <CreatableSelect<Option, false>
                            className="text-sm flex-1"
                            isSearchable={true}
                            options={data.devices}
                            value={data.selectedDevice}
                            onChange={(event) => setField('selectedDevice', event)}
                            onCreateOption={(inputValue) => {
                                const next = { value: inputValue, label: inputValue };
                                setData((prev) => ({ ...prev, devices: [next, ...prev.devices], selectedDevice: next }));
                            }}
                            placeholder="Select Device"
                            isClearable
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm flex items-center justify-center transition-colors duration-200 h-[38px] w-24"
                            onClick={handleView}
                        >
                            View
                        </button>
                        <button
                            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm flex items-center justify-center transition-colors duration-200 h-[38px] w-24"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>

            <div id="map" style={{ width: '100%', height: '500px' }} />
        </>
    );
}

export default GPSmapView;