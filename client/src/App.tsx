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
import { PlayerCarousel } from "./components/PlayerCarousel";

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);

  const [goalkeepers, setGoalkeepers] = useState<Player[]>([]);
  const [defenders, setDefenders] = useState<Player[]>([]);
  const [midfielders, setMidfielders] = useState<Player[]>([]);
  const [forwards, setForwards] = useState<Player[]>([]);

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
        setGoalkeepers(
          filteredPlayersBy(
            response.data.elements,
            (player: Player) => player.element_type === 1
          )
        );
        setDefenders(
          filteredPlayersBy(
            response.data.elements,
            (player: Player) => player.element_type === 2
          )
        );
        setMidfielders(
          filteredPlayersBy(
            response.data.elements,
            (player: Player) => player.element_type === 3
          )
        );
        setForwards(
          filteredPlayersBy(
            response.data.elements,
            (player: Player) => player.element_type === 4
          )
        );
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="items-start bg-slate-900 bg-fixed min-h-screen top-0 left-0">
      {goalkeepers &&
        defenders &&
        midfielders &&
        forwards &&
        [goalkeepers, defenders, midfielders, forwards].map(
          (group: Player[], i: number) => {
            return (
              <PlayerCarousel
                players={group}
                position={getPosition(i + 1, positions)}
                teams={teams}
              />
            );
          }
        )}
    </div>
  );
}

export default App;
