export default function (allSpectacles, genre) {
  if (genre === "All") return allSpectacles;
  else return allSpectacles.filter((spectacle) => spectacle.genre === genre);
}

