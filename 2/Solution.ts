import fs from 'node:fs/promises';
import path from 'node:path';

async function parseInput(): Promise<number[][]> {
    const inputPath = path.resolve(import.meta.dirname, './input.txt');
    const input = (await fs.readFile(inputPath)).toString();

    const numbersGrid: number[][] = [];
    const lines = input.split('\n')
    for (const line of lines) {
        const numbers = line.split(/\s+/).map(input => Number(input));
        numbersGrid.push(numbers);
    }

    return numbersGrid;
}

function isIncreasing(numbers: number[]): boolean {
    for(let i=1; i<numbers.length; i++) {
        if (numbers[i-1] >= numbers[i]) {
            return false;
        }
    }
    return true;
}

function isDecreasing(numbers: number[]): boolean {
    for(let i=1; i<numbers.length; i++) {
        if (numbers[i-1] <= numbers[i]) {
            return false;
        }
    }
    return true;
}

function isSorted(numbers: number[]): boolean {
    return isIncreasing(numbers) || isDecreasing(numbers)
}

function isDistanceInRange(numbers: number[], range: { min: number, max: number }): boolean {
    for (let i=1; i<numbers.length; i++) {
        const distance = Math.abs(numbers[i] - numbers[i-1]) 
        if (distance < range.min || distance > range.max) {
            return false;
        }
        
    }
    return true;
}

async function Part1() {
    const numbersGrid = await parseInput();
    let safeCount = 0;
    for (const numbers of numbersGrid) {
        if (isSorted(numbers) && isDistanceInRange(numbers, { min: 1, max: 3})) {
            safeCount++;
        }
    }

    console.log('Part 1:', safeCount);
}

async function Part2() {
    const numbersGrid = await parseInput();
    let safeCount = 0;
    for (const numbers of numbersGrid) {
        for(let i=0; i<numbers.length; i++) {
            const numbersExceptI = [...numbers];
            numbersExceptI.splice(i, 1);
            if (isSorted(numbersExceptI) && isDistanceInRange(numbersExceptI, { min: 1, max: 3})) {
                safeCount++;
                break;
            }
        }
    }


    console.log('Part 2:', safeCount);
}

Part1();
Part2();