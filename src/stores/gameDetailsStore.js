import { create } from "zustand";
import footballService from '../services/football.js'

const mapStats = (statsArray) => {
    const mapped = {}

    statsArray.forEach(stat => {
        mapped[stat.type] = stat.value
    })

    return mapped
}

const useGameDetailsStore = create((set) => ({
    selectedGameId: null,
    homeStats: null,
    awayStats: null,
    loading: null,
    error: null,

    openGame: async (gameId) => {
        set({selectedGameId: gameId, loading: true, error: null})

        try{
            const result = await footballService.getGameStats(gameId)
            const home = result.response[0]
            const away = result.response[1]

            set({
                homeStats: {
                    team: home.team,
                    stats: mapStats(home.statistics)
                },

                awayStats: {
                    team: away.team,
                    stats: mapStats(away.statistics)
                },
                loading: false
            })
        }

        catch(err){
            set({ error: err.message, loading: false})
        }
    },

    closeGame: () => {
        set({
            selectedGameId: null,
            homeStats: null,
            awayStats: null,
            loading: null,
            error: null
        })
    }
}))

export default useGameDetailsStore