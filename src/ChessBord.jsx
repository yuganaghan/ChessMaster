import King from './Chess Logic/Piece Logic/King.jsx'
import Queen from './Chess Logic/Piece Logic/Queen.jsx'
import Bishop from './Chess Logic/Piece Logic/Bishop.jsx'
import Knight from './Chess Logic/Piece Logic/Knight.jsx'
import Rook from './Chess Logic/Piece Logic/Rook.jsx'
import Pawn from './Chess Logic/Piece Logic/Pawn.jsx'
import PieceList from './Chess Logic/Piece Collection Logic/PiecesList.jsx';
class ChessBoard {
    static move = "White";
    static whitePiece = new PieceList([new Rook(7, 0, "White"), new Knight(7, 1, "White"), new Bishop(7, 2, "White"), new Queen(7, 3, "White"), new King(7, 4, "White"), new Bishop(7, 5, "White"), new Knight(7, 6, "White"), new Rook(7, 7, "White"), new Pawn(6, 0, "White"), new Pawn(6, 1, "White"), new Pawn(6, 2, "White"), new Pawn(6, 3, "White"), new Pawn(6, 4, "White"), new Pawn(6, 5, "White"), new Pawn(6, 6, "White"), new Pawn(6, 7, "White")], "White");


    static blackPiece = new PieceList([new Rook(0, 0, "Black"), new Knight(0, 1, "Black"), new Bishop(0, 2, "Black"), new Queen(0, 3, "Black"), new King(0, 4, "Black"), new Bishop(0, 5, "Black"), new Knight(0, 6, "Black"), new Rook(0, 7, "Black"), new Pawn(1, 0, "Black"), new Pawn(1, 1, "Black"), new Pawn(1, 2, "Black"), new Pawn(1, 3, "Black"), new Pawn(1, 4, "Black"), new Pawn(1, 5, "Black"), new Pawn(1, 6, "Black"), new Pawn(1, 7, "Black")], "Black");

    static ChessBoard = [
        [ChessBoard.blackPiece.pieces[0], ChessBoard.blackPiece.pieces[1], ChessBoard.blackPiece.pieces[2], ChessBoard.blackPiece.pieces[3], ChessBoard.blackPiece.pieces[4], ChessBoard.blackPiece.pieces[5], ChessBoard.blackPiece.pieces[6], ChessBoard.blackPiece.pieces[7]],
        [ChessBoard.blackPiece.pieces[8], ChessBoard.blackPiece.pieces[9], ChessBoard.blackPiece.pieces[10], ChessBoard.blackPiece.pieces[11], ChessBoard.blackPiece.pieces[12], ChessBoard.blackPiece.pieces[13], ChessBoard.blackPiece.pieces[14], ChessBoard.blackPiece.pieces[15]],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [ChessBoard.whitePiece.pieces[8], ChessBoard.whitePiece.pieces[9], ChessBoard.whitePiece.pieces[10], ChessBoard.whitePiece.pieces[11], ChessBoard.whitePiece.pieces[12], ChessBoard.whitePiece.pieces[13], ChessBoard.whitePiece.pieces[14], ChessBoard.whitePiece.pieces[15]],
        [ChessBoard.whitePiece.pieces[0], ChessBoard.whitePiece.pieces[1], ChessBoard.whitePiece.pieces[2], ChessBoard.whitePiece.pieces[3], ChessBoard.whitePiece.pieces[4], ChessBoard.whitePiece.pieces[5], ChessBoard.whitePiece.pieces[6], ChessBoard.whitePiece.pieces[7]],
    ]
    static fullMove = 1;
    static halfMove = 0;
    static FENChar = ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]

    static ResetBoard() {
        ChessBoard.whitePiece = new PieceList([new Rook(7, 0, "White"), new Knight(7, 1, "White"), new Bishop(7, 2, "White"), new Queen(7, 3, "White"), new King(7, 4, "White"), new Bishop(7, 5, "White"), new Knight(7, 6, "White"), new Rook(7, 7, "White"), new Pawn(6, 0, "White"), new Pawn(6, 1, "White"), new Pawn(6, 2, "White"), new Pawn(6, 3, "White"), new Pawn(6, 4, "White"), new Pawn(6, 5, "White"), new Pawn(6, 6, "White"), new Pawn(6, 7, "White")], "White");

        ChessBoard.blackPiece = new PieceList([new Rook(0, 0, "Black"), new Knight(0, 1, "Black"), new Bishop(0, 2, "Black"), new Queen(0, 3, "Black"), new King(0, 4, "Black"), new Bishop(0, 5, "Black"), new Knight(0, 6, "Black"), new Rook(0, 7, "Black"), new Pawn(1, 0, "Black"), new Pawn(1, 1, "Black"), new Pawn(1, 2, "Black"), new Pawn(1, 3, "Black"), new Pawn(1, 4, "Black"), new Pawn(1, 5, "Black"), new Pawn(1, 6, "Black"), new Pawn(1, 7, "Black")], "Black");
        ChessBoard.ChessBoard = [
            [ChessBoard.blackPiece.pieces[0], ChessBoard.blackPiece.pieces[1], ChessBoard.blackPiece.pieces[2], ChessBoard.blackPiece.pieces[3], ChessBoard.blackPiece.pieces[4], ChessBoard.blackPiece.pieces[5], ChessBoard.blackPiece.pieces[6], ChessBoard.blackPiece.pieces[7]],
            [ChessBoard.blackPiece.pieces[8], ChessBoard.blackPiece.pieces[9], ChessBoard.blackPiece.pieces[10], ChessBoard.blackPiece.pieces[11], ChessBoard.blackPiece.pieces[12], ChessBoard.blackPiece.pieces[13], ChessBoard.blackPiece.pieces[14], ChessBoard.blackPiece.pieces[15]],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [ChessBoard.whitePiece.pieces[8], ChessBoard.whitePiece.pieces[9], ChessBoard.whitePiece.pieces[10], ChessBoard.whitePiece.pieces[11], ChessBoard.whitePiece.pieces[12], ChessBoard.whitePiece.pieces[13], ChessBoard.whitePiece.pieces[14], ChessBoard.whitePiece.pieces[15]],
            [ChessBoard.whitePiece.pieces[0], ChessBoard.whitePiece.pieces[1], ChessBoard.whitePiece.pieces[2], ChessBoard.whitePiece.pieces[3], ChessBoard.whitePiece.pieces[4], ChessBoard.whitePiece.pieces[5], ChessBoard.whitePiece.pieces[6], ChessBoard.whitePiece.pieces[7]],
        ]
        ChessBoard.FENChar = ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]
        ChessBoard.move = "White";

    }
    static RemovePiece(piece) {
        if (piece != 0) {
            if (piece.color == "Black") {
                var temp = ChessBoard.blackPiece.pieces
                ChessBoard.blackPiece.pieces = []
                temp.forEach(element => {
                    if (element != piece) {
                        ChessBoard.blackPiece.pieces.push(element);
                    }
                    else{
                        element.removepiece(ChessBoard.blackPiece.pieceNumber);
                    }
                })
                return temp != ChessBoard.blackPiece.pieces;
            }
            else if (piece.color == "White") {
                var temp = ChessBoard.whitePiece.pieces
                ChessBoard.whitePiece.pieces = []
                temp.forEach(element => {
                    if (element != piece) {
                        ChessBoard.whitePiece.pieces.push(element);
                    }
                    else{
                        element.removepiece(ChessBoard.whitePiece.pieceNumber);
                    }
                })
                return temp != ChessBoard.whitePiece.pieces;
            }
        }
        return false
    }

    static CheckDraw() {
        if (ChessBoard.whitePiece.pieces.length == 1 && ChessBoard.whitePiece.pieces.length == 1) {
            return true;
        }
        if (ChessBoard.whitePiece.pieces.length == 1) {
            if (ChessBoard.blackPiece.pieces.length == 2) {
                if (ChessBoard.blackPiece.pieces[0] instanceof Bishop || ChessBoard.blackPiece.pieces[0] instanceof Knight || ChessBoard.blackPiece.pieces[1] instanceof Bishop || ChessBoard.blackPiece.pieces[1] instanceof Knight) { return true; }
            }
        }
        if (ChessBoard.blackPiece.pieces.length == 1) {
            if (ChessBoard.whitePiece.pieces.length == 2) {
                if (ChessBoard.whitePiece.pieces[0] instanceof Bishop || ChessBoard.whitePiece.pieces[0] instanceof Knight || ChessBoard.whitePiece.pieces[1] instanceof Bishop || ChessBoard.whitePiece.pieces[1] instanceof Knight) { return true; }
            }
        }
        if( ChessBoard.halfMove ==100){return true;}
        if(ChessBoard.CheckThreefold()){return true;}
        return false;
    }


    static GenrateFenChar(lastpiece){
        var fenChar="";
        const castle = ChessBoard.whitePiece.King.getCastleFenChar(ChessBoard.ChessBoard)+ChessBoard.blackPiece.King.getCastleFenChar(ChessBoard.ChessBoard) 
        if( ChessBoard.move.charAt(0).toLowerCase() == "b"){ChessBoard.fullMove++;}
        ChessBoard.move = (ChessBoard.move == "White"?"Black":"White");
        for(let i=0;i<8;i++){
            var counter = 0;
            for(let j=0;j<8;j++){
                if(ChessBoard.ChessBoard[i][j] ==0){
                    counter++;
                    if(j ==7){
                        fenChar+= counter;
                    }
                }
                else if(ChessBoard.ChessBoard[i][j]!=0){
                    fenChar+= counter==0?ChessBoard.ChessBoard[i][j].getFenChar():counter+ChessBoard.ChessBoard[i][j].getFenChar();
                    counter =0 ;
                }
            }
            if(i!=7){
                fenChar+="/"
            }
        }
        fenChar = (fenChar+" ")
        fenChar += (ChessBoard.move.charAt(0).toLowerCase()+" ")
        fenChar += (castle==""?"- ":(castle+" ")) ;
        if( lastpiece instanceof Pawn){
            fenChar += lastpiece.checkFenEnPaseent()+" ";
        }
        else{
            fenChar += "- "
        }
        fenChar += ChessBoard.halfMove+" ";
        fenChar += ChessBoard.fullMove+"";
        ChessBoard.FENChar.push(fenChar);
    }


    static CheckThreefold(){
        var lastBoard = ChessBoard.FENChar[ChessBoard.FENChar.length-1].split(" ");
        lastBoard = lastBoard[0]+lastBoard[1]+lastBoard[2]+lastBoard[3];
        var counter =1;
        for(let i=0;i<ChessBoard.FENChar.length-1;i++){
            const temp = ChessBoard.FENChar[i].split(" ");
            if(lastBoard == (temp[0]+temp[1]+temp[2]+temp[3]) ){
                counter+=1;
            }
            if(counter ==3){
                console.log("-=")
                return true;
            }
        }
        return false;

    }
}



export default ChessBoard;