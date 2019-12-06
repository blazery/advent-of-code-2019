
fetch('day5-input.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const output = start(info)
        console.log(output)
    })
})



let startInput = undefined
const neededResult = 19690720


const getInput = () => {
    return 5
}
const writeOutput = (v) => {
    console.log('CONSOLE OUTPUT: ', v)
}

const getValueFromPosition = (list, index , mode) => {
    if(mode === 1) return list[index]
    const address = list[index]
    return list[address]
}

const decodeInstruction = (instruction) => {
    const text = instruction + ''
    if(text.length === 1) return  {operation: instruction, modes: []}

    const operation = Number(text.slice(-2))
    const modes = text.slice(0, -2).split('').reverse().map((i) => Number(i))
    return {operation, modes}
}

const createAlarmState = (list, x=12 , y=2) => {
    const clone = [...list];
    clone[1] = x
    clone[2] = y
    return clone
}

const runProgram = (list) => {
    let index = 0;
    while(list[index] !== 99) {
        const valueAtIndex = list[index]
        const instruction = decodeInstruction(valueAtIndex)
        const opt1 = getValueFromPosition(list, index + 1, instruction.modes[0])
        const opt2 = getValueFromPosition(list, index + 2, instruction.modes[1])
        const opt3 = getValueFromPosition(list, index + 3, instruction.modes[2])

        let jumpSize = 4

        let result = undefined
        switch (instruction.operation) {
            case 1:
                result = opt1 + opt2
                list[list[index + 3]] = result
                break;
            case 2:
                result = opt1 * opt2
                list[list[index + 3]] = result
                break
            case 3:
                list[list[index + 1]] = getInput()
                jumpSize = 2
                break
            case 4:
                const value = getValueFromPosition(list, index + 1, instruction.modes[0])
                writeOutput(value)
                jumpSize = 2
                break
            case 5:
                if(opt1){
                    jumpSize = opt2 - index;
                }else {
                    jumpSize = 3
                }
                break
            case 6:
                if(!opt1) {
                    jumpSize = opt2 - index;
                }else {
                    jumpSize = 3
                }
                break
            case 7:
                if(opt1 < opt2) {
                    list[list[index + 3]] = 1
                } else {
                    list[list[index + 3]] = 0
                }
                break
            case 8:
                if(opt1 === opt2) {
                    list[list[index + 3]] = 1
                } else {
                    list[list[index + 3]] = 0
                }
                break
            default:
                throw new Error('invalid operator')
        }
        index += jumpSize
    }
    return list
}

const start = (list) => {
    runProgram(list)
}
