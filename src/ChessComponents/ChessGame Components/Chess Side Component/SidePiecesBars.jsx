import bp from '../../../assets/BlackPawn.svg';
import wp from '../../../assets/WhitePawn.svg';
import br from '../../../assets/BlackRook.svg';
import wr from '../../../assets/WhiteRook.svg';
import bb from '../../../assets/BlackBishop.svg';
import wb from '../../../assets/WhiteBishop.svg';
import bk from '../../../assets/BlackKnight.svg';
import wk from '../../../assets/WhiteKnight.svg';
import bq from '../../../assets/BlackQueen.svg';
import wq from '../../../assets/WhiteQueen.svg';

function InstanceOfPiece({x}){
    return(
        <div className="TwoDeadPiece">
            <img src={x[0]} alt="" className="oneDeadMove" />
            {x[1] &&<img src={x[1]} alt="" className="oneDeadMove" />}
        </div>
    )
}

const images = {
    queen:[bq,wq],
    rook:[br,wr],
    knight:[bk,wk],
    bishop:[bb,wb],
    pawn:[bp,wp],
}

function ProsessList(List){
    var temp = Object.keys(List).map(item=>([item,List[item]]))
    var x = temp[4][1]>2?temp[4][1]:undefined;
    if(x){
        temp[4][1] =2;
        while(x>0){
            if(x==1){
                temp.push(["pawn",1])
            }
            if(x>1){temp.push(["pawn",2])}
            x-=2;
        }   
    }
    // console.log(temp)
    return temp;
}


function SidePiecesBars({King,List}){

    const color = King.color =="Black"?0:1;

    const temp = ProsessList(List).map((item,index)=>{
            if(item[1] == 0){return undefined;}
            if(item[1] == 1){return <InstanceOfPiece x={[images[item[0]][color]]} key={index}/>}
            if(item[1] == 2){return <InstanceOfPiece x={[images[item[0]][color],images[item[0]][color]]} key={index}/>}
    })
    return(
        <div className="sideBar">
            <div className="mainImg">
                <img src={King.image} alt="" className="sideKing" />
                {King.color}
            </div>
            {temp}
        </div>
    )
}

export default SidePiecesBars;