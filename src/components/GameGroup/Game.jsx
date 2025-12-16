import { useState } from 'react';
import './Game.styl'

const Game = ({game, onSelect}) => {

    const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    })
  }

    return(
        <li className='game-item' 
            onClick={() => onSelect(game.fixture.id)}>

            <div className='team'>
                <img src= {game.teams.home.logo}/>
                <span className='team-name'> {game.teams.home.name} </span>
                <span className='score'> {game.goals.home} </span>
            </div>

            {game.fixture.status.short != "NS" && game.fixture.status.short !== "FT" && (
            <span className="live-indicator">
              <span className="live-dot"></span>
              <span className="live-text">LIVE</span>
            </span>) || game.fixture.status.short === "FT" && (<span className='finished'> Finished </span>) ||
              <span className="kickoff-time">
               {formatTime(game.fixture.date)}
           </span> }

            <div className='team'>
                <img src= {game.teams.away.logo} />
                <span className='team-name'> {game.teams.away.name} </span>
                <span className='score'> {game.goals.away} </span>
            </div>
        </li>
    )
}

export default Game;