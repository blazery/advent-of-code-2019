
fetch('day7-input.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const output = start(info)
        console.log(output)
    })
})

let outputArray = [0]
let secinput = []
let useSecinput = true

const getInput = () => {
    if(useSecinput) {
        useSecinput = !useSecinput
        return  secinput[0]
    } else{
        return outputArray[outputArray.length -1]
    }
}
const writeOutput = (v) => {
    console.log('CONSOLE OUTPUT: ', v)
    outputArray.push(v)
    return v
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

function Program(program){
    this.program = program;
    this.commandIndex = 0
    this.runProgram = (startIndex = this.commandIndex, input=[], output = []) => {
        const list = this.program
        let index = startIndex | 0;
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
                    list[list[index + 1]] = input.shift()
                    jumpSize = 2
                    break
                case 4:
                    const value = getValueFromPosition(list, index + 1, instruction.modes[0])
                    writeOutput(value)
                    output.push(value)
                    jumpSize = 2
                    this.commandIndex =  index + jumpSize
                    return value
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
        this.commandIndex = index
        return null
    }
}



const flipIndexes = (list, a, b) => {
    const clone = [...list]
    const x = clone[a]
    clone[a] = clone[b]
    clone[b] = x
    return clone
}

const generateSequences = (list) => {
    let x = list || [0,1,2,3,4]
    const options = {}

    options[x.join('-')] = x
    let i = 0;
    let j = 1;
    while(true){
        x = flipIndexes(x, i ,i + j);
        if(!options[x.join('-')]) {
            options[x.join('-')] = x
            i = 0;
            j = 1;
        } else if(i + j < x.length - 1) {
            j++
        } else if (i + j === x.length - 1){
            j = 0
            i++
        }
        if(i === x.length - 1) break
    }


    return Object.values(options)
}


const start = (list) => {
    const sequences = generateSequences([5,6,7,8,9])
    const results = []
    for (const s of sequences) {
        const amps = [
            new Program([...list]),
            new Program([...list]),
            new Program([...list]),
            new Program([...list]),
            new Program([...list])
        ]

        let firstRun = true;
        let halted = false;
        let feedback = 0
        while(!halted){
            const temp = amps.reduce((acc, amp, i) => {
                if(acc == null ) return acc;

                let output = acc
                if(firstRun){
                    output = amp.runProgram(0, [s[i], acc])
                } else {
                    output = amp.runProgram(undefined, [acc])
                }

                if(output === null) return null;
                return output
            }, feedback)
            if(temp === null) {
               halted = true
            }else {
                feedback = temp
            }
            firstRun = false
        }

        results.push(feedback)

        // s.forEach((si) => {
        //     secinput = [si]
        //     useSecinput = true
        //     runProgram([...programClone])
        //     const v = outputArray[outputArray.length -1]
        //     results.push(v)
        // })
        outputArray = [0]
    }

    const max = results.sort((a, b) => a  < b ? 1: -1)[0]
    console.log(max)
}
