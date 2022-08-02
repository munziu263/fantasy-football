import { MouseEvent, useState } from "react";
import { Player, Position, Team } from "../types";

interface PlayerCardProps {
  player: Player;
  position?: Position;
  team?: Team;
}

export const PlayerCard = (props: PlayerCardProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const imageUrlBase =
    "https://resources.premierleague.com/premierleague/photos/players/110x140/p";
  const teamShirtImageUrlBase =
    "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_";
  const teamShirtImageUrlSuffix = "-66.webp";

  const positionColor: { [position: number]: string } = {
    1: "from-slate-600 via-slate-800 to-slate-900",
    2: "from-emerald-800 via-slate-800 to-slate-900",
    3: "from-cyan-800 via-slate-800 to-slate-900",
    4: "from-blue-900 via-slate-800 to-slate-900",
  };

  const borderHoverColor: { [position: number]: string } = {
    1: "hover:border-slate-300",
    2: "hover:border-emerald-300",
    3: "hover:border-cyan-300",
    4: "hover:border-blue-300",
  };

  const borderSelectedColor: { [position: number]: string } = {
    1: "border-slate-300",
    2: "border-emerald-300",
    3: "border-cyan-300",
    4: "border-blue-300",
  };

  const shadowHoverColor: { [position: number]: string } = {
    1: "hover:shadow-slate-500",
    2: "hover:shadow-emerald-500",
    3: "hover:shadow-cyan-500",
    4: "hover:shadow-blue-900",
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsSelected(!isSelected);
    console.log(isSelected);
  };

  return (
    <div
      className={`grid grid-cols-12 
                  rounded-lg container 
                  m-2 w-52 max-h-[25.5rem]  
                  bg-zinc-400 
                  ${isSelected ? "border-2" : "border"} hover:border-2 
                  ${
                    isSelected
                      ? borderSelectedColor[props.player.element_type]
                      : "border-slate-700"
                  } ${borderHoverColor[props.player.element_type]}
                  hover:shadow-md ${
                    shadowHoverColor[props.player.element_type]
                  } hover:shadow-blue-900 
                  overflow-hidden static
                  ${isSelected ? "scale-95" : "scale-100"}
                  transition duration-700
                  hover:scale-95 hover:transition hover:duration-700`}
      key={props.player.code}
    >
      {/* Player Image */}
      <div
        className={`relative col-span-12 
                    bg-gradient-to-t ${
                      positionColor[props.player.element_type]
                    }`}
        onClick={handleClick}
      >
        <p className="absolute top-0 left-0 p-2 text-lg font-bold text-zinc-50">
          {props.team && props.team.short_name}
        </p>
        <p className="absolute top-0 right-0 p-2 text-xl text-zinc-50 font-bold">
          {`£${(props.player.now_cost / 10).toFixed(1)}`}
        </p>
        <img
          className="w-full"
          src={imageUrlBase + props.player.photo.replace(".jpg", ".png")}
          alt={props.player.web_name}
          onError={(event: any) => {
            event.target.src = props.team
              ? teamShirtImageUrlBase +
                props.team.code +
                teamShirtImageUrlSuffix
              : "";
            event.onError = null;
          }}
        />
      </div>
      {/* Player Details */}
      <div className="col-span-12 p-1 text-center my-auto">
        <p className={"text-sm text-zinc-700"}>
          {props.position && props.position.singular_name}
        </p>
        <p className="text-xl text-zinc-900 font-bold">
          {props.player.web_name}
        </p>
      </div>
      <div className="text-sm text-zinc-50 font-extrabold col-span-12 bg-slate-900 py-2 text-center">
        RANKED
      </div>
      <div className="text-xs text-center col-span-3 py-1 bg-slate-300">
        <p>INF</p>
        <p className="text-lg font-bold">{props.player.influence_rank}</p>
      </div>
      <div className="text-xs text-center col-span-3 py-1 bg-slate-400">
        <p>CRE</p>
        <p className="text-lg font-bold">{props.player.creativity_rank}</p>
      </div>
      <div className="text-xs text-center col-span-3 py-1 bg-slate-500">
        <p>THR</p>
        <p className="text-lg font-bold">{props.player.threat_rank}</p>
      </div>
      <div className="text-xs text-center text-zinc-50 col-span-3 p-1 bg-slate-900">
        <p>ICT</p>
        <p className="text-lg font-bold">{props.player.ict_index_rank}</p>
      </div>
    </div>
  );
};
