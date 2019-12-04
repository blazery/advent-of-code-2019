
fetch('day2-input.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const output = start(info)
        console.log(output)
    })
})



let startInput = undefined
const neededResult = 19690720

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
        const memOp1 =  list[index + 1]
        const memOp2 =  list[index + 2]
        const memAdress =  list[index + 3]
        const op1 =  list[memOp1]
        const op2 =  list[memOp2]

        let result = undefined
        switch (valueAtIndex) {
            case 1:
                result = op1 + op2
                break;
            case 2:
                result = op1 * op2
                break
            default:
                throw new Error('invalid operator')
        }
        list[memAdress] = result
        index += 4
    }
    return list
}

const start = (list) => {
    startInput = [...list]

    for(let noun = 0; noun < 100; noun++ ){
        for(let verb = 0; verb < 100; verb++ ){
            const program = createAlarmState(startInput, noun, verb)
            const state = runProgram(program)
            if(state[0] === neededResult){
                console.log(noun * 100 + verb)
            }
        }
    }
}
