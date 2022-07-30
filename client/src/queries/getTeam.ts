import { Team } from "../types";

export const getTeam = (id: number, teams: Team[]) => {
  const team: Team | undefined = teams.find((team: Team) => team.id === id);
  return team;
};
