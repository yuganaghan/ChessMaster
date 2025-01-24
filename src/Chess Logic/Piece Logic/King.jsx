import PieceClass from "../Piece Collection Logic/PieceClass";
import WhiteKing from '../../assets/WhiteKing.svg'
import BlackKing from '../../assets/BlackKing.svg'
import Rook from "./Rook";

class King extends PieceClass {
    constructor(x, y, color) {
        super(x, y, color);
        this.castling = true;
        this.image = this.color == "Black" ? BlackKing : WhiteKing;
        this.piece = "King" + this.color;
        this.incheck = false;
    }

    nextMoves(chessboard) {
        if (this.move > 0) { this.castling = false; }
        if (this.nextMovesList.length == 0 && !this.safeMoves) {
            var location = [this.x, this.y]
            var posiibilitys = [[location[0], location[1] - 1], [location[0], location[1] + 1],
            [location[0] - 1, location[1]], [location[0] + 1, location[1]], [location[0] + 1, location[1] + 1],
            [location[0] + 1, location[1] - 1], [location[0] - 1, location[1] + 1], [location[0] - 1, location[1] - 1]]

            posiibilitys = posiibilitys.filter(x => this.validPosition(x[0], x[1]))

            posiibilitys = posiibilitys.filter(x => chessboard[x[0]][x[1]] == 0 || this.notSameColorPiece(chessboard[x[0]][x[1]]))
            if(this.castling &&  (!this.incheck)){
                var x = this.color == "Black" ? 0 : 7;
                var Rooks = this.color == "Black" ? [chessboard[0][0], chessboard[0][7]] : [chessboard[7][0], chessboard[7][7]]
            
            
                if (Rooks[0] instanceof Rook && Rooks[0].castling) {
                    if (chessboard[x][1] == 0 && chessboard[x][2] == 0 && chessboard[x][3] == 0) {
                        posiibilitys.push([x, 2])
                    }
                }
                if (Rooks[1] instanceof Rook && Rooks[1].castling) {
                    if (chessboard[x][5] == 0 && chessboard[x][6] == 0) {
                        posiibilitys.push([x, 6])
                    }
                }
            }
            this.nextMovesList = posiibilitys;
        }
    }

    filterCastle(){
        if(this.nextMovesList.length>0){
            var castle = [false,false]
            var x = this.color == "Black" ? 0 : 7;
            var temp=[]
            this.nextMovesList.forEach(e=>{
                if(e[0]==x && e[1]==3){castle[0]=true}
                if(e[0]==x && e[1]==5){castle[1]=true}
            })
            this.nextMovesList.forEach(e=>{
                if(e[0]==x &&(e[1] ==2 || e[1]==6)){
                    if(castle[e[1]==2?0:1]){temp.push(e)}
                }
                else{temp.push(e)}
            })
            this.nextMovesList = temp;
        }        
    }

    moveThePiece(x,y){
        const loc = [this.x,this.y];
        this.x=x;
        this.y=y;
        this.move +=1 ;
        var x = this.color == "Black" ? 0 : 7;
        if (this.castling &&( loc[1]-this.y == 2 || loc[1]-this.y==-2)){
            return{
                move:"Castle",
                rook:[x,(loc[1]-this.y==2)?0:7]
            }
        }
    }

    getFenChar(){
        return this.color == "Black"?"k":"K";
    }

    getCastleFenChar(chessboard){
        var color = "Black" == this.color?0:7
        if(this.castling ){
            var kingSide = chessboard[color][7] instanceof Rook && chessboard[color][7].castling
            var queenSide = chessboard[color][0] instanceof Rook && chessboard[color][0].castling
            return  color == 0?((kingSide?"k":"")+(queenSide?"q":"")):((kingSide?"K":"")+(queenSide?"Q":""));
        }
        else return ""
    }

}

export default King;