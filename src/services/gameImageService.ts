/**
 * Professional Game Image System & Resolution Engine
 * Handles user-specified exact game artwork, multi-tier CDN fallbacks,
 * and high-performance rendering.
 */

export interface GameImageSources {
  primary: string;
  fallbacks: string[];
}

// Helper to generate redundant Steam CDN mirrors for backup resilience
const steamCovers = (appId: string): { primary: string; fallbacks: string[] } => {
  const primary = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`;
  const fallbacks = [
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900_2x.jpg`,
    `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`,
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`
  ];
  return { primary, fallbacks };
};

// Canonical registry of the 53 user-specified games and their exact image URLs
export const VERIFIED_GAME_COVERS: Record<string, GameImageSources> = {
  'left-4-dead-2': {
    primary: 'https://i.postimg.cc/fb2kMrmG/left-4-dead-2-game-icon-by-mec120-d55x3hp-375w-2x.png',
    fallbacks: [
      ...steamCovers('550').fallbacks
    ]
  },
  'skate-4': {
    primary: 'https://i.postimg.cc/fW3SRD24/images.jpg',
    fallbacks: []
  },
  'the-crew-motorfest': {
    primary: 'https://i.postimg.cc/Y0m7KXzP/images.jpg',
    fallbacks: [
      ...steamCovers('2698940').fallbacks
    ]
  },
  'etiket-pro': {
    primary: 'https://i.postimg.cc/Tw1GQ2yS/etiket-Pro.jpg',
    fallbacks: []
  },
  'snowrunner': {
    primary: 'https://i.postimg.cc/8zd1z0gk/d8e9fd4f19bc311690d90d8985e7656c7bde4726.avif',
    fallbacks: [
      ...steamCovers('1465360').fallbacks
    ]
  },
  'avatar-from-the-ashes': {
    primary: 'https://i.postimg.cc/T2S27bJ4/hb-avatar-frontiersofpandora-fromtheashes-mobile-banner-9f40cffb.jpg',
    fallbacks: []
  },
  'hytale-mobile': {
    primary: 'https://i.postimg.cc/JnY7WHVB/24d5d9de8fd0f989a622c597d4bb036b.png',
    fallbacks: []
  },
  'forza-horizon-5-mobile': {
    primary: 'https://i.postimg.cc/tgy4dHNN/d5e0490d7a06ac352730a2a444d432df.jpg',
    fallbacks: [
      ...steamCovers('1551360').fallbacks
    ]
  },
  'kimetsu-no-yaiba-hinokami-chronicles-2': {
    primary: 'https://i.postimg.cc/nVwrygnn/Screenshot-2025-09-19-211151.png',
    fallbacks: []
  },
  'mini-soccer-star-mod': {
    primary: 'https://i.postimg.cc/Y0j94fff/images.jpg',
    fallbacks: []
  },
  'getaway-2': {
    primary: 'https://i.postimg.cc/zf1Vdh8H/images-1.jpg',
    fallbacks: []
  },
  'fifa-street-mobile': {
    primary: 'https://i.postimg.cc/zX6LgMQv/images-(7).jpg',
    fallbacks: []
  },
  'assetto-corsa-mobile': {
    primary: 'https://i.postimg.cc/mZd1bhN6/images-(6).jpg',
    fallbacks: []
  },
  'euro-truck-simulator-2': {
    primary: 'https://i.postimg.cc/HnPr3Pkg/images-(5).jpg',
    fallbacks: [
      ...steamCovers('227300').fallbacks
    ]
  },
  'horizon-zero-dawn-mobile': {
    primary: 'https://i.postimg.cc/SRKX6pqN/images-(4).jpg',
    fallbacks: [
      ...steamCovers('1151640').fallbacks
    ]
  },
  'days-gone-mobile': {
    primary: 'https://i.postimg.cc/jjzJKXZ7/images-(3).jpg',
    fallbacks: [
      ...steamCovers('1259420').fallbacks
    ]
  },
  'wwe-2k25-mobile': {
    primary: 'https://i.postimg.cc/jd5NNydv/images-(2).jpg',
    fallbacks: [
      ...steamCovers('2669320').fallbacks
    ]
  },
  'red-dead-redemption-mobile': {
    primary: 'https://i.postimg.cc/6q6ZMvVt/unnamed.png',
    fallbacks: [
      ...steamCovers('2668510').fallbacks
    ]
  },
  'hajime-no-ippo-the-fighting': {
    primary: 'https://i.postimg.cc/FKc0zmsK/images-(1).jpg',
    fallbacks: []
  },
  'jujutsu-kaisen-cursed-clash': {
    primary: 'https://i.postimg.cc/y8DmqcMj/images.jpg',
    fallbacks: [
      ...steamCovers('1877020').fallbacks
    ]
  },
  'free-fire-2018': {
    primary: 'https://i.postimg.cc/yYYhPwn2/gharyna-fry-fayr.png',
    fallbacks: []
  },
  'one-piece-fighting-path': {
    primary: 'https://i.postimg.cc/KzP7qbds/images-4.jpg',
    fallbacks: []
  },
  'one-piece-mugen': {
    primary: 'https://i.postimg.cc/wv8cQMbB/images-5.jpg',
    fallbacks: []
  },
  'rocket-league-mobile': {
    primary: 'https://i.postimg.cc/Dw0g2tXm/images-2.jpg',
    fallbacks: []
  },
  'hollow-knight-silksong': {
    primary: 'https://i.postimg.cc/Kc7QQ7b7/images-3.jpg',
    fallbacks: [
      ...steamCovers('1030300').fallbacks
    ]
  },
  'roblox-beta': {
    primary: 'https://i.postimg.cc/ydcjMcSF/31HSLPQra-JL.jpg',
    fallbacks: []
  },
  'elite-auto-brasil-mod': {
    primary: 'https://i.postimg.cc/52KsLxV8/unnamed.jpg',
    fallbacks: []
  },
  'jump-force-mobile': {
    primary: 'https://i.postimg.cc/wjjW11Sx/4b392164f89981c794c943b22936cff3.jpg',
    fallbacks: [
      ...steamCovers('816020').fallbacks
    ]
  },
  'counter-strike-2-mobile': {
    primary: 'https://i.postimg.cc/gjyMZ8zw/3c83b35f11599402266a671290beb516.jpg',
    fallbacks: [
      ...steamCovers('730').fallbacks
    ]
  },
  'mecha-chameleon': {
    primary: 'https://i.postimg.cc/rpbYXqnB/image-thumb-Purple221-v4-38-71-03-3871034b-040d-98e5-59ae-49661b2391d1-App-Icon-0-0-1x-U007epad-0-1.webp',
    fallbacks: []
  },
  'spider-man-2-mobile': {
    primary: 'https://i.postimg.cc/DwxM6rqb/images.jpg',
    fallbacks: [
      ...steamCovers('2651280').fallbacks
    ]
  },
  'cuphead-mobile': {
    primary: 'https://i.postimg.cc/vHLjgFTf/4bafba8d6811e04e85c7e9646cf5177a.png',
    fallbacks: [
      ...steamCovers('268910').fallbacks
    ]
  },
  'minecraft-mobile': {
    primary: 'https://i.postimg.cc/QCczJvbr/pixel-minecraft-style-land-background-vector.jpg',
    fallbacks: []
  },
  'gta-5-mobile': {
    primary: 'https://i.postimg.cc/s22tC6Vk/Grand-Theft-Auto-V.png',
    fallbacks: [
      ...steamCovers('271590').fallbacks
    ]
  },
  'naruto-ultimate-ninja-storm-4-mobile': {
    primary: 'https://i.postimg.cc/yYmqm3Q2/images.jpg',
    fallbacks: [
      ...steamCovers('349040').fallbacks
    ]
  },
  'attack-on-titan-2-mobile': {
    primary: 'https://i.postimg.cc/pVnMd6Kc/images.jpg',
    fallbacks: [
      ...steamCovers('630020').fallbacks
    ]
  },
  'dragon-ball-fighterz-mobile': {
    primary: 'https://i.postimg.cc/B6RWgTf7/images.jpg',
    fallbacks: [
      ...steamCovers('678950').fallbacks
    ]
  },
  'watch-dogs-2-mobile': {
    primary: 'https://i.postimg.cc/tgSG10rf/images.jpg',
    fallbacks: [
      ...steamCovers('447040').fallbacks
    ]
  },
  'god-of-war-mobile': {
    primary: 'https://i.postimg.cc/RZmByLJv/God-of-War-4-cover.jpg',
    fallbacks: [
      ...steamCovers('1593500').fallbacks
    ]
  },
  'red-dead-redemption-2-mobile': {
    primary: 'https://i.postimg.cc/G3ZrJCcb/Red-Dead-Redemption-II.jpg',
    fallbacks: [
      ...steamCovers('1174180').fallbacks
    ]
  },
  'inside-mobile': {
    primary: 'https://i.postimg.cc/6q4j5gS8/1cf3189182c0590efb17a040fd06ce26.jpg',
    fallbacks: [
      ...steamCovers('304430').fallbacks
    ]
  },
  'assassins-creed-mirage-mobile': {
    primary: 'https://i.postimg.cc/ZqjDfrpx/Assassin-s-Creed-Mirage-cover.jpg',
    fallbacks: [
      ...steamCovers('2420110').fallbacks
    ]
  },
  'ghost-of-tsushima-mobile': {
    primary: 'https://i.postimg.cc/4x60cC3S/b3i-B2zf2x-Hj9sh-C0XDTULx-ND.avif',
    fallbacks: []
  },
  'the-last-of-us-2-mobile': {
    primary: 'https://i.postimg.cc/sX6q2pgq/images.jpg',
    fallbacks: [
      ...steamCovers('1888930').fallbacks
    ]
  },
  'rematch-mobile': {
    primary: 'https://i.postimg.cc/zvQsxnmS/bf53eec311119801d096ef4c5e05ef0feb20c365e568e344.avif',
    fallbacks: []
  },
  'beamng-drive-mobile': {
    primary: 'https://i.postimg.cc/mrNGTzM9/6404024.png',
    fallbacks: [
      ...steamCovers('284160').fallbacks
    ]
  },
  'nba-2k14': {
    primary: 'https://i.postimg.cc/mrNGTzM9/6404024.png',
    fallbacks: [
      ...steamCovers('255480').fallbacks
    ]
  },
  'rooftops-and-alleys': {
    primary: 'https://i.postimg.cc/6pZX11pW/nba2k14-sq-1644342520432.webp',
    fallbacks: []
  },
  'gta-6-mobile': {
    primary: 'https://i.postimg.cc/QtpWqqRB/gta-6-arrivera-sur-pc-mais-pas-l-89cd8f45-image-507398f33-jpg.webp',
    fallbacks: [
      ...steamCovers('271590').fallbacks
    ]
  },
  'spider-man-miles-morales': {
    primary: 'https://i.postimg.cc/cJQd65q4/hq720-(11).jpg',
    fallbacks: [
      ...steamCovers('1817190').fallbacks
    ]
  },
  'sifu-mobile': {
    primary: 'https://i.postimg.cc/1trR77MY/EGS-SIFUStandard-Edition-Sloclap-S4-1200x1600-32aca69d756abfcc25f8581942a6162b-1200x1600-32aca69d756.jpg',
    fallbacks: [
      ...steamCovers('2138710').fallbacks
    ]
  },
  'ride-5-mobile': {
    primary: 'https://i.postimg.cc/hvMjvZdm/EGS-RIDE5-Milestone-Srl-S2-1200x1600-abc515266abe022f93ee7517ca8ec7fa.jpg',
    fallbacks: [
      ...steamCovers('1650010').fallbacks
    ]
  },
  'forza-horizon-6': {
    primary: 'https://i.postimg.cc/XvPgPxHD/apps-24935-14202278764680089-8e4c786a-0a1c-4737-a244-0bdfa34aab7b.jpg',
    fallbacks: [
      ...steamCovers('1551360').fallbacks
    ]
  },
};


export const TITLE_TO_ID_MAP: Record<string, string> = {
  'left4dead2': 'left-4-dead-2',
  'skate4': 'skate-4',
  'thecrewmotorfest': 'the-crew-motorfest',
  'etiketpro': 'etiket-pro',
  'snowrunner': 'snowrunner',
  'avatarfromtheashes': 'avatar-from-the-ashes',
  'hytalemobile': 'hytale-mobile',
  'forzahorizon5mobile': 'forza-horizon-5-mobile',
  'kimetsunoyaibathehinokamichronicles2': 'kimetsu-no-yaiba-hinokami-chronicles-2',
  'minisoccerstarmod': 'mini-soccer-star-mod',
  'getaway2': 'getaway-2',
  'fifastreetmobile': 'fifa-street-mobile',
  'assettocorsamobile': 'assetto-corsa-mobile',
  'eurotrucksimulator2': 'euro-truck-simulator-2',
  'horizonzerodawnmobile': 'horizon-zero-dawn-mobile',
  'daysgonemobile': 'days-gone-mobile',
  'wwe2k25mobile': 'wwe-2k25-mobile',
  'reddeadredemptionmobile': 'red-dead-redemption-mobile',
  'hajimenoippothefighting': 'hajime-no-ippo-the-fighting',
  'jujutsukaisencursedclash': 'jujutsu-kaisen-cursed-clash',
  'freefire2018': 'free-fire-2018',
  'onepiecefightingpath': 'one-piece-fighting-path',
  'onepiecemugen': 'one-piece-mugen',
  'rocketleaguemobile': 'rocket-league-mobile',
  'hollowknightsilksong': 'hollow-knight-silksong',
  'robloxbeta': 'roblox-beta',
  'eliteautobrasilmod': 'elite-auto-brasil-mod',
  'jumpforcemobile': 'jump-force-mobile',
  'counterstrike2mobile': 'counter-strike-2-mobile',
  'mechachameleon': 'mecha-chameleon',
  'spiderman2mobile': 'spider-man-2-mobile',
  'cupheadmobile': 'cuphead-mobile',
  'minecraftmobile': 'minecraft-mobile',
  'gta5mobile': 'gta-5-mobile',
  'narutoultimateninjastorm4mobile': 'naruto-ultimate-ninja-storm-4-mobile',
  'attackontitan2mobile': 'attack-on-titan-2-mobile',
  'dragonballfighterzmobile': 'dragon-ball-fighterz-mobile',
  'watchdogs2mobile': 'watch-dogs-2-mobile',
  'godofwarmobile': 'god-of-war-mobile',
  'reddeadredemption2mobile': 'red-dead-redemption-2-mobile',
  'insidemobile': 'inside-mobile',
  'assassinscreedmiragemobile': 'assassins-creed-mirage-mobile',
  'ghostoftsushimamobile': 'ghost-of-tsushima-mobile',
  'thelastofus2mobile': 'the-last-of-us-2-mobile',
  'rematchmobile': 'rematch-mobile',
  'beamngdrivemobile': 'beamng-drive-mobile',
  'nba2k14': 'nba-2k14',
  'rooftopsalleys': 'rooftops-and-alleys',
  'gta6mobile': 'gta-6-mobile',
  'spidermanmilesmorales': 'spider-man-miles-morales',
  'sifumobile': 'sifu-mobile',
  'ride5mobile': 'ride-5-mobile',
  'forzahorizon6': 'forza-horizon-6',
};


// Cache of failed URLs in memory
const failedUrlCache = new Set<string>();

export function markUrlFailed(url: string): void {
  if (!url) return;
  failedUrlCache.add(url);
}

export function isUrlFailed(url: string): boolean {
  return failedUrlCache.has(url);
}

export function clearFailedUrlCache(): void {
  failedUrlCache.clear();
}

export function normalizeGameKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Returns an ordered array of image URLs to attempt in sequence.
 * 1. The user-provided game.imageUrl is ALWAYS top priority.
 * 2. Pre-configured official fallback mirrors for network safety.
 */
export function getGameImageSources(game: {
  id?: string;
  title: string;
  imageUrl?: string;
}): string[] {
  const sources: string[] = [];

  // Rule 1: The user-defined exact image URL is ALWAYS first and foremost
  if (game.imageUrl) {
    sources.push(game.imageUrl);
  }

  // Rule 2: Secondary official fallback mirrors if available
  let registry = game.id ? VERIFIED_GAME_COVERS[game.id] : undefined;
  if (!registry && game.title) {
    const norm = normalizeGameKey(game.title);
    const mappedId = TITLE_TO_ID_MAP[norm];
    if (mappedId) {
      registry = VERIFIED_GAME_COVERS[mappedId];
    }
  }

  if (registry) {
    if (registry.primary && !sources.includes(registry.primary)) {
      sources.push(registry.primary);
    }
    for (const fb of registry.fallbacks) {
      if (!sources.includes(fb)) {
        sources.push(fb);
      }
    }
  }

  return sources;
}

/**
 * Async dynamic resolver for future unknown games using Wikipedia REST API
 */
const dynamicCoverCache = new Map<string, string | null>();

export async function resolveGameCoverDynamic(title: string): Promise<string | null> {
  const norm = normalizeGameKey(title);
  if (dynamicCoverCache.has(norm)) {
    return dynamicCoverCache.get(norm) ?? null;
  }

  try {
    const cleanSearch = title.replace(/\b(mobile|edition|mod|2018|beta|remake)\b/gi, "").trim();
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanSearch.replace(/\s+/g, "_"))}`;
    const resp = await fetch(wikiUrl, { headers: { "Accept": "application/json" }, signal: AbortSignal.timeout(4000) });
    if (resp.ok) {
      const data = await resp.json();
      if (data.thumbnail && data.thumbnail.source) {
        const highRes = data.thumbnail.source.replace(/\/\d+px-/, "/800px-");
        dynamicCoverCache.set(norm, highRes);
        return highRes;
      }
    }
  } catch (_) {}

  dynamicCoverCache.set(norm, null);
  return null;
}
