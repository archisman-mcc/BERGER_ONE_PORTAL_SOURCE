import React from 'react'
import { mappls } from "mappls-web-maps";


const GPSmapView = () => {

    const loadObject: any = {
        map: true, // for plugin if map is not required
        version: '3.0', // // Optional, other version 3.5 also available with CSP headers
        libraries: [''], //Optional for Polydraw and airspaceLayers ie. libraries: ['polydraw']
        plugins:[''] // Optional for All the plugins ie. plugins:['direction'] ,
        //auth:'legacy' /*Use only when you have legacy mappls token*/
      };
    function GenerateAccessToken() {
        //const mappleUrl = "https://bpilmobile.bergerindia.com/mccapis/mapMyIndia/v1/ProdTokenGeneration";
        const client_id = "96dHZVzsAuuGp-JsxHjVciPvDZLi9Fai2XlF4BYkCwUvNGzfK-ZLG-l9vZhA3_T1TCmW8ohUCspuXj-Sdewm3w==";
        const client_secret = "lrFxI-iSEg9CoISX2Gck7Z4WxmPVfcmPhBaoQN8SqdUau3rJX85PQk1boYiXKrF0b3y4v1j52xoFwT6tVW7kcwa9W5fZ3ctX";
        const mappleUrl = `https://bpilmobile.bergerindia.com/mccapis/mapMyIndia/v1/DynamicTokenGeneration?client_id=${client_id}&client_secret=${client_secret}`;
        return new Promise((resolve, reject) => {
            fetch(mappleUrl, {
                method: "GET",
                headers: {
                    Authorization: "Basic 764AFD67-0E12-4B9D-83D8-91CDB467C9E6", // Access Key
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("data", data);
                    if (data) {
                        const parsedData = JSON.parse(data);
                        resolve(parsedData.access_token);
                    } else {
                        reject("Failed to fetch access token");
                    }
                })
                .catch(error => {
                    reject("Error fetching access token: " + error);
                });
        });
    }

    React.useEffect(() => {
        GenerateAccessToken().then((accessToken) => {
            console.log("Mappls access token fetched", accessToken);
            const mapplsInstance = new mappls();

            mapplsInstance.initialize(
                accessToken as string,
                loadObject,
                
                // {
                //     map: true,
                //     version: '3.0',
                // },
                // {
                //     mapKey: "b4e2dd74c58ef5dace48311dfcd0eb8f",
                //     restKey: "309e5960f925eed68c5e66f0b82fba6d",
                //     clientId: "96dHZVzsAuuGp-JsxHjVciPvDZLi9Fai2XlF4BYkCwUvNGzfK-ZLG-l9vZhA3_T1TCmW8ohUCspuXj-Sdewm3w==",


                //     // mapSDKKey: "b4e2dd74c58ef5dace48311dfcd0eb8f",
                //     // restAPIKey: "309e5960f925eed68c5e66f0b82fba6d",
                //     // atlasClientId: "96dHZVzsAuuGp-JsxHjVciPvDZLi9Fai2XlF4BYkCwUvNGzfK-ZLG-l9vZhA3_T1TCmW8ohUCspuXj-Sdewm3w==",
                //     // atlasClientSecret: "lrFxI-iSEg9CoISX2Gck7Z4WxmPVfcmPhBaoQN8SqdUau3rJX85PQk1boYiXKrF0b3y4v1j52xoFwT6tVW7kcwa9W5fZ3ctX"
                // },
                () => {
                    console.log("mapplsInstance");
                    const mapObject = mapplsInstance.Map({
                        id: "map",
                        properties: {
                            center: [77.2090, 28.6139],
                            zoom: 10,
                        },
                    }); 
                    mapObject.on('load', () => {
                        console.log("mapObject loaded");
                    });

                    // mapRef.current = mapObject;
                }
            );
        }).catch((error) => {
            console.log(error);
        });
        //     console.log("GPSmapView");
    }, []);

    return (
        <div>
            <div
                id="map"
                style={{ width: "100%", height: "500px" }}
            />
        </div>
    )
}

export default GPSmapView