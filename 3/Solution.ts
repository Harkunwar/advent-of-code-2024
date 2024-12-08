import fs from 'node:fs/promises';
import path from 'node:path';

async function parseInput(): Promise<string> {
    const inputPath = path.resolve(import.meta.dirname, './input.txt');
    const input = (await fs.readFile(inputPath)).toString();

    return input;
}

function getMulNumbers(string: string): [number, number] {
    return Array.from(string.matchAll(/\d+/g), (m) => Number(m[0])) as [number, number];
}


async function Part1() {
    const input = await parseInput();
    const validMulMatches = Array.from(input.matchAll(/mul\(\d+,\d+\)/g), (m) => m[0]);
    let sum = 0;

    for (const match of validMulMatches) {
        const [a, b] = getMulNumbers(match);
        sum += a * b;
    }

    console.log('Part 1:', sum);
}

async function Part2() {
    const input = await parseInput();
    const matchRegex = /((mul\(\d+,\d+\))|do\(\)|don\'t\(\))/g
    const validMulDoDontMatches = Array.from(input.matchAll(matchRegex), (m) => m[0]);

    let solve = true;
    let sum = 0;

    for (const match of validMulDoDontMatches) {
        if (match === 'do()') {
            solve = true;
        } else if (match === 'don\'t()') {
            solve = false;
        } else if (solve) {
            const [a, b] = getMulNumbers(match);
            sum += a * b;
        }
    }

    console.log('Part 2:', sum);
}

Part1();
Part2();