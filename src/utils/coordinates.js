
export const generatePitchCoordinates = (sizes, row, column) => {
  const coordinates = {pitch: { row, column }, hoardings: {}}
  coordinates.pitch.pitchX = sizes.width * (column - 2)
  coordinates.pitch.pitchY = sizes.depth / 2
  coordinates.pitch.pitchZ = sizes.length * (- row)

  return coordinates;
}

export const generateHoardingCoordinates = (sizes, row, column) => {
  const coordinates = {hoardings: {}}
  coordinates.hoardings.x = sizes.width * (column - 2)  - sizes.width / 2
  coordinates.hoardings.y = sizes.depth + sizes.hoardingsSize / 2
  coordinates.hoardings.z = sizes.length * (- row)

  return coordinates;
}