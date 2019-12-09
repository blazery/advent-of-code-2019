
fetch('day8-input.json').then((r) => {
    if(r.ok) r.json().then((info) => {
        const output = start(info[0])
        console.log(output)
    })
})

const WIDTH = 25
const HEIGHT = 6
const PER_LAYER = WIDTH * HEIGHT

const start = (img) => {
    const totalLayer = img.length / PER_LAYER
    const layersInfo = []
    const layers = []
    for (let i = 0; i < totalLayer; i++) {
        const amountOfDigitOccurances = [0,0,0]
        const layer = img.slice(i* WIDTH*HEIGHT, (i+1)*WIDTH*HEIGHT)
        for (let j = 0; j < PER_LAYER; j++) {
            const c = Number(img[(i* PER_LAYER) + j])
            if(c < 3){
                amountOfDigitOccurances[c] = amountOfDigitOccurances[c] + 1
            }
        }
        layers.push(layer)
        layersInfo.push(amountOfDigitOccurances)
    }
    // const x = layers.sort((a, b) => a[0] < b[0] ? -1 : 1)[0]
    // console.log(x)
    // console.log(x[1] + x[2])

    let resultImg = ''
    for (let j = 0; j < WIDTH*HEIGHT; j++) {
        let c = layers.find((layer) => layer[j] !== '2')
        if(!c){
            resultImg += 'x';
        } else if(c[j] === '1') {
            resultImg += '□';
        }
        else if(c[j] === '0') {
            resultImg += '■';
        }
    }

    for (let i = 0; i < HEIGHT ; i++) {
        console.log(resultImg.slice(i* WIDTH, (i+1)*WIDTH))
    }
}
