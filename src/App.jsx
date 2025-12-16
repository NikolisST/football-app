import {Routes, Route} from 'react-router-dom'
import GameList from './pages/GameList'
import './App.css'

const App = () => {
  return(
    <Routes>
      <Route path='/' element={<GameList />}/>
    </Routes>
  )
}

export default App;