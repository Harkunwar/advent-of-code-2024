import fs from 'node:fs/promises';
import path from 'node:path';

async function parseInput(): Promise<string[][]> {
    const inputPath = path.resolve(import.meta.dirname, './input.txt');
    const input = (await fs.readFile(inputPath)).toString();

    const charMatrix: string[][] = [];
    const lines = input.split('\n');
    for (const line of lines) {
        charMatrix.push(line.split(''));
    }

    return charMatrix;
}

function getChar(matrix: string[][], i: number, j: number): string {
    return matrix?.[i]?.[j] ?? '';
}

function getWord(matrix: string[][], wordLength: number, coordinates: { i: number, j: number, di: number, dj: number }): string {
    let word = '';
    for (let x=0; x<wordLength; x++) {
        word += getChar(matrix, coordinates.i, coordinates.j);
        coordinates.i += coordinates.di;
        coordinates.j += coordinates.dj;
    }
    return word;
}

function findAllMatches(matrix: string[][], match: string, i: number, j: number): number {
    if (matrix[i][j] !== match.charAt(0)) {
        return 0;
    }
    let count = 0;
    let test = 0;
    for(let di=-1; di<=1; di++) {
        for (let dj=-1; dj<=1; dj++) {
            if (di !== 0 || dj !== 0) {
                const word = getWord(matrix, match.length, { i, j, di, dj});
                if (word.length === match.length) {
                    if (word === match) {
                        count++;
                    }
                }
            }

        }
    }

    return count;
}

function isCrossMatch(matrix: string[][], center: string, surrounds: string, i: number, j: number): boolean {
    if (center != getChar(matrix, i, j)) {
        return false;
    }
    const reversedSurrounds = [...surrounds].reverse().join('');
    const diagLeft = getChar(matrix, i-1, j-1) + getChar(matrix, i+1, j+1);
    const diagRight = getChar(matrix, i+1, j-1) + getChar(matrix, i-1, j+1);

    let count = 0;
    if (diagLeft === surrounds || diagLeft === reversedSurrounds) {
        count++;
    }
    if (diagRight === surrounds || diagRight === reversedSurrounds) {
        count++;
    }
    return count === 2;

}

async function Part1() {
    const charMatrix = await parseInput();

    let count = 0;
    for (let i=0; i<charMatrix.length; i++) {
        for (let j=0; j<charMatrix[0].length; j++) {
            count += findAllMatches(charMatrix, 'XMAS', i, j);
        }
    }

    console.log('Part 1:', count);
}

async function Part2() {

    const charMatrix = await parseInput();

    let count = 0;
    for (let i=0; i<charMatrix.length; i++) {
        for (let j=0; j<charMatrix[0].length; j++) {
            if (isCrossMatch(charMatrix, 'A', 'MS', i, j)) {
                count++;
            }
        }
    }

    console.log('Part 2:', count);
}

Part1();
Part2();