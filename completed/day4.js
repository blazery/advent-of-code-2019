
fetch('day4-input.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const output = start(info)
        console.log(output)
    })
})

const min = 145852
const max = 616942

const hasDoubles = (number) => {
    const text = number + ''
    for (let i = 0; i < text.length - 1; i++) {

        // if(text[i] === text[i+1]) return true
        const number = text[i]
        let counter = i + 1
        while (counter < text.length) {
            if(text[counter] !== number) break
            counter++
        }
        if(counter - i === 2) return true
        i = counter - 1
    }
    return false
}

const increasing = (number) => {
    const text = number + ''
    return text.split('').sort((a, b) => a < b ? -1 : 1).join('') === text
}

const start = (list) => {
    let total = 0

    for (let i = min; i < max; i++) {
        if(hasDoubles(i) && increasing(i)) {
            total++
            // console.log(i)

        }
    }

    console.log(total)
}
