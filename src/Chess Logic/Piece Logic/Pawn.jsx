import PieceClass from "../Piece Collection Logic/PieceClass";
import BlackPawn from '../../assets/BlackPawn.svg';
import WhitePawn from '../../assets/WhitePawn.svg';
class Pawn extends PieceClass {
    constructor(x, y, color) {
        super(x, y, color);
        this.piece = "Pawn" + this.color;
        this.image = this.color == "Black" ? BlackPawn : WhitePawn;
        this.canEnpassantRight = [true, false];
        this.canEnpassantLeft = [true, false];
        this.promoted =false;
    }

    nextMoves(chessboard) {
        if (this.nextMovesList.length == 0 && !this.safeMoves) {
            if (this.color == "Black" ) {
                if (this.validPosition(this.x+1,this.y)&&chessboard[this.x + 1][this.y] == 0) {
                    this.nextMovesList.push([this.x + 1, this.y] )
                    if (this.x == this.origin[0] && this.y == this.origin[1]  &&chessboard[this.x + 2][this.y] == 0) {
                        this.nextMovesList.push([this.x + 2, this.y]);
                    }
                }
                if (this.validPosition(this.x + 1, this.y - 1) && (chessboard[this.x + 1][this.y - 1] != 0 && this.notSameColorPiece(chessboard[this.x + 1][this.y - 1]))) {
                    this.nextMovesList.push([this.x + 1, this.y - 1])
                }
                if (this.validPosition(this.x + 1, this.y + 1) && (chessboard[this.x + 1][this.y + 1] != 0 && this.notSameColorPiece(chessboard[this.x + 1][this.y + 1]))) {
                    this.nextMovesList.push([this.x + 1, this.y + 1])
                }
                if (this.x == 4) {
                    if (chessboard[4][this.y - 1] instanceof Pawn && chessboard[4][this.y - 1].move == 1 && this.canEnpassantLeft[0]) {
                        this.nextMovesList.push([5, this.y - 1])
                        this.canEnpassantLeft[1] = true
                    }
                    if (chessboard[4][this.y + 1] instanceof Pawn && chessboard[4][this.y + 1].move == 1 && this.canEnpassantRight[0]) {
                        this.nextMovesList.push([5, this.y + 1])
                        this.canEnpassantRight[1] = true
                    }
                }
            }
            else if (this.color == "White") {
                if (this.validPosition(this.x - 1, this.y) && chessboard[this.x - 1][this.y] == 0) {
                    this.nextMovesList.push([this.x - 1, this.y])
                    if (this.x == this.origin[0] && this.y == this.origin[1] &&chessboard[this.x - 2][this.y] == 0) {
                        this.nextMovesList.push([this.x - 2, this.y]);
                    }
                }
                if (this.validPosition(this.x-1, this.y - 1) && (chessboard[this.x - 1][this.y - 1] != 0 && this.notSameColorPiece(chessboard[this.x - 1][this.y - 1]))) {
                    this.nextMovesList.push([this.x - 1, this.y - 1])
                }
                if (this.validPosition(this.x - 1, this.y + 1) && (chessboard[this.x - 1][this.y + 1] != 0 && this.notSameColorPiece(chessboard[this.x - 1][this.y + 1]))) {
                    this.nextMovesList.push([this.x - 1, this.y + 1])
                }
                if (this.x == 3) {
                    if (chessboard[3][this.y - 1] instanceof Pawn && chessboard[3][this.y - 1].move == 1 && this.canEnpassantLeft[0]) {
                        this.nextMovesList.push([2, this.y - 1])
                        this.canEnpassantLeft[1] = true
                    }
                    if (chessboard[3][this.y + 1] instanceof Pawn && chessboard[3][this.y + 1].move == 1 && this.canEnpassantRight[0]) {
                        this.nextMovesList.push([2, this.y + 1])
                        this.canEnpassantRight[1] = true
                    }
                }
            }
        }
    }

    CanEnPasent(color,chessboard){
        var right = [this.canEnpassantRight[0],false]
        var left = [this.canEnpassantLeft[0],false]
        if (this.x == 4 && color == "Black") {
            if (chessboard[4][this.y - 1] instanceof Pawn && chessboard[4][this.y - 1].move == 1 && this.canEnpassantLeft[0]) {
                left[1]=true;
            }
            if (chessboard[4][this.y + 1] instanceof Pawn && chessboard[4][this.y + 1].move == 1 && this.canEnpassantRight[0]) {
                right[1] =true;
            }
        }
        else if (this.x == 3 && color == "White") {
            if (chessboard[3][this.y - 1] instanceof Pawn && chessboard[3][this.y - 1].move == 1 && this.canEnpassantLeft[0]) {
                left[1] = true;
            }
            if (chessboard[3][this.y + 1] instanceof Pawn && chessboard[3][this.y + 1].move == 1 && this.canEnpassantRight[0]) {
                right[1] = true;
            }
        }
        return [left,right];
    }

    reset() {

        this.emptyTheMoves()
        if (this.canEnpassantLeft[1]) { this.canEnpassantLeft[0] = false }
        if (this.canEnpassantRight[1]) { this.canEnpassantRight[0] = false }
        this.safeMoves = false
    }

    checkEnpasent(lastpos, newpos) {
        const cord = this.color == "Black" ? [4, 5] : [3, 2]
        if (lastpos[0] == cord[0] && newpos[0] == cord[1]) {
            if (lastpos[1] - 1 == newpos[1] && this.canEnpassantLeft[1]) {
                return [lastpos[0], newpos[1]]
            }
            if (lastpos[1] + 1 == newpos[1] && this.canEnpassantRight[1]) {
                return [lastpos[0], newpos[1]]
            }
        }
    }
    notAttackingMove(move) {
        return move[1] == this.y
    }

    moveThePiece(x, y) {
        var loc = [this.x, this.y];
        this.x = x;
        this.y = y;
        this.move += 1;
        var temp = this.checkEnpasent(loc, [x, y]);
        if (temp) {
            return {
                move: "Enpassent",
                deadpiece: temp
            }
        }

        if((this.color=="Black"?7:0) == x){
            return{
                move : "Promotion",
                pawn: [x,y]
            }
        }
    }
    removepiece(obj){
        if (!this.promoted){
            obj.pawn+=1;
            return;
        }
    }

    getFenChar(){
        return this.color == "Black"?"p":"P"
    }

    checkFenEnPaseent(){
        if(this.move ==1){
            var place = this.color == "Black"? this.origin[0]+2:this.origin[0]-2;
                if(this.x == place){
                    return String.fromCharCode(97+this.y)+(this.color=="Black"?8-this.x:this.x-1 );
                }
                else{
                    return "-"
                }
            
        }
        else{
            return "-"
        }
    }

}

export default Pawn;