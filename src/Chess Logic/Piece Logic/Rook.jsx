import PieceClass from "../Piece Collection Logic/PieceClass";
import BlackRook from "../../assets/BlackRook.svg";
import WhiteRook from "../../assets/WhiteRook.svg";
class Rook extends PieceClass{
    constructor(x,y,color){
        super(x,y,color)
        this.piece = "Rook"+this.color;
        this.image = this.color == "Black"?BlackRook:WhiteRook;
        this.castling = true;
        this.promoted = false;
    }
    

    nextMoves(chessboard){
        if(this.move>0){this.castling = false;}
        if(this.nextMovesList.length ==0 && !this.safeMoves){
            var location = [this.x,this.y]
            for(let i=location[0]-1,j=location[1];i>=0;i--){
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);  
            }
            
            for(let i=location[0]+1,j=location[1];i<=7;i++){
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);  
            }
    
            for(let i=location[0],j=location[1]-1;j>=0;j--){
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);  
            }
    
            for(let i=location[0],j=location[1]+1;j<=7;j++){
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);  
            }
        }
    }

    removepiece(obj){
        if (this.promoted){
            obj.pawn+=1;
            return;
        }
        obj.rook +=1;
    }

    getFenChar(){
        return this.color == "Black"?"r":"R";
    }
    moveThePiece(x,y,z=undefined){
        this.x=x;
        this.y=y;
        this.move +=1 ;
        if (z) {
            console.log(x,y);
        }
    }
}

export default Rook