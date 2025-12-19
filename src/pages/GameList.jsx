  import { useState, useEffect } from 'react'
  import GamesByLeague from '../components/GamesByLeagueGroup/GamesByLeague.jsx'
  import './GameList.styl'
  import { useMemo } from 'react'
  import useGameStore from '../stores/gameStore.js'
  import useGameDetailsStore from '../stores/gameDetailsStore.js'
  import GameDetails from '../components/GameDetailsGroup/GameDetails.jsx'

  const GameList = () => {
    const {games, setGames, date, setSelectedDate} = useGameStore()
    const { selectedGameId, openGame, closeGame } = useGameDetailsStore()

    const [searchName, setSearchName] = useState('')
    const [headerOne, setHeaderOne] = useState("Today's Matches")

    useEffect(() => {
      setGames(date)
    }, [date])

    useEffect(() => {
      const timer = setTimeout(() => {
        setSearchName(searchName)
      }, 250)

      return () => clearTimeout(timer)
    }, [searchName])


    const handleSearch = (event) => {
      setSearchName(event.target.value)
    }  

    const filteredGames = useMemo(() => {
    return searchName
      ? games.filter(g =>
          g.teams.home.name.toLowerCase().includes(searchName.toLowerCase()) ||
          g.teams.away.name.toLowerCase().includes(searchName.toLowerCase()) || 
          g.league.name.toLowerCase().includes(searchName.toLocaleLowerCase())
        )
      : games
  }, [searchName, games])
    
    return(
      <div className='homepage'>
        
        <div className="search-container">
            <form className="search-form">
            <input value={searchName} 
                    onChange={handleSearch}
                    type="text" 
                    placeholder="Search for a game or league..." />
            </form>
        </div>
          <h2> {headerOne} </h2>
        
        <GamesByLeague games={filteredGames}
            onSelectGame={openGame}/>

        {selectedGameId && (
         <div className="modal-backdrop" onClick={closeGame}>
           <div className="modal-content" onClick={e => e.stopPropagation()}>
      
           <GameDetails />
            </div>
          </div>
        )}

          <div className='date-picker'>
            <button onClick ={() =>{ setHeaderOne("Yesterday's Matches");
             setSelectedDate('yesterday')}}
              disabled={date === 'yesterday'}> Yesterday </button>
            <button onClick= {() => {setHeaderOne("Today's Matches"); setSelectedDate('today')}} 
              disabled={date  ==='today'}> Today </button>
            <button onClick={() => {setHeaderOne("Tomorrow's Matches"); setSelectedDate('tomorrow')}} 
              disabled={date==='tomorrow'}> Tomorrow </button>
          </div>

            
      </div>
    )
  }

  export default GameList;
