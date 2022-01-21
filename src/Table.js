import React from 'react';
import { useEffect } from 'react';

const Table = ({ sportsData, season, getSportsData }) => {
  useEffect(() => {
    getSportsData();
  }, [season]);

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th scope="col">Team 1</th>
            <th scope="col">Team 2</th>
            <th scope="col">Result</th>
            <th scope="col">Match Date</th>
            <th scope="col">Half Time Score</th>
            <th scope="col">Stadium Name</th>
          </tr>
        </thead>
        <tbody>
          {sportsData.map((data, i) => (
            <tr key={i}>
              {/*  TEAM 1 COLUMN */}
              {data.sport_event_status.winner_id ===
              data.sport_event.competitors[0].id ? (
                <td
                  className="team1"
                  style={{ backgroundColor: 'green', fontWeight: 600 }}
                >
                  {data.sport_event.competitors[0].name}
                </td>
              ) : data.sport_event_status.status === 'postponed' ||
                data.sport_event_status.match_tie === true ? (
                <td className="team1" style={{ backgroundColor: 'orange' }}>
                  {data.sport_event.competitors[0].name}
                </td>
              ) : (
                <td className="team1" style={{ backgroundColor: 'red' }}>
                  {data.sport_event.competitors[0].name}
                </td>
              )}
              {/* TEAM 2 COLUMN */}
              {data.sport_event_status.winner_id ===
              data.sport_event.competitors[1].id ? (
                <td
                  className="team2"
                  style={{ backgroundColor: 'green', fontWeight: 600 }}
                >
                  {data.sport_event.competitors[1].name}
                </td>
              ) : data.sport_event_status.status === 'postponed' ||
                data.sport_event_status.match_tie === true ? (
                <td className="team2" style={{ backgroundColor: 'orange' }}>
                  {data.sport_event.competitors[1].name}
                </td>
              ) : data.sport_event_status.winner_id !==
                data.sport_event.competitors[1].id ? (
                <td className="team2" style={{ backgroundColor: 'red' }}>
                  {data.sport_event.competitors[1].name}
                </td>
              ) : (
                ''
              )}

              {/* RESULT COLUMN */}
              {data.sport_event_status.match_tie &&
              data.sport_event_status.status === 'closed' ? (
                <td className="result">Draw</td>
              ) : data.sport_event_status.winner_id ===
                data.sport_event.competitors[0].id ? (
                data.sport_event.competitors[0].name
              ) : data.sport_event_status.status === 'postponed' ? (
                <td className="result">Postponed</td>
              ) : data.sport_event_status.status === 'not_started' ? (
                <td className="result">Not Started</td>
              ) : (
                <td className="result">
                  {data.sport_event.competitors[1].name}
                </td>
              )}

              {/* MATCH DATE COLUMN */}
              <td className="match-date">
                {data.sport_event.start_time.slice(0, 10)}
              </td>

              {/* HALF TIME SCORE COLUMN */}
              <td className="half-time-score">
                {data.sport_event_status.status === 'postponed'
                  ? 'Postponed'
                  : data.sport_event_status.status === 'not_started'
                  ? 'Not started'
                  : `${data.sport_event_status.period_scores[0].home_score}:${data.sport_event_status.period_scores[0].away_score}`}
              </td>

              {/* STADIUM NAME COLUMN */}
              <td>{data.sport_event.venue.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
