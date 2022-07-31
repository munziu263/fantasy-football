import { Player, Position, Team } from "../types";

interface PlayerCardProps {
  player: Player;
  position?: Position;
  team?: Team;
}

export const PlayerCard = (props: PlayerCardProps) => {
  const imageUrlBase =
    "https://resources.premierleague.com/premierleague/photos/players/110x140/p";
  const teamShirtImageUrlBase =
    "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_";
  const teamShirtImageUrlSuffix = "-66.webp";

  const positionColor: { [position: number]: string } = {
    1: "from-slate-600 to-slate-900",
    2: "from-emerald-800 to-slate-900",
    3: "from-cyan-800 to-slate-900",
    4: "from-blue-800 to-slate-900",
  };

  const borderHoverColor: { [position: number]: string } = {
    1: "hover:border-slate-300",
    2: "hover:border-emerald-300",
    3: "hover:border-cyan-300",
    4: "hover:border-blue-300",
  };

  const shadowHoverColor: { [position: number]: string } = {
    1: "hover:shadow-slate-500",
    2: "hover:shadow-emerald-500",
    3: "hover:shadow-cyan-500",
    4: "hover:shadow-blue-900",
  };

  return (
    <div
      className={`grid grid-cols-12 
                  rounded-lg container 
                  m-2 w-52 
                  bg-zinc-400 
                  border hover:border-2 
                  border-slate-700 ${
                    borderHoverColor[props.player.element_type]
                  }
                  hover:shadow-md ${
                    shadowHoverColor[props.player.element_type]
                  } hover:shadow-blue-900 
                  overflow-hidden static`}
      key={props.player.code}
    >
      {/* Player Image */}
      <div
        className={`relative col-span-12 
                    bg-gradient-to-br ${
                      positionColor[props.player.element_type]
                    }`}
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
      <div className="col-span-12 p-2 text-center my-auto">
        <p className={"text-sm text-zinc-700"}>
          {props.position && props.position.singular_name}
        </p>
        <p className="text-xl text-zinc-900 font-bold">
          {props.player.web_name}
        </p>
      </div>
    </div>
  );
};
