import King from '../../../Chess Logic/Piece Logic/King'

function CheckMate({color,rematch}){
    const king = new King(0,0,color);
    return(
        <div className="checkmate">
            Winner : {color}
            <img src={king.image} className="Wining-Img"></img>
            <button className="resetGame" onClick={rematch}>Rematch...</button>
        </div>
    )
}

export default CheckMate