import { Player } from "../types";

export const getPlayer = (id: number, players: Player[]) => {
  const player: Player | undefined = players.find(
    (player: Player) => player.id === id
  );
  return player;
};
