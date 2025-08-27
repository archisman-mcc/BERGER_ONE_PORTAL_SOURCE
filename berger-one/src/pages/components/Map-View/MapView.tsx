'use client';
import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, Autocomplete, StandaloneSearchBox, CircleF, DirectionsRenderer } from '@react-google-maps/api';
import { GetNearestDealers } from '../../../services/api/fresh-dtls-services';
import FeatherIcon from 'feather-icons-react';
import LocationSearch from './LocationSearch';
import { DealerSearch, GetDealerLocation, UpdateLeadLocation } from '../../../services/api/lead-service';
import { commonErrorToast } from '../../../services/functions/commonToast';
import { GetProdDevImgRouteBuilder } from '../../../services/functions/getProdDevUrlBuilder';
const mapContainerStyle = {
    width: '100%',
    height: '85vh',
};

const mapOptions = {
    mapTypeId: 'roadmap',
    styles: [
        {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }],
        },
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
        {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }],
        },
        {
            featureType: 'landscape',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
        {
            featureType: 'water',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }],
        },
        {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{ visibility: 'on' }],
        },
    ],
};

let center: any;
const libraries: any = ['places'];
let searchFlag: boolean = false;
let maxDistance = -1;
let farthestDealer: any = null;

const MapView = ({ LeadDetails, onModalButtonHandle, conflictDealerDetails }: any) => {
    let [selectedMarker, setSelectedMarker] = useState<any>(null);
    let [locationList, SetLocationList] = useState<any>([]);
    let [SearchLocationList, SetSearchLocationList] = useState<any>([]);
    let [directionsResponse, setDirectionsResponse] = useState<any>(null);
    const [BergerDealerList, SetBergerDealerList] = useState<any>([]);
    const [SearchDealerList, setSearchDealerList] = useState<any>([]);
    const [ResponceSuccess, setResponceSuccess] = useState<boolean>(false);
    const [DealerResponceSuccess, setDealerResponceSuccess] = useState<boolean>(true);
    const [DealerLocationDetails, setDealerLocationDetails] = useState<any>(null);
    const [mapMrpos, setmapMrpos] = useState<any>({
        di_shop_pin: '',
        lh_depot_code: '',
        lh_id: '',
        tabFlag: '',
        dealer_code: '',
        lh_latitude: '',
        lh_longitude: '',
    });

    const handelChange = async (e: any) => {
        const { name, value } = e.target;
        mapMrpos.dealer_code = value;

        setmapMrpos(JSON.parse(JSON.stringify(mapMrpos)));
        // searchFlag = true;
        if (value != '' && value.length >= 3) {
            setDealerResponceSuccess(false);
            DealerSearchList();
        } else {
            setSearchDealerList(JSON.parse(JSON.stringify([])));
            if (mapMrpos.tabFlag === 'DealerMapForConflict') {
                onModalButtonHandle(null);
            }
        }
    };

    const HandelDealerSelect = async (item: any) => {
        mapMrpos.dealer_code = item.dealer_code + ' - ' + item.dealer_name;
        setDealerLocationDetails(item);
        setSearchDealerList([]);
        calculateRoute(item);
        if (mapMrpos.tabFlag === 'DealerMapForConflict') {
            onModalButtonHandle(item);
        }
    };

    const DealerSearchList = async () => {
        // mapMrpos.dealer_code = item.dlr_dealer_code + ' - ' + item.dlr_dealer_name;
        setmapMrpos(JSON.parse(JSON.stringify(mapMrpos)));
        setSearchDealerList([]);
        const data = {
            dealer_code: '',
            common_search: mapMrpos.dealer_code,
            latitude: locationList[0].latitude,
            longitude: locationList[0].longitude,
        };
        try {
            const response = await GetDealerLocation(data);
            if (response.data) setDealerResponceSuccess(true);
            setSearchDealerList(response.data);
        } catch (error) {
            return;
        }
    };

    const calculateRoute = async (item: any) => {
        let originRef = { lat: locationList[0].latitude, lng: locationList[0].longitude };
        let destiantionRef: any;
        destiantionRef = { lat: item.latitude, lng: item.longitude };
        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef,
            destination: destiantionRef,
            travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);

        // if (originRef.current.value === "" || destiantionRef.current.value === "") {
        //   return;
        // }
    };

    const GetNearestDealersList = async (marker: any) => {
        SetBergerDealerList(JSON.parse(JSON.stringify([])));
        try {
            const data = {
                lead_id: mapMrpos.lh_id,
                latitude: marker.lat,
                longitude: marker.lng,
                dealer_count: 5,
            };

            const response = await GetNearestDealers(data);

            // for (const dealer of response.data) {
            //     const distance = dealer.distance;

            //     if (distance > maxDistance) {
            //         maxDistance = distance;
            //         farthestDealer = dealer;
            //     }
            // }
            if (response.data) setResponceSuccess(true);
            if (response.data.length > 0) {
                response.data.map((item) => (item.conflict_dealer = false));

                let index = response.data.findIndex((item) => item.dealer_code == response.conflict.conflict_dealer_code);
                if (index != -1) {
                    response.conflict.dealer_name = response.data[index].dealer_name;
                    response.data[index].conflict_dealer = true;
                } else {
                    response.conflict.dealer_name = '';
                }
                SetBergerDealerList(JSON.parse(JSON.stringify(response.data)));
            }
            conflictDealerDetails(response.conflict);
            // calculateRoute();
        } catch (error) {
            return;
        }
    };

    const getLocationDetails = async (marker: any) => {
        try {
            const data = {
                latlng: marker,
                key: 'AIzaSyDxYpa13dNfY_mVL_IWD4gKgN3w1JRI77s',
            };
            const queryParams = new URLSearchParams(data).toString();
            const response = await fetch(` https://maps.googleapis.com/maps/api/geocode/json?${queryParams}`);
            const apiData = await response.json();
            const results: any = apiData.results;
            if (results.length > 0) {
                locationList = [];
                const { lat, lng } = results[0].geometry.location;
                center = { lat, lng };
                SetLocationList(JSON.parse(JSON.stringify(locationList)));
                // for (let i = 0; i < results.length; i++) {
                if (!locationList.some((item: any) => item.latitude == results[0].geometry.location.lat)) {
                    let jsonobj = {
                        location_id: locationList.length + 1,
                        address: results[0].formatted_address,
                        latitude: results[0].geometry.location.lat,
                        longitude: results[0].geometry.location.lng,
                    };
                    locationList.push(jsonobj);
                    SetLocationList(JSON.parse(JSON.stringify(locationList)));
                }
                if (mapMrpos.tabFlag == 'LeadMap') {
                    setResponceSuccess(false);
                    GetNearestDealersList(results[0].geometry.location);
                } else {
                    setResponceSuccess(true);
                }
            }
        } catch (error) {
            return;
        }
    };
    const getLatLongDetails = async () => {
        try {
            const data = {
                address: mapMrpos.di_shop_pin,
                key: 'AIzaSyDxYpa13dNfY_mVL_IWD4gKgN3w1JRI77s',
            };
            const queryParams = new URLSearchParams(data).toString();
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${queryParams}&components=country:IN&libraries=places`);
            const apiData = await response.json();

            const results: any = apiData.results;
            if (results.length > 0) {
                if (searchFlag == false) {
                    const { lat, lng } = results[0].geometry.location;
                    center = { lat, lng };
                    const marker = results[0].geometry.location;
                    // for (let i = 0; i < results.length; i++) {
                    if (!locationList.some((item: any) => item.latitude == results[0].geometry.location.lat)) {
                        let jsonobj = {
                            location_id: locationList.length + 1,
                            address: results[0].formatted_address,
                            latitude: results[0].geometry.location.lat,
                            longitude: results[0].geometry.location.lng,
                        };
                        locationList.push(jsonobj);
                        SetLocationList(JSON.parse(JSON.stringify(locationList)));
                        if (marker && mapMrpos.tabFlag == 'LeadMap') {
                            setResponceSuccess(false);
                            GetNearestDealersList(marker);
                        } else if (marker && mapMrpos.tabFlag != 'LeadMap') {
                            setResponceSuccess(true);
                        }
                    }
                } else {
                    for (let i = 0; i < results.length; i++) {
                        if (!SearchLocationList.some((item: any) => item.latitude == results[i].geometry.location.lat)) {
                            let jsonobj = {
                                location_id: SearchLocationList.length + 1,
                                address: results[i].formatted_address,
                                latitude: results[i].geometry.location.lat,
                                longitude: results[i].geometry.location.lng,
                            };
                            SearchLocationList.push(jsonobj);
                            SetSearchLocationList(JSON.parse(JSON.stringify(SearchLocationList)));
                            // if (marker) {
                            //     GetNearestDealersList(marker);
                            // } else {
                            // }
                        }
                    }
                }
                // }
            }
        } catch (error) {
            return;
        }
    };

    useEffect(() => {
        if (LeadDetails) {
            setmapMrpos((prev) => ({
                ...prev,
                di_shop_pin: LeadDetails.di_shop_pin,
                lh_depot_code: LeadDetails.lh_depot_code,
                lh_id: LeadDetails.lh_id,
                tabFlag: LeadDetails.tabFlag,
                dealer_code: LeadDetails.dealer_code && LeadDetails.dealer_code != null && LeadDetails.dealer_code != '' ? LeadDetails.dealer_code : '',
                lh_latitude: LeadDetails.lh_latitude,
                lh_longitude: LeadDetails.lh_longitude,
            }));
        }
        if (mapMrpos.lh_latitude != null && mapMrpos.lh_longitude) {
            let marker = mapMrpos.lh_latitude + ',' + mapMrpos.lh_longitude;
            getLocationDetails(marker);
        } else if (mapMrpos.di_shop_pin != '' && mapMrpos.di_shop_pin != null && mapMrpos.di_shop_pin != undefined) {
            getLatLongDetails();
        }
    }, [mapMrpos.di_shop_pin, mapMrpos.lh_latitude, mapMrpos.lh_longitude]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDxYpa13dNfY_mVL_IWD4gKgN3w1JRI77s',
        libraries,
    });
    if (loadError) {
        return <div>Error loading maps</div>;
    }
    if (!isLoaded) {
        return <div>Loading maps</div>;
    }

    const handleMarkerClick = (marker: any) => {
        setSelectedMarker(marker);
    };

    const handelLocationGet = (lat: any, lng: any) => {
        let marker = lat + ',' + lng;
        getLocationDetails(marker);
    };
    const handleSelect = (location: any) => {
        let marker = location.lat + ',' + location.lng;
        getLocationDetails(marker);
    };

    const HandleButtonCLick = async (flag: any) => {
        if (flag == 'save') {
            let userDetails: any = JSON.parse(localStorage.getItem('auth') || '');
            const data = {
                lead_id: mapMrpos.lh_id,
                latitude: locationList[0].latitude,
                longitude: locationList[0].longitude,
                map_address: locationList[0].address,
                user_id: userDetails.state.userDetails.user_id,
            };
            try {
                const response = await UpdateLeadLocation(data);
                if (response.response_message) {
                    onModalButtonHandle('LocationMap');
                } else {
                    commonErrorToast(response.errorMessage);
                }
            } catch (error) {
                return;
            }
        } else {
            onModalButtonHandle('LocationMap');
        }
    };
    return (
        <div>
            {(mapMrpos.tabFlag == 'DealerMap' || mapMrpos.tabFlag == 'DealerMapForConflict') && (
                <div>
                    <form>
                        <div className="relative mb-4 mt-2 xs:mx-2">
                            <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                                <FeatherIcon className="mr-2" icon="search" />
                            </span>
                            <input
                                type="search"
                                autoComplete="off"
                                placeholder="Search Dealer by Name/Code"
                                className="form-input ltr:pl-10 rtl:pr-10"
                                id="name"
                                value={mapMrpos.dealer_code}
                                onChange={handelChange}
                            />
                        </div>
                        {DealerResponceSuccess && SearchDealerList && SearchDealerList.length > 0 && (
                            <ul className="sub-menu googleMapAddressList">
                                {SearchDealerList.map((item: any, index: any) => (
                                    <li
                                        className="text-md flex cursor-pointer"
                                        key={index}
                                        onClick={() => {
                                            HandelDealerSelect(item);
                                        }}
                                    >
                                        <FeatherIcon className="mr-2 h-4 text-blue-600" icon="user" />
                                        {item.dealer_code} - {item.dealer_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!DealerResponceSuccess && SearchDealerList && SearchDealerList.length == 0 && (
                            <ul className="sub-menu googleMapAddressList">
                                {/* <div className="flex items-center justify-center" style={{ height: `5vh` }}>
                                    <span className="mb-10 inline-block h-12 w-12 animate-spin rounded-full border-4 border-success border-l-transparent align-middle"></span>
                                    <span className="mb-8 ml-2">Loading lead location... </span>
                                </div> */}
                                <div className="flex items-center justify-center">
                                    <span className="mb-10 inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-primary border-l-transparent align-middle"></span>
                                    <span className="mb-8 ml-2">Loading Dealers... </span>
                                </div>
                            </ul>
                        )}
                    </form>
                </div>
            )}
            {ResponceSuccess && (
                <>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={16}
                        center={center}
                        onClick={(ev: any) => {
                            handelLocationGet(ev.latLng.lat(), ev.latLng.lng());
                        }}
                        options={mapOptions}
                    >
                        {mapMrpos.tabFlag == 'LeadMap' && <LocationSearch onSelect={handleSelect} />}
                        {ResponceSuccess &&
                            locationList.map((marker: any, index: any) => (
                                <MarkerF
                                    icon={{
                                        url: `${GetProdDevImgRouteBuilder('/assets/images/location-pin.png')}`,

                                        anchor: new google.maps.Point(17, 46),

                                        scaledSize: new google.maps.Size(57, 57),
                                    }}
                                    // label={marker.address}
                                    position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
                                    key={index}
                                    onClick={() => {
                                        handleMarkerClick(marker);
                                    }}
                                />
                            ))}

                        {(mapMrpos.tabFlag == 'DealerMap' || mapMrpos.tabFlag == 'DealerMapForConflict') && DealerLocationDetails !== null && DealerLocationDetails && (
                            <MarkerF
                                icon={{
                                    // url: '/assets/images/berger-pin.png',
                                    url: `${GetProdDevImgRouteBuilder('/assets/images/berger-pin.png')}`,

                                    anchor: new google.maps.Point(17, 46),

                                    scaledSize: new google.maps.Size(57, 57),
                                }}
                                // label={marker.address}
                                position={{ lat: Number(DealerLocationDetails.latitude), lng: Number(DealerLocationDetails.longitude) }}
                                onClick={() => {
                                    handleMarkerClick(DealerLocationDetails);
                                }}
                            >
                                {/* {directionsResponse != null && directionsResponse && <DirectionsRenderer directions={directionsResponse} />} */}
                            </MarkerF>
                        )}

                        {mapMrpos.tabFlag == 'LeadMap' &&
                            BergerDealerList &&
                            BergerDealerList.length > 0 &&
                            BergerDealerList.map((marker: any, index: any) => (
                                <MarkerF
                                    icon={
                                        marker.dealer_gss == 'ASIAN'
                                            ? {
                                                  // url: '/assets/images/asian-pin.png',
                                                  url: `${GetProdDevImgRouteBuilder('/assets/images/asian-pin.png')}`,

                                                  anchor: new google.maps.Point(17, 46),

                                                  scaledSize: new google.maps.Size(57, 57),
                                              }
                                            : marker.conflict_dealer == true
                                            ? {
                                                  url: `${GetProdDevImgRouteBuilder('/assets/images/conflict.png')}`,

                                                  anchor: new google.maps.Point(17, 46),

                                                  scaledSize: new google.maps.Size(57, 57),
                                              }
                                            : {
                                                  // url: '/assets/images/berger-pin.png',
                                                  url: `${GetProdDevImgRouteBuilder('/assets/images/berger-pin.png')}`,

                                                  anchor: new google.maps.Point(17, 46),

                                                  scaledSize: new google.maps.Size(57, 57),
                                              }
                                    }
                                    position={{ lat: marker.latitude, lng: marker.longitude }}
                                    key={index}
                                    onClick={() => {
                                        handleMarkerClick(marker);
                                    }}
                                ></MarkerF>
                            ))}

                        {ResponceSuccess &&
                            [LeadDetails.conflict_radius, LeadDetails.conflict_radius].map((radius, idx) => {
                                return (
                                    <CircleF
                                        key={idx}
                                        center={center}
                                        radius={radius}
                                        onLoad={() => {}}
                                        options={{
                                            fillColor: '#a1c4fd',
                                            strokeColor: '#a1c4fd',
                                            strokeOpacity: 0.8,
                                        }}
                                    />
                                );
                            })}

                        {selectedMarker && (
                            <InfoWindowF
                                position={{ lat: Number(selectedMarker.latitude), lng: Number(selectedMarker.longitude) }}
                                onCloseClick={() => {
                                    setSelectedMarker(null);
                                }}
                            >
                                <div>
                                    {selectedMarker.dealer_name && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Dealer: </label>&nbsp;
                                            {selectedMarker.dealer_code} - {selectedMarker.dealer_name}
                                        </span>
                                    )}
                                    {selectedMarker.dealer_gss && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Dealer Type: </label> &nbsp;{selectedMarker.dealer_gss == 'OTHERS' ? 'Berger' : selectedMarker.dealer_gss}
                                        </span>
                                    )}
                                    {selectedMarker.unicorn_yn && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Unicorn: </label> &nbsp;
                                            <span className={`badge ${selectedMarker.unicorn_yn == 'Y' ? 'bg-success' : 'bg-danger'}`}>{selectedMarker.unicorn_yn == 'Y' ? 'Yes' : 'No'}</span>
                                        </span>
                                    )}
                                    {selectedMarker.address && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Address: </label> &nbsp;{selectedMarker.address}
                                        </span>
                                    )}
                                    {selectedMarker.distance && selectedMarker.distance.distance_text && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Distance: </label> &nbsp;{selectedMarker.distance.distance_text}
                                        </span>
                                    )}
                                    {selectedMarker.sales_value > 0 && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Sales Value:</label>&nbsp;
                                            {selectedMarker.sales_value}L
                                        </span>
                                    )}
                                    {(selectedMarker.sales_value == 0 || selectedMarker.sales_value == null) && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Sales Value:</label>&nbsp;
                                            {selectedMarker.sales_value}
                                        </span>
                                    )}
                                    {selectedMarker.growth != null && (
                                        <span className="flex text-sm font-bold">
                                            <label className="text-primary">Growth:</label>&nbsp;
                                            {selectedMarker.growth}%
                                        </span>
                                    )}
                                </div>
                            </InfoWindowF>
                        )}
                    </GoogleMap>
                    {mapMrpos.tabFlag !== 'DealerMapForConflict' && (
                        <div className="mt-8 flex items-center justify-end">
                            <button onClick={() => HandleButtonCLick('close')} type="button" className="btn btn-danger flex w-auto items-center justify-center text-base ltr:ml-4 rtl:mr-4">
                                <FeatherIcon className="h-5 w-5" icon="x-circle" />
                                &nbsp;
                                <span> Cancel</span>
                            </button>
                            {/* <button onClick={() => HandleButtonCLick('save')} type="button" className="btn btn-primary w-24 text-base ltr:ml-4 rtl:mr-4">
                                Save
                            </button> */}
                            {LeadDetails && !LeadDetails.IsButtonDisable && (
                                <button
                                    type="button"
                                    className="btn btn-success flex w-auto items-center justify-center text-base ltr:ml-4 rtl:mr-4"
                                    // className="btn btn-success flex w-auto items-center justify-center text-base"
                                    onClick={() => HandleButtonCLick('save')}
                                >
                                    <FeatherIcon className="h-5 w-5" icon="save" />
                                    &nbsp;
                                    <span> Submit</span>
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
            {!ResponceSuccess && (
                <>
                    <div className="flex items-center justify-center" style={{ height: `55vh` }}>
                        <span className="mb-10 inline-block h-12 w-12 animate-spin rounded-full border-4 border-success border-l-transparent align-middle"></span>
                        <span className="mb-8 ml-2">Loading lead location... </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default React.memo(MapView);
