
fetch('day3-input.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const output = start(info)
        console.log(output)
    })
})

const parseInput = (paths) => {
    const result = [];
    paths.forEach((p) => {
        const instructions = p.split(',').map((i) => [i[0], i.slice(1, i.length)] )
        result.push(instructions)
    })
    return result
}
const DIR_MAP = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
}

const moveAcrossTiles = (start, dir, amount) => {
    const locations = []
    const dirDelta = DIR_MAP[dir]
    let lastLocation = [...start]
    for (let i = 1; i <= amount; i++) {
        const x = start[0] + dirDelta[0] * i;
        const y = start[1] + dirDelta[1] * i;

        locations.push(`${x}|${y}`)
        lastLocation = [x,y]
    }
    return {locations, lastLocation}
}

const drawWire = (line, lineNumber, world) => {
    const intersections = []
    let location = [0,0]
    line.forEach((step) => {
        const result = moveAcrossTiles(location, step[0], step[1])
        location = result.lastLocation
        result.locations.forEach((location) => {
            const worldPos = world[location]
            if(worldPos && lineNumber !== worldPos){
                intersections.push(location)
            } else if(!worldPos) {
                world[location] = lineNumber
            }
        })
    })
    return intersections
}

const drawWireWithDistance = (line, lineNumber, world) => {
    const intersections = []
    let location = [0,0]
    let totalStepCount = 0
    line.forEach((step) => {
        const result = moveAcrossTiles(location, step[0], step[1])
        location = result.lastLocation
        result.locations.forEach((location, stepCount) => {
            const worldPos = world[location]
            if(worldPos){
                intersections.push(worldPos + totalStepCount + (stepCount + 1))
            } else if(!worldPos && lineNumber !== 2) {
                world[location] = totalStepCount + (stepCount + 1)
            }
        })
        totalStepCount += result.locations.length;
    })
    return intersections
}

const findClosestIntersection = (intersections) => {
    const abs = Math.abs
    return intersections.map((i) => i.split('|').map(n => Number(n))).sort((a, b) => (abs(a[0]) + abs(a[1])) < (abs(b[0]) + abs(b[1])) ? -1 : 1)[0]
}

const findClosestIntersectionWithDistance = (intersections) => {
    return intersections.sort((a, b) => a < b ? -1 : 1)[0]
}

const start = (list) => {
    const steps = parseInput(list)
    console.log(steps)

    const world = {}
    console.log(drawWireWithDistance(steps[0], 1, world))
    console.log(world)
    const secondIntersections = drawWireWithDistance(steps[1], 2, world)
    const closest = findClosestIntersectionWithDistance(secondIntersections)

    console.log(closest)
    return


    const abs = Math.abs
    const dist = (abs(closest[0]) + abs(closest[1]))
    console.log(dist)
}
