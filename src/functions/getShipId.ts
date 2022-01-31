/**
 * @description Get the id from the starship URL
 * @note URL that looks like this: https://swapi.dev/api/starships/12/
 */
export function getShipId(url: string) {
  const shipUrlParts = url.split('/');
  const shipId = shipUrlParts[shipUrlParts.length - 2];

  return shipId;
}
