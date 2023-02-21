
export const generatePitchCoordinates = (sizes, row, column) => {
  const coordinates = {pitch: { row, column }, homeLogo: {}}
  coordinates.pitch.pitchX = sizes.width * (column - 2)
  coordinates.pitch.pitchY = sizes.depth / 2
  coordinates.pitch.pitchZ = sizes.length * (- row)

  coordinates.homeLogo.x = -sizes.width * (column - 1)
  coordinates.homeLogo.y = sizes.depth + 10 / 2
  coordinates.homeLogo.z =  (-sizes.length / 4) + (row * - sizes.length)

  return coordinates;
}

export const generateHoardingCoordinates = (sizes, row, column) => {
  const coordinates = {hoardings: {}}
  coordinates.hoardings.x = sizes.width * (column - 2)  - sizes.width / 2
  coordinates.hoardings.y = sizes.depth + sizes.hoardingsSize / 2
  coordinates.hoardings.z = sizes.length * (- row)

  return coordinates;
}

export const generateTeamLogoCoordinates = ({pitchSize, row, column}) => {
  const coordinates = {teamLogo: {home: {}, away: {}}}
  coordinates.teamLogo.home.x =
    pitchSize.width * (column - 2) - pitchSize.width / 2 + 17.5

  coordinates.teamLogo.away.x =
    pitchSize.width * (column - 2) + pitchSize.width / 2 - 17.5

  coordinates.teamLogo.home.y = pitchSize.depth + 0.5 + 8
  coordinates.teamLogo.away.y = pitchSize.depth + 0.5 + 8

  coordinates.teamLogo.home.z =
      pitchSize.length * (- row) - pitchSize.length / 2 + 20
  coordinates.teamLogo.away.z =
    pitchSize.length * (- row) + pitchSize.length / 2 - 20

  return coordinates;
}