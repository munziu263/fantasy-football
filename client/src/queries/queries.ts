import { Player } from "../types";
import { Team } from "../types";
import { Position } from "../types";

export const getTeam = (id: number, teams: Team[]) => {
  return teams.find((team: Team) => team.id === id);
};

export const getPosition = (id: number, positions: Position[]) => {
  return positions.find((position: Position) => position.id === id);
};

export const getPlayer = (id: number, players: Player[]) => {
  return players.find((player: Player) => player.id === id);
};
