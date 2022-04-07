export default class Rules {
    tileIsOccupied(x, y, boardState, pieceTeam, pass) {
        let piece;
        if (pass) {
            piece = boardState.find(p => p.x === x && p.y === y && !(p.type === 'king' && p.team === pieceTeam))
        } else {
            piece = boardState.find(p => p.x === x && p.y === y && !(p.type === 'king' && p.team !== pieceTeam))
        }
        if (piece) {
            return true
        } else {
            return false
        }
    }

    tileIsOccupiedbyOpponent(x, y, boardState, pieceTeam) {
        const piece = boardState.find(p => p.x === x && p.y === y && p.team !== pieceTeam)
        if (piece) {
            return true
        } else {
            return false
        }
    }
    ifCheck(boardState, pieceTeam,team) {
        let check = false;
        boardState.forEach(p => {
            if (p.team === pieceTeam) {
                for (let x = 0; x <= 7; x++) {
                    for (let y = 0; y <= 7; y++) {
                        if (this.isValidMove(p.x, p.y, x, y, p.type, p.team,team, boardState)) {
                            boardState.forEach(p => {
                                if (p.team !== pieceTeam && p.x === x && p.y === y && p.type === 'king') {
                                    check = true
                                    return check
                                }
                            })
                        }
                    }
                }
            }
        })
        return check
    }


    ifMate(boardState, pieceTeam,team) {
        let king;
        let mate = false;
        boardState.forEach(p => {
            if (p.type === 'king' && p.team !== pieceTeam) {
                //GLEDANJE KRALJEVIH MJESTA I JELI MAT
                king = p;
                let kingAvailable = []
                for (let x = 0; x <= 7; x++) {
                    for (let y = 0; y <= 7; y++) {
                        if (Math.abs(king.x - x) <= 1 && Math.abs(king.y - y) <= 1
                            && (!this.tileIsOccupied(x, y, boardState, pieceTeam)
                                || this.tileIsOccupiedbyOpponent(x, y, boardState, pieceTeam))) {
                            kingAvailable.push({
                                x: x,
                                y: y
                            })
                        }
                    }
                }

                let arr = [];
                boardState.forEach(p => {
                    if (p.team !== king.team) {
                        for (let x = 0; x <= 7; x++) {
                            for (let y = 0; y <= 7; y++) {
                                if (this.isValidMove(p.x, p.y, x, y, p.type, "black", team, boardState, true)) {
                                    arr.push({
                                        x: x,
                                        y: y
                                    })
                                }
                            }
                        }
                    }
                })
                kingAvailable = kingAvailable.filter(ar => !arr.find(rm => (rm.x === ar.x && ar.y === rm.y)))
                console.log(kingAvailable)
                // kingAvailable = kingAvailable.filter(ar => !(ar.x === king.x && ar.y === king.y))
                // console.log(kingAvailable)
                if (kingAvailable.length === 0) {
                    mate = true;
                    return mate
                }
            }
        })
        return mate
    }

    ifPat(boardState, pieceTeam,team) {
        let king;
        let pat = false;
        boardState.forEach(p => {
            if (p.type === 'king' && p.team !== pieceTeam) {
                //GLEDANJE KRALJEVIH MJESTA
                king = p;
                let kingAvailable = []
                for (let x = 0; x <= 7; x++) {
                    for (let y = 0; y <= 7; y++) {
                        if (Math.abs(king.x - x) <= 1 && Math.abs(king.y - y) <= 1
                            && (!this.tileIsOccupied(x, y, boardState, pieceTeam)
                                || this.tileIsOccupiedbyOpponent(x, y, boardState, pieceTeam))) {
                            kingAvailable.push({
                                x: x,
                                y: y
                            })
                        }
                    }
                }

                let arr = [];
                boardState.forEach(p => {
                    if (p.team !== king.team) {
                        for (let x = 0; x <= 7; x++) {
                            for (let y = 0; y <= 7; y++) {
                                if (this.isValidMove(p.x, p.y, x, y, p.type, pieceTeam,team, boardState, true)) {
                                    arr.push({
                                        x: x,
                                        y: y
                                    })
                                }
                            }
                        }
                    }
                })
                kingAvailable = kingAvailable.filter(ar => !arr.find(rm => (rm.x === ar.x && ar.y === rm.y)))
                kingAvailable = kingAvailable.filter(ar => !(ar.x === king.x && ar.y === king.y))

                if (kingAvailable.length === 0) {
                    pat = true;
                    return pat
                }
            }
        })
        return pat
    }

    isValidMove(px, py, x, y, type,pieceTeam, team, boardState, pass) {
///vidi ono za mat jedno polje sto viri 

        if (!pass) {
            if (pieceTeam !== team) {
            return false
        }
    }

        if (px === x && py === y) {
            return false
        }

        if (type === 'rook') {
            if (x === px || y === py) {
                if (!this.tileIsOccupied(x, y, boardState, pieceTeam, pass) || this.tileIsOccupiedbyOpponent(x, y, boardState, pieceTeam)) {
                    if (y === py) {
                        if (px > x) {
                            for (let i = px - 1; i > x; i--) {
                                if (this.tileIsOccupied(i, y, boardState, pieceTeam, pass)) {
                                    return false;
                                }
                            }
                        } else if (px < x) {
                            for (let i = x - 1; i > px; i--) {
                                if (this.tileIsOccupied(i, y, boardState, pieceTeam, pass)) {
                                    return false
                                }
                            }
                        }
                    } else if (x === px) {
                        if (py > y) {
                            for (let i = py - 1; i > y; i--) {
                                if (this.tileIsOccupied(x, i, boardState, pieceTeam, pass)) {
                                    return false;
                                }
                            }
                        } else if (py < y) {
                            for (let i = y - 1; i > py; i--) {
                                if (this.tileIsOccupied(x, i, boardState, pieceTeam, pass)) {
                                    return false
                                }
                            }
                        }
                    }

                    return true
                }
            }

        } else if (type === 'queen') {

            if (x === px || y === py || (Math.abs(px - x) === Math.abs(py - y))) {
                if (!this.tileIsOccupied(x, y, boardState, pieceTeam, pass) || this.tileIsOccupiedbyOpponent(x, y, boardState, pieceTeam)) {
                    if (y === py) {
                        if (px > x) {
                            for (let i = px - 1; i > x; i--) {
                                if (this.tileIsOccupied(i, y, boardState, pieceTeam, pass)) {
                                    return false;
                                }
                            }
                        } else if (px < x) {
                            for (let i = x - 1; i > px; i--) {
                                if (this.tileIsOccupied(i, y, boardState, pieceTeam, pass)) {
                                    return false
                                }
                            }
                        }
                    } else if (x === px) {
                        if (py > y) {
                            for (let i = py - 1; i > y; i--) {
                                if (this.tileIsOccupied(x, i, boardState, pieceTeam, pass)) {
                                    return false;
                                }
                            }
                        } else if (py < y) {
                            for (let i = y - 1; i > py; i--) {
                                if (this.tileIsOccupied(x, i, boardState, pieceTeam, pass)) {
                                    return false
                                }
                            }
                        }
                    } else if (x > px && y > py) {
                        let j = y;
                        for (let i = x - 1; i > px; i--) {
                            j--;
                            if (this.tileIsOccupied(i, j, boardState, pieceTeam, pass)) {
                                return false;
                            }
                        }
                    } else if (x > px && y < py) {
                        let j = y;
                        for (let i = x - 1; i > px; i--) {
                            j++;
                            if (this.tileIsOccupied(i, j, boardState, pieceTeam, pass)) {
                                return false;
                            }
                        }
                    } else if (x < px && y > py) {
                        let j = x;
                        for (let i = y - 1; i > py; i--) {
                            j++;
                            if (this.tileIsOccupied(j, i, boardState, pieceTeam, pass)) {
                                return false;
                            }
                        }
                    } else if (x < px && y < py) {
                        let j = x;
                        for (let i = y + 1; i < py; i++) {
                            j++;
                            if (this.tileIsOccupied(j, i, boardState, pieceTeam, pass)) {
                                return false;
                            }
                        }
                    }
                    return true
                }

            }

        } else if (type === 'king') {
            if (Math.abs(px - x) <= 1 && Math.abs(py - y) <= 1) {
                return true
            }
        }

        return false
    }

    isValidForKing(px, py, x, y,pieceTeam, team, boardState) {
        if(pieceTeam !== team){
            return false
        }

        if (px === x && py === y) {
            return false
        }

        let kingAvailable = []
        for (let x = 0; x <= 7; x++) {
            for (let y = 0; y <= 7; y++) {
                if (Math.abs(px - x) <= 1 && Math.abs(py - y) <= 1
                    && (!this.tileIsOccupied(x, y, boardState, pieceTeam)
                        || this.tileIsOccupiedbyOpponent(x, y, boardState, pieceTeam))) {
                    kingAvailable.push({
                        x: x,
                        y: y
                    })
                }
            }
        }

        let arr = [];
        boardState.forEach(p => {
           // if (p.team !== team) {
            if (p.team !== pieceTeam) {
                for (let x = 0; x <= 7; x++) {
                    for (let y = 0; y <= 7; y++) {
                        // zasto ovo opponent radi kad sam promijenio na white i black?? umesto pieceteam mozda treba 'black'
                        if (this.isValidMove(p.x, p.y, x, y, p.type, pieceTeam,team, boardState, true)) {
                            arr.push({
                                x: x,
                                y: y
                            })
                        }
                    }
                }
            }
        })

        kingAvailable = kingAvailable.filter(ar => !arr.find(rm => (rm.x === ar.x && ar.y === rm.y)))

        let available = kingAvailable.find(elem => elem.x === x && elem.y === y);


        if (available) {
            return true
        }
        return false
    }
}