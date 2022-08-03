interface DashboardProps {
  budget: number;
  expectedPoints: number;
}

export const Dashboard = (props: DashboardProps) => {
  return (
    <div className="grid grid-cols-12 justify-between h-fit pb-2">
      <div className="col-span-2 bg-slate-300">
        <div className="grid grid-cols-3 grayscale">
          <img
            className="col-span-1 m-auto"
            src="https://fantasy.premierleague.com/static/media/pl-logo-lion.ad772272.svg"
            alt=""
          />
          <div className="col-span-2 my-auto">
            <p className="text-4xl font-extrabold align-bottom">FPL</p>
            <p className="font-bold">TEAM BUILDER</p>
          </div>
        </div>
      </div>
      <div className="col-span-5 m-auto text-center">
        <div className="text-2xl text-zinc-50 font-light tracking-widest">
          BUDGET
        </div>
        <div className=" text-emerald-400 font-bold text-5xl">
          {"£" + props.budget / 10 + "M"}
        </div>
      </div>
      <div className="col-span-5 text-center m-auto">
        <div className="text-2xl  text-zinc-50 font-light tracking-widest">
          EXP. POINTS NEXT ROUND
        </div>
        <div className="text-5xl font-bold text-zinc-50">
          {props.expectedPoints}
        </div>
      </div>
    </div>
  );
};
