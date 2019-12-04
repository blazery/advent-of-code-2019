
fetch('day1-input.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const sumOfWeight = info.reduce(sumfnrec, 0)
        console.log(sumOfWeight)
    })
})


const sumfn = (acc, item) => {
    return acc + Math.floor(item / 3 ) -2
}

const sumfnrec = (acc, item) => {
    const value = recursiveFuelCalc(item)
    results.push(value)
    return acc + value
}

const results = []
const recursiveFuelCalc = (weight) => {
    const neededFuel =  Math.floor(weight / 3 ) -2
    if(neededFuel <=0){
        return 0
    } else {
        return neededFuel + recursiveFuelCalc(neededFuel)
    }
}
