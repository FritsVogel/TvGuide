const axios = require('axios');
const stringFormat = require('./stringFormat');

exports.fetchChannelsData = (channels) => {

    return fetchData(`{
            channels(filter: { OR: ${stringFormat.filterArrayString('title', channels)}})
            {
                epgId,
                title,
            }
        }`);
};

exports.fetchSchedulesData = (dates, channelEpgId) => {

    return fetchData(`{
            schedules(sort: S_ASC, filter: { OR: ${stringFormat.filterArrayString('d', dates)}, o: "${channelEpgId}"})
            {
                s,
                e,
                p
                {
                    title,
                    description,
                    categories,
                    year
                }
            }
        }`);
};

function fetchData(query) {
    if(typeof(process.env.API_URL) == 'undefined' || typeof(process.env.API_AUTHENTICATION_KEY) == 'undefined') {
        console.log('Make sure an .env file exists and API_URL and API_AUTHENTICATION_KEY are set');
        process.exit();
    }

    return axios.post(process.env.API_URL, {
        query: query,
    }, {
        headers: {
            'authentication': process.env.API_AUTHENTICATION_KEY
        }
    });
}