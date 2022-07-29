import { Player, Position, Team } from "../types";

interface PlayerCardProps {
  player: Player;
  position?: Position;
  team?: Team;
}

export const PlayerCard = (props: PlayerCardProps) => {
  const imageUrlBase =
    "https://resources.premierleague.com/premierleague/photos/players/250x250/p";
  const teamShirtImageUrlBase =
    "https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_";
  const teamShirtImageUrlSuffix = "-66.webp";
  return (
    <div
      className="grid grid-cols-12 rounded-xl container m-2 w-52 bg-zinc-400 border hover:border-2 border-slate-700 hover:shadow-md hover:shadow-blue-900 overflow-hidden static"
      key={props.player.code}
    >
      {/* Player Image */}
      <div className="relative col-span-12 bg-slate-800">
        <p className="absolute top-0 left-0 p-2 text-lg font-bold text-zinc-50">
          {props.team && props.team.short_name}
        </p>
        <p className="absolute top-0 right-0 p-2 text-4xl text-zinc-50 font-bold">
          {props.player.id}
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
      <div className="col-span-4"></div>
      <div className="col-span-8 p-2 rounded-xl items-end text-right">
        <p className="text-xl text-zinc-900 font-bold">
          {props.player.web_name}
        </p>
        <p className="text-sm text-zinc-700">
          {props.position && props.position.singular_name}
        </p>
      </div>
    </div>
  );
};
