import { readFile } from 'fs/promises'

try {
  const input = await readFile('day-09/input.txt', 'utf-8')
  const directions = input.split('\n')
  const answer = new Set()
  // start positions
  const head = { x: 0, y: 0 }
  const tail = { x: 0, y: 0 }

  const moveHead = {
    // [x, y]
    R: [1, 0],
    L: [-1, 0],
    U: [0, -1],
    D: [0, 1]
  }

  /**
   * 'R': x + 1
   * 'L': x - 1
   * 'U': y + 1
   * 'D': y - 1
   */

  for (const direction of directions) {
    const [dir, numSteps] = direction.split(' ')
    let stepsTaken = 0

    while (stepsTaken < Number(numSteps)) {
      // Move head
      const dX = moveHead[dir][0]
      const dY = moveHead[dir][1]
      head.x += dX
      head.y += dY

      // Tail follows
      const distance = Math.max(
        Math.abs(tail.x - head.x),
        Math.abs(tail.y - head.y)
      )
      if (distance > 1) {
        // 0 nothing (overlaping)
        // 1 or 2 ++
        // -1 or -2 --
        const dirX = head.x - tail.x
        tail.x += Math.abs(dirX) === 2 ? dirX / 2 : dirX

        const dirY = head.y - tail.y
        tail.y += Math.abs(dirY) === 2 ? dirY / 2 : dirY
      }

      // Add tail location to answer
      answer.add(`${tail.x}, ${tail.y}`)
      stepsTaken++
    }
  }

  // 6339
  console.log(`Answer is ${answer.size}`)
} catch (err) {
  console.error(`There was an error: ${err}`)
}
