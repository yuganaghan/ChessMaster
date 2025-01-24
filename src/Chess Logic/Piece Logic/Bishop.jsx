
// Imports
import PieceClass from "../Piece Collection Logic/PieceClass";
import BlackBishop from "../../assets/BlackBishop.svg"
import WhiteBishop from "../../assets/WhiteBishop.svg"


class Bishop extends PieceClass {
    // Assigning Value
    constructor(x, y, color) {
        super(x, y, color);
        this.piece = "Bishop" + this.color;
        // Defining image according to color
        this.image = this.color == "Black" ? BlackBishop : WhiteBishop;
        this.promoted = false
    }

    // Calculating all the move that can be mad by this pices
    nextMoves(chessboard) {
        if (this.nextMovesList.length == 0 && !this.safeMoves) {
            // Calculatin upper left corner
            for (let i = this.x - 1, j = this.y - 1; i >= 0 && j >= 0; i--, j--) {
                if (chessboard[i][j] != 0) {
                    if (this.notSameColorPiece(chessboard[i][j])) { this.nextMovesList.push([i, j]) }
                    break;
                }
                this.nextMovesList.push([i, j]);
            }

            // Lower Right side
            for (let i = this.x + 1, j = this.y + 1; i <= 7 && j <= 7; i++, j++) {
                if (chessboard[i][j] != 0) {
                    if (this.notSameColorPiece(chessboard[i][j])) { this.nextMovesList.push([i, j]) }
                    break;
                }
                this.nextMovesList.push([i, j]);
            }

            // Upper Right side
            for (let i = this.x - 1, j = this.y + 1; i >= 0 && j <= 7; i--, j++) {
                if (chessboard[i][j] != 0) {
                    if (this.notSameColorPiece(chessboard[i][j])) { this.nextMovesList.push([i, j]) }
                    break;
                }
                this.nextMovesList.push([i, j]);
            }

            // Lower Left Side
            for (let i = this.x + 1, j = this.y - 1; i <= 7 && j >= 0; i++, j--) {
                if (chessboard[i][j] != 0) {
                    if (this.notSameColorPiece(chessboard[i][j])) { this.nextMovesList.push([i, j]) }
                    break;
                }
                this.nextMovesList.push([i, j]);
            }
        }
    }

    removepiece(obj){
        if (this.promoted){
            obj.pawn+=1;
            return;
        }
        obj.bishop +=1;
    }

    getFenChar(){
        return this.color == "Black"?"b":"B";
    }

}

export default Bishop;