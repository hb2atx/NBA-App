import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div>
          {favorites.map((player, index) => (
            <Card key={index} style={{ width: '18rem', margin: '10px' }}>
              <Card.Body>
                <Card.Title>{player.players_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Position: {player.position}</Card.Subtitle>
                <Card.Text>
                  
                  Age: {player.age}
                  <li>Name: {playerStats.player.players_name}</li>
                  <li>Position: {playerStats.player.position}</li>
                  <li>Salary: {playerStats.player.salary}</li>
                  <li>MPG: {playerStats.player.minutes_per_game}</li>
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
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;