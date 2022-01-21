import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Seasons = ({ season, setSeason }) => {
  const [seasonsData, setSesasonsData] = useState([]);
  const getChosenSeason = e => {
    const select = e.target;
    const id = select.children[select.selectedIndex].id;
    setSeason(id);
  };

  useEffect(() => {
    const getSeasonsData = async () => {
      try {
        const data = await axios.get(
          'https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=yxvd55e7jycxapsp9ncm6pfg'
        );
        setSesasonsData(data.data.seasons);
      } catch (err) {
        console.log(err);
        // getSeasonsData();
      }
    };
    getSeasonsData();
  }, [season]);

  return (
    <div>
      <h1>Seasons</h1>
      <select onChange={getChosenSeason} name="seasons" id="">
        <option>Please select a specific season</option>
        {seasonsData.map((season, i) => (
          <option id={season.id} key={i}>
            {season.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Seasons;
