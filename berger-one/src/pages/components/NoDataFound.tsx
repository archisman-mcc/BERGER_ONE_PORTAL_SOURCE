import { GetProdDevImgRouteBuilder } from '../../services/functions/getProdDevUrlBuilder';
import React from 'react';

const NoDataFound = () => {
    return (
        <>
            <div className="object-cover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={GetProdDevImgRouteBuilder('/assets/images/folder.png')} alt="NoDataFound" className="h-20 w-20" />
                <p style={{ fontWeight: 'bold', fontSize: '15px' }}>No Data Found</p>
            </div>
        </>
    );
};

export default NoDataFound;
