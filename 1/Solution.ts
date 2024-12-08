import fs from 'node:fs/promises';

async function Part1() {
    const fileInput = (await fs.readFile('./input.txt')).toString();
    const left: number[] = [], right: number[] = [];
    for (const line of fileInput.split('\n')) {
        const [leftNumber, rightNumber] = line.split(' ').map(Number);
        left.push(leftNumber);
        right.push(rightNumber);
    }
    left.sort((a, b) => a-b);
    right.sort((a, b) => a-b);
    console.log(left);
}

Part1();

