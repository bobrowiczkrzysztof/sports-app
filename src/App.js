import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from './Table';
import Seasons from './Seasons';

function App() {
  const [sportsData, setSportsData] = useState([]);
  const [season, setSeason] = useState();
  const getSportsData = async () => {
    try {
      const data = await axios.get(
        `https://api.sportradar.us/soccer/trial/v4/en/seasons/${season}/schedules.json?api_key=yxvd55e7jycxapsp9ncm6pfg`,
        {
          headers: {
            'X-Originating-IP': '78.11.152.170',
          },
        }
      );
      setSportsData(data.data.schedules);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSportsData();
  }, [season]);

  return (
    <div className="App">
      <Seasons
        season={season}
        setSeason={setSeason}
        getSportsData={getSportsData}
      />
      <Table
        sportsData={sportsData}
        season={season}
        getSportsData={getSportsData}
      />
    </div>
  );
}

export default App;
