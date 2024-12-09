import fs from 'node:fs/promises';
import path from 'node:path';

async function parseInput() {
    const inputPath = path.resolve(import.meta.dirname, './input.txt');
    const input = (await fs.readFile(inputPath)).toString();

    const lines = input.split('\n');
    const output: { total: number, numbers: number[] }[] = [];
    for(const line of lines) {
        const [beforeString, numbersString] = line.split(': ');
        output.push({
            total: Number(beforeString),
            numbers: numbersString.split(' ').map(input => Number(input)),
        })
    }

    return output;
}

const operations = {
    sum: (a: number, b: number) => a+b,
    mul: (a: number, b: number) => a*b,
    concat: (a: number, b: number) => Number(`${a}${b}`),
} as const;

function recursiveTotalMatch(total: number, numbers: number[], operations: Array<(a: number, b:number) => number>, index = 1, acc = numbers[0]): boolean {
    if (index === numbers.length) {
        return total === acc;
    }
    return operations.some((operation) => recursiveTotalMatch(total, numbers, operations, index + 1, operation(acc, numbers[index])))
}

async function Part1() {
    const input = await parseInput();
    let part1Sum = 0;
    let part2Sum = 0;
    for(const { total, numbers } of input) {
        if (recursiveTotalMatch(total, numbers, [operations.sum, operations.mul])) {
            part1Sum += total;
        }
        if (recursiveTotalMatch(total, numbers, [operations.sum, operations.mul, operations.concat])) {
            part2Sum += total;
        }
    }

    console.log('Part 1:', part1Sum);
    console.log('Part 2:', part2Sum);
}


Part1();