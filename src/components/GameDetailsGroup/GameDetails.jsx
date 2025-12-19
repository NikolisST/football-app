import useGameDetailsStore from '../../stores/gameDetailsStore'
import './GameDetails.styl'

const GameDetails = () => {
  const {
    homeStats,
    awayStats,
    loading,
    error,
    closeGame
  } = useGameDetailsStore()

  if (loading) {
    return <p>Loading stats...</p>
  }

  if (error) {
    return <p>Stats not available </p>
  }

  if (!homeStats || !awayStats) return null

  return (
    <div className='game-details'>
      <button className="close-btn" onClick={closeGame}>✕</button>

      <div className='head-to-head'>
        <div className='team'>
          <img src={homeStats.team.logo} />
          <span>{homeStats.team.name}</span>
        </div>

        <span>-</span>

        <div className='team'>
          <img src={awayStats.team.logo} />
          <span>{awayStats.team.name}</span>
        </div>

      </div>

        <div className='stats-row'>
    <span>{homeStats.stats['Shots on Goal'] ?? 0}</span>
    Shots on Goal
    <span>{awayStats.stats['Shots on Goal'] ?? 0}</span>
  </div>

  <div className='stats-row'>
    <span>{homeStats.stats['Total Shots'] ?? 0}</span>
    Total Shots
    <span>{awayStats.stats['Total Shots'] ?? 0}</span>
  </div>

  <div className='stats-row'>
    <span>{homeStats.stats['Fouls'] ?? 0}</span>
    Fouls
    <span>{awayStats.stats['Fouls'] ?? 0}</span>
  </div>

  <div className='stats-row'>
    <span>{homeStats.stats['Corner Kicks'] ?? 0}</span>
    Corners
    <span>{awayStats.stats['Corner Kicks'] ?? 0}</span>
  </div>

  <div className='stats-row'>
    <span>{homeStats.stats['Offsides'] ?? 0}</span>
    Offsides
    <span>{awayStats.stats['Offsides'] ?? 0}</span>
  </div>

  <div className='stats-row'>
    <span>{homeStats.stats['Ball Possession'] ?? '0%'}</span>
    Possession
    <span>{awayStats.stats['Ball Possession'] ?? '0%'}</span>
  </div>

  <div className='stats-row'>
    <span>{homeStats.stats['Yellow Cards'] ?? 0}</span>
    Yellow Cards
    <span>{awayStats.stats['Yellow Cards'] ?? 0}</span>
  </div>

  <div className='stats-row'>
    <span>{homeStats.stats['Red Cards'] ?? 0}</span>
    Red Cards
    <span>{awayStats.stats['Red Cards'] ?? 0}</span>
  </div>
    </div>
  )
}

export default GameDetails
