import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Stats.css";

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function compareStats(playerStat, avgStat) {
  if (playerStat > avgStat) {
    return 'Above Average';
  } else if (playerStat < avgStat) {
    return 'Below Average';
  } else {
    return 'Equal to Average';
  }
}

function performanceResult(playerStat, avgStat) {
  if (playerStat > avgStat) {
    return 'Player has Overperformed';
  } else if (playerStat < avgStat) {
    return 'Player has Underperformed';
  } else {
    return 'Player performance is Equal';
  }
}

function Stats() {
  const [playerName, setPlayerName] = useState('');
  const [playerStats, setPlayerStats] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isFavorites, setIsFavorites] = useState('');

  const [avgStats, setAvgStats] = useState({})
  const [selectedPosition, setSelectedPosition] = useState('');

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const encodedPlayerName = encodeURIComponent(playerName);
      const response = await axios.get(`https://nba-app-vzqb.onrender.com/player/${encodedPlayerName}`);

      console.log('Response Data:', response.data); 
      setPlayerStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching player stats for ${playerName}:`, error);
      setError(`Error fetching player stats for ${playerName}. Please try again later.`);
      setLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(playerStats.player);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorites(true);
  };

  const handlePositionChange = async (e) => {
    const position = e.target.value;
    setSelectedPosition(position);

    try {
      const response = await axios.get(`https://nba-app-vzqb.onrender.com/avg/${position}`);
      console.log('Average Stats for', position, ':', response.data);
      setAvgStats(response.data[0]);
    } catch (error) {
      console.error(`Error fetching average stats for ${position}:`, error);
    }
  };
  
 
  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col style={{ marginLeft: '5px' }}>
          <h1 className="h1" style={{ color: '#FB8122' }}>
            Player Stats
          </h1>
          <div>
          
            <label htmlFor="playerName">Enter Player Name:</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}

          {playerStats.player && Object.keys(playerStats.player).length > 0 && (
            <div>
              <h2 className="h2">Stats for {playerName}</h2>
              <ul className="ul">
                <Link to="/favorites" onClick={handleAddToFavorites}>
                  <button onClick={handleAddToFavorites}>
                    <FontAwesomeIcon icon={faStar} />
                    Add to Favorites
                  </button>
                </Link>
               
                <li>Name: {playerStats.player.players_name}</li>
                <li>Position: {playerStats.player.position}</li>
                <li>Salary: {playerStats.salary}</li>
                <li>PPG: {playerStats.player.points_per_game}</li>
                <li>MPG: {playerStats.player.minutes_per_game}</li>
                <li>FGA: {playerStats.player.field_goal_attempts_per_game}</li>
                <li>FG%: {playerStats.player.field_goal_percentage}</li>
                <li>3PT%: {playerStats.player.minutes_per_game}</li>
                <li>FT%: {playerStats.player.free_throw_percentage}</li>
                <li>OR: {playerStats.player.offensive_rebounds_per_game}</li>
                <li>DR: {playerStats.player.defensive_rebounds_per_game}</li>
                <li>TOTR: {playerStats.player.total_rebounds_per_game}</li>
                <li>AST: {playerStats.player.assists_per_game}</li>
                <li>STL: {playerStats.player.steals_per_game}</li>
                <li>BLK: {playerStats.player.blocks_per_game}</li>
                <li>TO: {playerStats.player.turnovers_per_game}</li>
              </ul>
            </div>
          )}
        </Col>
      </Row>

      
    <Row>
      <Col style={{ marginLeft: '5px' }}>
        <div>
          <label htmlFor="positionDropdown">Select Position:</label>
          <select id="positionDropdown" value={selectedPosition} onChange={handlePositionChange}>
            <option value="">Select Position</option>
            <option value="PG">Point Guard</option>
            <option value="SG">Shooting Guard</option>
            <option value="SF">Small Forward</option>
            <option value="PF">Power Forward</option>
            <option value="C">Center</option>
          </select>
        </div>

        {selectedPosition && Object.keys(avgStats).length > 0 && (
           <div>
           <h2 className="h2">Average Stats for {selectedPosition}</h2>
           <ul className="ul">
             <li>Salary: {avgStats.avg_salary}</li>
             <li>GP: {avgStats.avg_games_played}</li>
             <li>GS: {avgStats.avg_games_started_per_game}</li>
             <li>FGPG: {avgStats.avg_field_goals_per_game}</li>
             <li>FGA: {avgStats.avg_field_goal_attempts_per_game}</li>
             <li>MPG: {avgStats.avg_minutes_per_game}</li>
             <li>FG%: {avgStats.avg_field_goal_percentage}</li>
             <li>3PTFGA: {avgStats.avg_three_point_field_goals_per_game}</li>
             <li>3PT%: {avgStats.avg_three_point_percentage}</li>
             <li>FTA: {avgStats.avg_free_throw_attempts_per_game}</li>
             <li>FTM: {avgStats.avg_free_throws_per_game}</li>
             <li>OR: {avgStats.avg_offensive_rebounds_per_game}</li>
             <li>DR: {avgStats.avg_defensive_rebounds_per_game}</li>
             <li>REB: {avgStats.avg_total_rebounds_per_game}</li>
             <li>AST: {avgStats.avg_assists_per_game}</li>
             <li>AST: {avgStats.avg_assists_per_game}</li>
             <li>STL: {avgStats.avg_steals_per_game}</li>
             <li>BLK: {avgStats.avg_avg_blocks_per_game}</li>
           </ul>
         </div>
       )}
      </Col>
    </Row>
  </Container>
  );
}
export default Stats;
  







 



    
