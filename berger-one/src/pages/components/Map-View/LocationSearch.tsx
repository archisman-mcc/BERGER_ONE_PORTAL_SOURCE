import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import FeatherIcon from 'feather-icons-react';

const LocationSearch = ({ onSelect }: any) => {
    const [autocomplete, setAutocomplete] = useState<any>(null);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();

            if (place.geometry) {
                const location = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                onSelect(location);
            } else {
                getLatLongDetails(place.name);
            }
        }
    };

    const getLatLongDetails = async (address: any) => {
        try {
            const data = {
                address: address,
                key: 'AIzaSyDxYpa13dNfY_mVL_IWD4gKgN3w1JRI77s',
            };
            const queryParams = new URLSearchParams(data).toString();
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${queryParams}&components=country:IN&libraries=places`);
            const apiData = await response.json();

            const results: any = apiData.results;
            if (results.length > 0) {
                const location = {
                    lat: results[0].geometry.location.lat,
                    lng: results[0].geometry.location.lng,
                };
                onSelect(location);
            }
        } catch (error) {
            return;
        }
    };

    const options = {
        fields: ['formatted_address', 'geometry', 'name'],
        strictBounds: false,
        componentRestrictions: { country: 'IN' },
    };
    return (
        <Autocomplete onLoad={(auto) => setAutocomplete(auto)} onPlaceChanged={onPlaceChanged} options={options}>
            <div className="relative mb-4 mt-3 xs:top-12 sm:top-12" style={{ marginLeft: `22%` }}>
                <span className="absolute top-1/2 -translate-y-1/2 ltr:left-3 rtl:right-3 dark:text-white-dark">
                    <FeatherIcon className="mr-2" icon="search" />
                </span>
                <input type="search" placeholder="Search Location" className="form-input ltr:pl-10 rtl:pr-10" id="name" style={{ width: `80%` }} />
            </div>
        </Autocomplete>
    );
};

export default LocationSearch;
