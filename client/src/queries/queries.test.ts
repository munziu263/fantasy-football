import { Player, Team } from "../types";
import { getPlayer } from "./getPlayer";
import { getTeam } from "./getTeam";
import * as data from "../sample-data.json";

test("getPlayer returns the correct player", () => {
  // GIVEN an id and a list of player,
  const id: number = 1;
  const players: Player[] = data.elements;
  // WHEN I call the getPlayer function,
  const player: Player | undefined = getPlayer(id, players);
  // THEN I should have player with the correct id.
  expect(player).toBeDefined();
  expect(player?.id).toBe(id);
});

test("getTeam returns the correct team", () => {
  // GIVEN an id and a list of teams,
  const id: number = 1;
  const teams: Team[] = data.teams;
  // WHEN I call the getTeam function,
  const team: Team | undefined = getTeam(id, teams);
  // Then I should have a team with the correct id.
  expect(team).toBeDefined();
  expect(team?.id).toBe(id);
});

test("getTeamPlayers returns a list of players from the correct team", () => {
  // GIVEN a team and a list of players,
  // WHEN I call the getTeamPlayers function,
  // THEN I should have a list of players from that team,
});

test("getPlayerTeam returns the correct team for that player", () => {
  // GIVEN a player and a list of teams,
  // WHEN I call the getPlayerTeam function,
  // THEN I should have a team which that player is in,
});

test("getPlayerPosition returns that players correct position", () => {
  // GIVEN ,
  // WHEN ,
  // THEN ,
});

test("getPositionPlayers returns a list of players who play that position", () => {
  // GIVEN ,
  // WHEN ,
  // THEN ,
});

test("bestPlayerBy should return the player with the maximum value for that parameter", () => {
  // GIVEN ,
  // WHEN ,
  // THEN ,
});
test;

test("filterPlayerBy should return a list of players that match the predicate", () => {
  // GIVEN ,
  // WHEN ,
  // THEN ,
});

test("cheapestPlayerForWhom should return the cheapest player who matches the predicate", () => {
  // GIVEN ,
  // WHEN ,
  // THEN ,
});
