const request = require("request");


const geocode = (city, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoibWF0aXJtdiIsImEiOiJjazg2MGZvMXYwYzI2M21vdDQxY3YzYTljIn0.0W4KR-3T9IHv5c1W-US_Ug&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to map service", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find longitude and latitude", undefined);
        } else {
            const data = {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;