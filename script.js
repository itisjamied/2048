document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const gridCells = Array.from(document.querySelectorAll('.grid-cell'));
    const gridSize = 4;
    let cells = Array(gridSize * gridSize).fill(0);
    
    // Initialize game
    startGame();

    // Keyboard controls
    document.addEventListener('keydown', handleKeypress);

    function startGame() {
        addNewTile();
        addNewTile();
        updateGrid();
    }

    function handleKeypress(e) {
        switch (e.key) {
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
        }
        addNewTile();
        updateGrid();
    }

    function moveLeft() {
        for (let i = 0; i < gridSize; i++) {
            let row = cells.slice(i * gridSize, i * gridSize + gridSize);
            row = slide(row);
            row = combine(row);
            row = slide(row);
            cells.splice(i * gridSize, gridSize, ...row);
        }
    }

    function moveRight() {
        for (let i = 0; i < gridSize; i++) {
            let row = cells.slice(i * gridSize, i * gridSize + gridSize);
            row = slide(row.reverse());
            row = combine(row);
            row = slide(row);
            cells.splice(i * gridSize, gridSize, ...row.reverse());
        }
    }

    function moveUp() {
        for (let i = 0; i < gridSize; i++) {
            let column = [cells[i], cells[i + gridSize], cells[i + gridSize * 2], cells[i + gridSize * 3]];
            column = slide(column);
            column = combine(column);
            column = slide(column);
            cells[i] = column[0];
            cells[i + gridSize] = column[1];
            cells[i + gridSize * 2] = column[2];
            cells[i + gridSize * 3] = column[3];
        }
    }

    function moveDown() {
        for (let i = 0; i < gridSize; i++) {
            let column = [cells[i], cells[i + gridSize], cells[i + gridSize * 2], cells[i + gridSize * 3]];
            column = slide(column.reverse());
            column = combine(column);
            column = slide(column);
            cells[i] = column[3];
            cells[i + gridSize] = column[2];
            cells[i + gridSize * 2] = column[1];
            cells[i + gridSize * 3] = column[0];
        }
    }

    function slide(row) {
        let arr = row.filter(val => val);
        let missing = gridSize - arr.length;
        return arr.concat(Array(missing).fill(0));
    }

    function combine(row) {
        for (let i = 0; i < gridSize - 1; i++) {
            if (row[i] === row[i + 1] && row[i] !== 0) {
                row[i] *= 2;
                row[i + 1] = 0;
            }
        }
        return row;
    }

    function addNewTile() {
        let emptyCells = cells.map((val, index) => val === 0 ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            cells[randomCell] = Math.random() > 0.9 ? 4 : 2;
        }
    }

    function updateGrid() {
        gridCells.forEach((cell, i) => {
            cell.textContent = cells[i] === 0 ? '' : cells[i];
            cell.setAttribute('data-value', cells[i]);
        });
    }
});
