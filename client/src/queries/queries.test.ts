import { Player, Position, Team } from "../types";
import { getPlayer, getTeam, getPosition } from "./queries";
import * as data from "../sample-data.json";

test("getPlayer returns the correct player", () => {
  // GIVEN an id and a list of player,
  const id: number = 1;
  const players: Player[] = data.elements;
  // WHEN I call the getPlayer function,
  const player: Player | undefined = getPlayer(id, players);
  // THEN I should have the correct player.
  expect(player).toBeDefined();
  expect(player?.id).toBe(id);
});

test("getTeam returns the correct team", () => {
  // GIVEN an id and a list of teams,
  const id: number = 1;
  const teams: Team[] = data.teams;
  // WHEN I call the getTeam function,
  const team: Team | undefined = getTeam(id, teams);
  // THEN I should have the correct team.
  expect(team).toBeDefined();
  expect(team?.id).toBe(id);
});

test("getPosition returns the correct position", () => {
  // GIVEN an id and a list of teams,
  const id: number = 1;
  const positions: Position[] = data.element_types;
  // WHEN I call the getPosition function,
  const position: Position | undefined = getPosition(id, positions);
  // THEN I should have the correct position.
  expect(position).toBeDefined();
  expect(position?.id).toBe(id);
});

test("getTeamPlayers returns a list of players from the correct team", () => {
  // GIVEN a team and a list of players,
  // WHEN I call the getTeamPlayers function,
  // THEN I should have a list of players from that team.
});

test("getPlayerTeam returns the correct team for that player", () => {
  // GIVEN a player and a list of teams,
  // WHEN I call the getPlayerTeam function,
  // THEN I should have the team which that player is in.
});

test("getPlayerPosition returns that players correct position", () => {
  // GIVEN a player and a list of positions,
  // WHEN when I call the getPlayerPosition function,
  // THEN I should have a position with the correct id.
});

test("getPositionPlayers returns a list of players who play that position", () => {
  // GIVEN a position and a list of players,
  // WHEN I call the getPositionPlayers function,
  // THEN I should have a list of players who play that position.
});

test("bestPlayerBy should return the (best) player with the maximum value for that parameter", () => {
  // GIVEN a parameter and list of players,
  // WHEN I call bestPlayerBy,
  // THEN I should have the (best) player who has the maximum value for that parameter.
});

test("filterPlayerBy should return a list of players that match the predicate", () => {
  // GIVEN given a predicate and a list of players,
  // WHEN when I call filterPlayerBy,
  // THEN I should receive a list of players that match that predicate.
});

test("cheapestPlayerForWhom should return the (best) cheapest player who matches the predicate", () => {
  // GIVEN ,
  // WHEN ,
  // THEN .
});
