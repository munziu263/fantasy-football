import { useState, MouseEvent } from "react";
import { getPlayerPosition, getPlayerTeam } from "../queries/queries";
import { Player, Position, Team } from "../types";
import { PlayerCard } from "./PlayerCard";

interface PlayerCarouselProps {
  players: Player[];
  position?: Position;
  teams: Team[];
}

export const PlayerCarousel = (props: PlayerCarouselProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [unselectedPlayers, setUnselectedPlayers] = useState<Player[]>(
    props.players
  );

  const POSITION_LIMIT: { [positionId: number]: number } = {
    1: 2,
    2: 5,
    3: 5,
    4: 3,
  };

  const positionColor: { [position: number]: string } = {
    1: "from-slate-300",
    2: "from-emerald-300",
    3: "from-cyan-300",
    4: "from-blue-300",
  };

  const handlePlayerSelect = (
    event: MouseEvent<HTMLDivElement>,
    player: Player
  ) => {
    event.preventDefault();
    if (
      props.position &&
      selectedPlayers.length < POSITION_LIMIT[props.position.id]
    ) {
      setSelectedPlayers((prevState: Player[]) => [...prevState, player]);
    } else {
      console.log(
        `You have already selected the limit for ${props.position?.plural_name}`
      );
    }

    setUnselectedPlayers((prevState: Player[]) => [...prevState, player]);
  };

  const handlePlayerDeselect = (
    event: MouseEvent<HTMLDivElement>,
    player: Player
  ) => {
    event.preventDefault();
    setUnselectedPlayers((prevState: Player[]) => [...prevState, player]);
    setSelectedPlayers((prevState: Player[]) => [...prevState, player]);
  };

  return (
    <div
      className={`grid grid-cols-12 items-center 
                 bg-slate-900`}
    >
      <div
        className={`col-span-1 bg-zinc-50/10 border-r rounded-lg flex items-center p-2 justify-center m-2 h-full`}
      >
        <p className="text-3xl text-zinc-50 font-extrabold p-2  text-center tracking-widest">
          {`${props.position?.plural_name_short}`}
        </p>
      </div>
      <div
        className={`flex col-span-4 p-2 overflow-x-auto border-b rounded-l-xl bg-gradient-to-r ${
          props.position && positionColor[props.position.id]
        }`}
      >
        {selectedPlayers &&
          selectedPlayers
            .sort((a: Player, b: Player) => a.ict_index_rank - b.ict_index_rank)
            .map((player: Player) => (
              <PlayerCard
                player={player}
                position={props.position}
                team={getPlayerTeam(player, props.teams)}
                key={"player-" + player.code}
                handlePlayerSelect={handlePlayerSelect}
                handlePlayerDeselect={handlePlayerDeselect}
              />
            ))}
        {props.position &&
          [...Array(POSITION_LIMIT[props.position.id])].map((element) => (
            <div className="mx-2 shrink-0 bg-zinc-50/30 rounded-lg w-52 h-[25.5rem]"></div>
          ))}
      </div>
      <div className="flex col-span-7 p-2 overflow-x-auto overscroll-contain">
        {unselectedPlayers &&
          props.players
            .sort((a: Player, b: Player) => a.ict_index_rank - b.ict_index_rank)
            .map((player: Player) => (
              <PlayerCard
                player={player}
                position={props.position}
                team={getPlayerTeam(player, props.teams)}
                key={"player-" + player.code}
                handlePlayerSelect={handlePlayerSelect}
                handlePlayerDeselect={handlePlayerDeselect}
              />
            ))}
      </div>
    </div>
  );
};
