"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mee6_levels_api_1 = tslib_1.__importDefault(require("mee6-levels-api"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const fs_1 = tslib_1.__importDefault(require("fs"));
async function fetchApiData(guildID) {
    try {
        const { data } = await axios_1.default.get(`https://mee6.xyz/api/plugins/levels/leaderboard/${guildID}`).catch(err => { console.log(`Failed to fetch data. ${err}`); process.exit(1); });
        console.log("Fetching Leaderboard");
        data.players = await mee6_levels_api_1.default.getLeaderboard(guildID).catch(err => { console.log(`Failed to fetch members. ${err}`); return []; });
        console.log(`Fetched ${data.players.length} members.`);
        console.log(`Fetching Role Rewards.`);
        data.role_rewards = await mee6_levels_api_1.default.getRoleRewards(guildID).catch(err => { console.log(`Failed to fetch role rewards. ${err}`); return []; });
        console.log(`Fetched ${data.role_rewards.length} rewards.`);
        return data;
    }
    catch (err) {
        console.log(`Failed to fetch data for server ${guildID}, did you provide a valid server id?`);
        console.log(`Error Message: ${err}`);
    }
    return {};
}
exports.default = fetchApiData;
async function main() {
    let data = await fetchApiData("663661005514997770").catch(err => {
        console.error(err);
    });
    fs_1.default.writeFileSync("./data", JSON.stringify(data));
    process.exit(0);
}
main();
