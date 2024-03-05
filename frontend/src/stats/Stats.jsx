import axios from 'axios';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Stats.css";

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Function to compare specific stats and return the result
function compareStats(playerStat, avgStat) {
  if (playerStat > avgStat) {
    return 'Above Average';
  } else if (playerStat < avgStat) {
    return 'Below Average';
  } else {
    return 'Equal to Average';
  }
}

// Function to determine performance result
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
  // State for getting player stats
  const [playerName, setPlayerName] = useState('');
  const [playerStats, setPlayerStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isFavorites, setIsFavorites] = useState('');

  // State for getting avg stats by position
  // new state for position and avgstats
  const [avgStats, setAvgStats] = useState({})
  const [selectedPosition, setSelectedPosition] = useState('');

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
  };

  // get playerStats by playerName from backend api
  const handleSearch = async () => {
    setLoading(true);
    try {
      const encodedPlayerName = encodeURIComponent(playerName);
      const response = await axios.get(`http://localhost:3500/player/${encodedPlayerName}`);
      
      console.log('Response Data:', response.data); 
// define useState for playerStats
      setPlayerStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching player stats for ${playerName}:`, error);
      setError(`Error fetching player stats for ${playerName}. Please try again later.`);
      setLoading(false);
    }
  };

  // adding favorite players to /favorites page
  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(playerStats.player); // Fix typo 'playerStatstats' to 'playerStats'
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorites(true);
  };

  // Get AvgStats from backend localhost:3500/avg/:position
  const handlePositionChange = async (e) => {
    const position = e.target.value;
    setSelectedPosition(position);

    try {
      const response = await axios.get(`http://localhost:3500/avg/${position}`);
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
            {/* Player Stats Input Section */}
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
                <li>FG%: {playerStats.player.field_goal_percentage}</li>
                <li>3PT%: {playerStats.player.minutes_per_game}</li>
                <li>FT%: {playerStats.player.free_throw_percentage}</li>
                <li>REB: {playerStats.player.total_rebounds_per_game}</li>
                <li>AST: {playerStats.player.assists_per_game}</li>
                <li>STL: {playerStats.player.steals_per_game}</li>
                <li>BLK: {playerStats.player.blocks_per_game}</li>
                <li>REB: {playerStats.player.total_rebounds_per_game}</li>
              </ul>
            </div>
          )}
        </Col>
      </Row>

        {/* Average Stats Display Section */}
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

        {/* Comparison Section */}
        {selectedPosition && Object.keys(avgStats).length > 0 && (
          <div>
            <h2 className="h2">Comparison</h2>
            <ul className="ul">
              
              <li>PPG Comparison: {compareStats(playerStats.player.points_per_game, avgStats.avg_points_per_game)}</li>
              <li>MPG Comparison: {compareStats(playerStats.player.minutes_per_game, avgStats.avg_minutes_per_game)}</li>
              <li>FG% Comparison: {compareStats(playerStats.player.field_goal_percentage, avgStats.avg_field_goal_percentage)}</li>
              <li>3PT% Comparison: {compareStats(playerStats.player.three_point_percentage, avgStats.avg_three_point_percentage)}</li>
              <li>REB Comparison: {compareStats(playerStats.player.total_rebounds_per_game, avgStats.avg_total_rebounds_per_game)}</li>
              <li>AST Comparison: {compareStats(playerStats.player.assists_per_game, avgStats.avg_assists_per_game)}</li>
              <li>BLK Comparison: {compareStats(playerStats.player.blocks_per_game, avgStats.avg_avg_blocks_per_game)}</li>
              
            </ul>
          </div>
        )}

        {/* Separate Container, Row, and Col for Over/Under Performance */}
        <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <Row>
            <Col style={{ marginLeft: '5px' }}>
              {/* Display Over/Under Performance here */}
              {selectedPosition && Object.keys(avgStats).length > 0 && (
                <div>
                  <h2 className="h2">Performance Result</h2>
                  <p>PPG: {performanceResult(playerStats.player.points_per_game, avgStats.avg_points_per_game)}</p>
                  <p>MPG: {performanceResult(playerStats.player.minutes_per_game, avgStats.avg_minutes_per_game)}</p>
                  <p>FG%: {performanceResult(playerStats.player.field_goal_percentage, avgStats.avg_field_goal_percentage)}</p>
                  <p>3PT%: {performanceResult(playerStats.player.three_point_percentage, avgStats.avg_three_point_percentage)}</p>
                  <p>REB: {performanceResult(playerStats.player.total_rebounds_per_game, avgStats.avg_total_rebounds_per_game)}</p>
                  <p>AST: {performanceResult(playerStats.player.assists_per_game, avgStats.avg_assists_per_game)}</p>
                  <p>BLK: {performanceResult(playerStats.player.blocks_per_game, avgStats.avg_avg_blocks_per_game)}</p>
                  {/* Add more performance results for other stats as needed */}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
);
              }
export default Stats;
  