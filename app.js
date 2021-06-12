require('dotenv').config();

const stringFormat = require('./utility/stringFormat');
const api = require('./utility/api');

const CHANNELS = ['NPO 1 HD', 'RTL 4 HD'];
const DATES = [20210108, 20210109];

api.fetchChannelsData(CHANNELS)
    .then(async (channels) => {
        let schedulesByChannelTitle = [];
        await Promise.all(channels.data.data.channels.map(async (channel) => {
            // retrieve schedules for each channel asynchronously
            await api.fetchSchedulesData(DATES, channel.epgId)
                .then(schedules => {
                    schedulesByChannelTitle[channel.title] = schedules.data.data.schedules;
                })
                .catch(error => {
                    console.error(error);
                });
        }));

        // once all schedules are received: log them to console
        // channel names are in order of API callback, so first order them alphabetically
        Object.keys(schedulesByChannelTitle).sort().forEach(channelTitle => {

            // and then output schedule data for each channel
            console.log(`-------------- ${channelTitle} --------------`);
            schedulesByChannelTitle[channelTitle].forEach(schedule => {
                console.log(stringFormat.schedule(schedule));
            });
        });
    })
    .catch(error => {
        console.error(error);
    });
