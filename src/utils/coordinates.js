
export const generateCoordinates = (sizes, row, column) => {
  const coordinates = {pitch: { row, column }, hoardings: {}}
  coordinates.pitch.pitchX = sizes.width * (column - 2)
  coordinates.pitch.pitchY = sizes.depth / 2
  coordinates.pitch.pitchZ = sizes.length * ( row)
  //
  // coordinates.hoardings.x = sizes.width * (column - 2)  - this.sizes.pitchWidth / 2
  // coordinates.hoardings.y = sizes.depth + this.sizes.hoardingsSize / 2
  // coordinates.hoardings.z = sizes.length * (- row)

  return coordinates;
}