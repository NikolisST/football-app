import Game from '../GameGroup/Game.jsx'
import './GamesByLeague.styl'

const GamesByLeague = ({games, onSelectGame}) => {
    const groups = {}

    games.forEach(game => {
        const league = game.league.name;

        if(!groups[league]){
            groups[league] = []
        }

        groups[league].push(game)

        return groups;
    });

    return(
        <div>
            {Object.entries(groups).map(([league, games]) => (
                <div key={league}>
                    <h2> {league} </h2>

                    <ul className='games-container'>
                        {games.map(game => (
                            <Game key={game.fixture.id} 
                              game = {game} 
                              onSelect={onSelectGame}/>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default GamesByLeague;