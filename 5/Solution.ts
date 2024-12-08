import fs from 'node:fs/promises';
import path from 'node:path';

async function parseInput() {
    const inputPath = path.resolve(import.meta.dirname, './input.txt');
    const input = (await fs.readFile(inputPath)).toString();

    const [ordersInput, printQueueInput] = input.split('\n\n');

    const beforeAfter = new Map<number, Set<number>>;
    for(const order of ordersInput.split('\n')) {
        const [before, after] = order.split('|').map(input => Number(input));
        const afterSet: Set<number> = beforeAfter.get(before) ?? new Set();
        afterSet.add(after);
        beforeAfter.set(before, afterSet);
    }

    const printQueueList: number[][] = [];
    for (const printQueue of printQueueInput.split('\n')) {
        const list = printQueue.split(',').map(input => Number(input));
        printQueueList.push(list);
    }

    return { beforeAfter, printQueueList };
}

async function Solution() {
    const { beforeAfter, printQueueList } = await parseInput();

    let sumValidRows = 0;
    let sumInvalidRows = 0;
    for(const printQueue of printQueueList) {
        let valid = true;
        for(let i=printQueue.length-1; i>0; i--) {
            const beforeSet = new Set();
            for (let j=0; j<i; j++) {
                beforeSet.add(printQueue[j]);
            }
            const checkingNumber = printQueue[i];
            const afterSet = beforeAfter.get(checkingNumber) ?? new Set();
            if (beforeSet.intersection(afterSet).size > 0) {
                valid = false;
                break;
            }
        }
        const mid = Math.floor(printQueue.length/2);
        if (valid) {
            sumValidRows += printQueue[mid];
        } else {
            printQueue.sort((x, y) => {
                const xAfterSet = beforeAfter.get(x);
                const yAfterSet = beforeAfter.get(y);
                if (yAfterSet?.has(x)) {
                    return 1;
                }
                if (xAfterSet?.has(y)) {
                    return -1;
                }
                return 0;
            })
            sumInvalidRows += printQueue[mid];
        }
    }

    console.log('Part 1:', sumValidRows);
    console.log('Part 2:', sumInvalidRows);
}

Solution();