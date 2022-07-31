import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";
import { Team, Player, Position } from "./types";
import { PlayerCard } from "./components/PlayerCard";
import {
  getPosition,
  getTeam,
  getPlayer,
  getPlayerPosition,
  getPlayerTeam,
  getTeamPlayers,
  getPositionPlayers,
  bestPlayerBy,
  filteredPlayersBy,
} from "./queries/queries";

function App() {
  const [teams, setTeams] = useState<Team[]>();
  const [players, setPlayers] = useState<Player[]>();
  const [positions, setPositions] = useState<Position[]>();

  useEffect(() => {
    axios
      .get("/api")
      .then((response: AxiosResponse) => {
        const teams: Team[] = response.data.teams;
        const players: Player[] = response.data.elements;
        const positions: Position[] = response.data.element_types;
        setTeams(teams);
        setPlayers(
          filteredPlayersBy(players, (player: Player) => player.team === 1)
        );
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
          .sort((a: Player, b: Player) => a.element_type - b.element_type)
          .map((player: Player) => (
            <PlayerCard
              player={player}
              position={positions && getPlayerPosition(player, positions)}
              team={teams && getPlayerTeam(player, teams)}
            />
          ))}
    </div>
  );
}

export default App;
