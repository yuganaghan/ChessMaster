import PieceClass from "../Piece Collection Logic/PieceClass";
import BlackKnight from "../../assets/BlackKnight.svg"
import WhiteKnight from "../../assets/WhiteKnight.svg"

class Knight extends PieceClass{
    constructor(x,y,color){
        super(x,y,color);
        this.piece = "Knight"+this.color;
        this.image=this.color == "Black"?BlackKnight:WhiteKnight;
        this.promoted = false;
    }

    nextMoves(chessboard){
        if( this.nextMovesList.length ==0 && !this.safeMoves){
            var location = [this.x,this.y]
            var posiibilitys = [[location[0]-2,location[1]+1],[location[0]-2,location[1]-1],
            [location[0]+2,location[1]-1],[location[0]+2,location[1]+1],[location[0]-1,location[1]+2],
            [location[0]-1,location[1]-2],[location[0]+1,location[1]-2],[location[0]+1,location[1]+2]]
    
            posiibilitys = posiibilitys.filter(x => this.validPosition(x[0],x[1]))
    
            posiibilitys = posiibilitys.filter(x=>chessboard[x[0]][x[1]]==0 || this.notSameColorPiece(chessboard[x[0]][x[1]]) )        
    
            this.nextMovesList = posiibilitys;
        }

    }
    removepiece(obj){
        if (this.promoted){
            obj.pawn+=1;
            return;
        }
        obj.knight +=1;
    }

    getFenChar(){
        return this.color == "Black"?"n":"N"
    }

}

export default Knight;