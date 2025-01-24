import PieceClass from '../Piece Collection Logic/PieceClass';
import WhiteQueen from '../../assets/WhiteQueen.svg'
import BlackQueen from '../../assets/BlackQueen.svg'


class Queen extends PieceClass{
    constructor(x,y,color){
        super(x,y,color);
        this.piece = "Queen"+this.color;
        this.image = this.color=="Black"?BlackQueen:WhiteQueen
        this.promoted = false;
    }

    nextMoves(chessboard){

        if(this.nextMovesList.length ==0 && !this.safeMoves){
            var location = [this.x,this.y]
            // Upper Left Side
    
            for (let i=location[0]-1,j= location[1]-1;i>=0 && j>=0 ; i--,j--) {
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);            
            }
    
            // Lower Right side
            for (let i=location[0]+1,j= location[1]+1;i<=7 && j<=7 ; i++,j++) {
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);            
            }
    
            // Upper Right side
            for (let i=location[0]-1,j= location[1]+1;i>=0 && j<=7 ; i--,j++) {
                // console.log(chessboard[i][j]+" "+[i,j]);
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);            
            }
    
            // Lower Left Side
            for (let i=location[0]+1,j= location[1]-1;i<=7 && j>=0 ; i++,j--) {
                if (chessboard[i][j] != 0){
                    if (this.notSameColorPiece(chessboard[i][j])){this.nextMovesList.push([i,j])}
                    break;
                }
                this.nextMovesList.push([i,j]);            
            }
    
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
        obj.queen +=1;
    }

    getFenChar(){
        return this.color == "Black"?"q":"Q"
    }
}

export default Queen;