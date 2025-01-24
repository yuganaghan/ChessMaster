import King from "../Piece Logic/King";
import Pawn from "../Piece Logic/Pawn";
import ChessBoard from "../../ChessBord";

class PieceList {
    constructor(piecesList, color) {
        this.pieces = piecesList
        this.color = color
        this.King = this.pieces[4];
        this.DeadList = [];
        this.pieceNumber = {
            queen:0,
            rook:0,
            knight:0,
            bishop:0,
            pawn:0
        }
    }
    isKingInCheck(current, pieceColor, king = [this.King.x, this.King.y]) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (current[i][j] != 0 && pieceColor == current[i][j].color) {
                    const piece = current[i][j];
                    piece.nextMovesList = [];
                    piece.nextMoves(current);
                    for (let move of piece.nextMovesList) {
                        if (move[0] == king[0] && move[1] == king[1]) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }


    pieceMoved() {
        this.pieces.forEach(element => {
            element.reset()
        });
    }


    copyChessBoard() {
        var x = []
        for (let i = 0; i < 8; i++) {
            let y = [];
            for (let j = 0; j < 8; j++) {
                y.push(ChessBoard.ChessBoard[i][j]);
            }
            x.push(y);
        }
        return x;
    }


    filterMove(piece) {
        var moves = [];
        if (!piece.safeMoves) {
            piece.nextMovesList.forEach(element => {
                const current = this.copyChessBoard();
                current[element[0]][element[1]] = piece;
                current[piece.x][piece.y] = 0;

                if (piece instanceof Pawn) {
                    var temp = piece.checkEnpasent([piece.x, piece.y], element)
                    if (temp != undefined) { current[temp[0]][temp[1]] = 0 }
                }
                piece.nextMovesList = moves;

                if (!this.isKingInCheck(current, piece.color == "Black" ? "White" : "Black", piece instanceof King ? element : undefined)) {
                    moves.push(element);
                }
            })
            if (piece instanceof King) {
                piece.filterCastle()
            }
            

            piece.safeMoves = true;
        }
        return moves
    }

    CheckForMate(chessboard) {
        if (this.King.incheck) {
            for (let i = 0; i < this.pieces.length; i++) {
                const onePiece = this.pieces[i];
                onePiece.reset();
                onePiece.nextMoves(chessboard);
                this.filterMove(onePiece);
                if (onePiece.nextMovesList.length > 0) {
                    return false;
                }
            }
            return true;
        }
        return false
    }

    CheckforStalmet(chessboard){
        if(!this.King.incheck){
            for (let i = 0; i < this.pieces.length; i++) {
                const onePiece = this.pieces[i];
                onePiece.reset();
                onePiece.nextMoves(chessboard);
                this.filterMove(onePiece);
                if(onePiece.nextMovesList.length>0){
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}

export default PieceList;