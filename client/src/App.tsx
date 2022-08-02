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
  cheapestXPlayersForWhom,
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
          cheapestXPlayersForWhom(
            20,
            (player: Player) => player.ict_index_rank <= 50,
            players
          )
        );
        setPositions(positions);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-wrap items-start bg-slate-900 bg-fixed min-h-screen top-0 left-0">
      <div className="flex flex-wrap bg-slate-900">
        {players &&
          players
            // .sort((a: Player, b: Player) => a.ict_index_rank - b.ict_index_rank)
            .map((player: Player) => (
              <PlayerCard
                player={player}
                position={positions && getPlayerPosition(player, positions)}
                team={teams && getPlayerTeam(player, teams)}
                key={"player-" + player.code}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
