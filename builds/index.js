"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mee6_levels_api_1 = (0, tslib_1.__importDefault)(require("mee6-levels-api"));
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
async function fetchApiData(guildID) {
    try {
        const { data } = await axios_1.default.get(`https://mee6.xyz/api/plugins/levels/leaderboard/${guildID}`);
        data.players = await mee6_levels_api_1.default.getLeaderboard(guildID);
        data.role_rewards = await mee6_levels_api_1.default.getRoleRewards(guildID);
        return data;
    }
    catch (err) {
        console.log(`Failed to fetch data for server ${guildID}, did you provide a valid server id?`);
        console.log(`Error Message: ${err}`);
    }
    return {};
}
exports.default = fetchApiData;
async function run() {
    console.log(await fetchApiData('0'));
}
run();
