import { useState, useEffect } from 'react'
import footballService from '../../services/football.js'
import './GameDetails.styl'

const GameDetails = ({gameId, onClose}) => {
    const [homeStats, setHomeStats] = useState(null);
    const [awayStats, setAwayStats] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const homeStatsRes = await footballService.getGameStats(gameId);
        setHomeStats(homeStatsRes.response[0]);
        console.log(homeStatsRes)

        const awayStatsRes = await footballService.getGameStats(gameId);
        setAwayStats(awayStatsRes.response[1]);
        console.log(awayStatsRes)
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [gameId])

    if(!homeStats || !awayStats){
      return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center', height:'100vh'}}>
          <p> Stats not available </p>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      )
    }
    

    const homeShotsOnGoal = homeStats.statistics.find(x => x.type === 'Shots on Goal').value
    const homeTotalShots = homeStats.statistics.find(x => x.type === 'Total Shots').value
    const homeFouls = homeStats.statistics.find(x => x.type === 'Fouls').value
    const homeCorners = homeStats.statistics.find(x => x.type === 'Corner Kicks').value
    const homeOffsides = homeStats.statistics.find(x => x.type === 'Offsides').value
    const homePossesion = homeStats.statistics.find(x => x.type === 'Ball Possession').value
    const homeYellowCards = homeStats.statistics.find(x => x.type === 'Yellow Cards').value
    const homeRedCards = homeStats.statistics.find(x => x.type === 'Red Cards').value

    const awayShotsOnGoal = awayStats.statistics.find(x => x.type === 'Shots on Goal').value
    const awayTotal = awayStats.statistics.find(x => x.type === 'Total Shots').value
    const awayFouls = awayStats.statistics.find(x => x.type === 'Fouls').value
    const awayCorners = awayStats.statistics.find(x => x.type === 'Corner Kicks').value
    const awayOffsides = awayStats.statistics.find(x => x.type === 'Offsides').value
    const awayPossesion = awayStats.statistics.find(x => x.type === 'Ball Possession').value
    const awayYellowCards = awayStats.statistics.find(x => x.type === 'Yellow Cards').value
    const awayRedCards = awayStats.statistics.find(x => x.type === 'Red Cards').value


    return(
        <div className='game-details'>
            <button className="close-btn" onClick={onClose}>✕</button>

            <div className='head-to-head'>
              <div className='team'>
                <img src={homeStats.team.logo}/>
                <span> {homeStats.team.name} </span>
              </div>

              <span> - </span>

              <div className='team'>
                <img src={awayStats.team.logo}/>
                <span> {awayStats.team.name} </span>
              </div>
            </div>

            <div className='stats'>

              <div className='stats-row'>
                <span> {homeShotsOnGoal} </span> Shots on Goal <span> {awayShotsOnGoal}</span>
              </div>

                <div className='stats-row'>
                    <span>{homeTotalShots}</span> Total Shots <span>{awayTotal}</span>
                </div>

                <div className='stats-row'>
                    <span>{homeFouls}</span> Fouls <span>{awayFouls}</span>
                </div>

                <div className='stats-row'>
                    <span>{homeCorners}</span> Corners <span>{awayCorners}</span>
                </div>

                <div className='stats-row'>
                    <span>{homeOffsides}</span> Offsides <span>{awayOffsides}</span>
                </div>

                <div className='stats-row'>
                    <span>{homePossesion}</span> Possession <span>{awayPossesion}</span>
                </div>

                <div className='stats-row'>
                    <span>{homeYellowCards}</span> Yellow Cards <span>{awayYellowCards}</span>
                </div>

                <div className='stats-row'>
                    <span>{homeRedCards}</span> Red Cards <span>{awayRedCards}</span>
                </div>
            </div>
        </div>
    )
}

export default GameDetails;