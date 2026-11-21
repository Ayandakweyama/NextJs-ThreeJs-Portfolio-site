export const houseTracks = [
  { id: 1596140106, title: "Kamui", artist: "Thabo Tonick", path: "stay-true-sounds-label/thabo-tonick-kamui" },
  { id: 1601048715, title: "Derived Samba", artist: "Hypaphonik", path: "stay-true-sounds-label/hypaphonik-derived-samba" },
  { id: 1480986373, title: "Let's Go Deep", artist: "Chronical Deep", path: "chronicaldeep/lets-go-deep" },
  { id: 1787455615, title: "Land Of Kush (Dub Mix)", artist: "Da Capo", path: "da-capo/da-capo-land-of-kush-dub-mix" },
  { id: 1583152399, title: "Afrika", artist: "AndileAndy", path: "stay-true-sounds-label/andileandy-afrika" },
];

export function shuffleTracks(previousId) {
  const queue = [...houseTracks];
  for (let index = queue.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [queue[index], queue[other]] = [queue[other], queue[index]];
  }

  if (queue[0]?.id === previousId && queue.length > 1) {
    [queue[0], queue[1]] = [queue[1], queue[0]];
  }
  return queue;
}
