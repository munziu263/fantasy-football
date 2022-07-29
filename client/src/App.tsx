import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
import { Team, Player, Position } from "./types";
import { PlayerCard } from "./components/PlayerCard";

function App() {
  const [teams, setTeams] = useState<Team[]>();
  const [players, setPlayers] = useState<Player[]>();
  const [positions, setPositions] = useState<Position[]>();

  const getPosition = (player: Player, positions: Position[]) => {
    const position: Position | undefined = positions.find(
      (position: Position) => position.id === player.element_type
    );
    return position;
  };

  const getTeam = (player: Player, teams: Team[]) => {
    const team: Team | undefined = teams.find(
      (team: Team) => team.id === player.team
    );
    return team;
  };

  useEffect(() => {
    axios
      .get("/api")
      .then((response: AxiosResponse) => {
        const teams: Team[] = response.data.teams;
        const players: Player[] = response.data.elements;
        const positions: Position[] = response.data.element_types;
        setTeams(teams);
        setPlayers(players);
        setPositions(positions);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-wrap bg-slate-900">
      {players &&
        players
          .filter((player: Player) => player.team === 6)
          .map((player: Player) => (
            <PlayerCard
              player={player}
              position={positions && getPosition(player, positions)}
              team={teams && getTeam(player, teams)}
            />
          ))}
    </div>
  );
}

export default App;
