
fetch('day6-input-end.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const output = start(info)
        console.log(output)
    })
})

const start = (list) => {
    const parentMap = {}
    list.forEach((c) => {
        const [parent, child]  = c.split(')')
        parentMap[child] = parent
    })



   const total_conections = Object.keys(parentMap).reduce((acc, i) => acc + fn(i), 0)
   const fn =  (c) => {
        let total = 0
        let parent = parentMap[c]
       const path = []
        while(parent){
            path.push(parent)
            total++
            parent = parentMap[parent]
        }
        // return total // can be used for the first part
        return path
    }

    const myPath = fn('YOU')
    const santaPath = fn('SAN')

    // find common node
    const common = myPath.find((i) => santaPath.includes(i))

    // subtract to to exclude santa or youself, and the first jump, since you are already there.
    const myIndex = myPath.indexOf(common)
    const santaIndex = santaPath.indexOf(common)

    console.log(myIndex + santaIndex)
}
