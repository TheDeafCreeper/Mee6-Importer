import Mee6LevelsApi from 'mee6-levels-api';
import { User, Reward } from 'mee6-levels-api';
import axios from 'axios';

interface Mee6GuildData {
    allow_join: boolean;
    icon: string;
    id: string;
    invite_leaderboard: boolean;
    leaderboard_url: string;
    name: string;
    premium: boolean;
}

interface Mee6APIData {
    admin: boolean;
    banner_url: string;
    guild: Mee6GuildData;
    is_member: boolean;
    players: User[];
    role_rewards: Reward[];
    user_guild_settings: string;
    xp_per_message: number[];
    xp_rate: number;
}

export default async function fetchApiData(guildID: string): Promise<Mee6APIData> {
    try {
        const { data } = await axios.get(`https://mee6.xyz/api/plugins/levels/leaderboard/${guildID}`) as { data: Mee6APIData };
        data.players = await Mee6LevelsApi.getLeaderboard(guildID)
        data.role_rewards = await Mee6LevelsApi.getRoleRewards(guildID)

        return data;
    } catch (err) {
        console.log(`Failed to fetch data for server ${guildID}, did you provide a valid server id?`);
        console.log(`Error Message: ${err}`);
    }

    return {} as Mee6APIData;
}