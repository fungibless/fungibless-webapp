import { withPrefix } from 'gatsby';
import twwTokens from '../data/tww-tokens.json';

export function toTwwToken(tokenId) {
  const id = Number(tokenId.toString());
  return {
    tokenId: id,
    name: `TWW #${id}`,
    ...twwTokens[id],
    image: withPrefix(`/images/tww/${id}.png`),
  };
}

export async function loadOwnedTwwTokens(twwContract, account) {
  const tokenIds = await twwContract.walletOfOwner(account);
  return tokenIds.map(toTwwToken);
}
