import fs from 'node:fs/promises';
import path from 'node:path';

const possibleLooking = ['^', '>', 'v', '<'] as const;


async function parseInput(): Promise<{matrix: string[][], i: number, j: number}> {
    const inputPath = path.resolve(import.meta.dirname, './input.txt');
    const input = (await fs.readFile(inputPath)).toString();

    let startI = 0, startJ = 0;
    const matrix: string[][] = [];
    const lines = input.split('\n');
    for(let i=0; i<lines.length; i++) {
        const line = lines[i].split('');
        matrix.push(line);
        for(const possibleStart of possibleLooking) {
            const j = line.indexOf(possibleStart);
            if (j > -1) {
                startI = i;
                startJ = j;
            }
        }
    }

    return { matrix, i: startI, j: startJ };
}

async function printOutput(matrix: string[][], delay: number) {
    await fs.writeFile(
        path.join(import.meta.dirname, 'output.txt'), 
        matrix.map(line => line.join('')).join('\n')
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
}


async function Solution() {
    const delta: Record<typeof possibleLooking[number], { i: number, j: number}> = {
        '^': { i: -1, j: 0},
        '>': { i: 0, j: 1},
        'v': { i: 1, j: 0},
        '<': { i: 0, j: -1},
    }

    const rotateRight: Record<typeof possibleLooking[number], typeof possibleLooking[number]> = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^',
    }

    let { matrix, i, j } = await parseInput();

    let originalMatrix = structuredClone(matrix);

    while(true) {
        const position = matrix[i][j] as typeof possibleLooking[number];
        const di = delta[position].i;
        const dj = delta[position].j;
        if ([-1, matrix.length].includes(i + di) || [-1, matrix[0].length].includes(j + dj)) {
            matrix[i][j] = 'X';
            break;
        } else if (matrix[i + di][j + dj] === '#') {
            matrix[i][j] = rotateRight[matrix[i][j]  as typeof possibleLooking[number]]
        } else {
            matrix[i + di][j + dj] = matrix[i][j]
            matrix[i][j] = 'X';
            i += di;
            j += dj;
        }
        // await printOutput(matrix, 100); // Makes it easy to visualize
    }

    let count = 0;
    for(const list of matrix) {
        for (const char of list) {
            if (char === 'X') {
                count++;
            }
        }
    }

    console.log('Part 1:', count);
}



Solution();