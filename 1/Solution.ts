import fs from 'node:fs/promises';
import path, { parse } from 'node:path';


async function parseInput(): Promise<{ left: number[], right: number[] }> {
    const inputPath = path.resolve(import.meta.dirname, './input.txt');
    const input = (await fs.readFile(inputPath)).toString();

    const left: number[] = [], right: number[] = [];
    const lines = input.split('\n');
    for (const line of lines) {
        const [leftNumber, rightNumber] = line.split(/\s+/).map(number => Number(number));
        left.push(leftNumber);
        right.push(rightNumber);
    }

    return { left, right };
}

async function Part1() {
    const { left, right } = await parseInput();
    
    left.sort((a, b) => a-b);
    right.sort((a, b) => a-b);

    let distance = 0;
    for(let i=0; i<left.length; i++) {
        distance += Math.abs(left[i]-right[i]);
    }
    console.log('Part 1:', distance);
}

async function Part2() {
    const { left, right } = await parseInput();
    const rightCounts = new Map<number, number>();
    for (const number of right) {
        const count = rightCounts.get(number) ?? 0;
        rightCounts.set(number, count + 1); 
    }

    let similarityScore = 0;
    for (const number of left) {
        const counts = rightCounts.get(number) ?? 0;
        similarityScore += number * counts;
    }

    console.log('Part 2:', similarityScore);
}


Part1();
Part2();

