class PieceClass{
    constructor(x,y,color){
        this.x =x
        this.y=y
        this.color = color
        this.image ;
        this.origin = [x,y]
        this.nextMovesList =[];
        this.move = 0;
        this.safeMoves = false
    }

    validPosition(x,y){
        if(x>=0 && y>=0 &&x<8 && y<8)return true;
        return false;
    }
    notSameColorPiece(piece){
        return piece.color != this.color;
    }
    emptyTheMoves(){this.nextMovesList=[];}
    nextMoves(chessboard,location){}

    moveThePiece(x,y){
        this.x=x;
        this.y=y;
        this.move +=1 ;
    }
    reset(){
        this.emptyTheMoves();
        this.safeMoves = false;
    }   
}

export default PieceClass;