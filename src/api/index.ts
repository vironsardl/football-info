import { apiOptions, matchesArea, matchesType } from "@/types"
// import { get } from "http"

const option:apiOptions = {
    next: {revalidate:30},
    headers: {
        "X-Auth-Token": process.env.API_TOKEN,
        "Content-Type": "application/json"
    }
}

export const getMatchesFootball = async () => {
    const matchData = await fetch("https://api.football-data.org/v4/matches", option)
    return matchData.json()
}

const todayDate = new Date();
const getDateMonth = new Date(todayDate.getTime())
getDateMonth.setDate(todayDate.getDate() - 1)
const year = getDateMonth.getFullYear()
const month = String(getDateMonth.getMonth() + 1).padStart(2, "0")
const day = String(getDateMonth.getDate() + 1).padStart(2, "0")

const yesterday = [year, month, day].join('-')


export const getMatchesFootballFinished = async () => {
    const matchData = await fetch(`https://api.football-data.org/v4/matches?date=${yesterday}`, option)
    return matchData.json()
}

export const getNewsInfo = async () => {
    const newsData = await fetch(`https://newsapi.org/v2/everything?q=football&apiKey=${process.env.API_TOKEN_NEWS}&q=soccer&pageSize=5`, {next:{revalidate:30}})
    return newsData.json()
}


export const filterLeague = async (filterData:string) => {
    const getLeauge = await getMatchesFootball()
    const filterLeague:matchesType[] = getLeauge.matches
    const getData = filterLeague.filter((item) => item.competition.name === filterData)
    return getData
}