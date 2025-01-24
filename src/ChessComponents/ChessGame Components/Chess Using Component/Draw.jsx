import WhiteKing from '../../../assets/WhiteKing.svg'
import BlackKing from '../../../assets/BlackKing.svg'
function Draw({rematch}){
    return(
        <div className="draw">
            Game : Draw
            <div className="drawimages">
                <img src={WhiteKing} alt="" className="drawimg" />
                <img src={BlackKing} alt="" className="drawimg" />
            </div>
            <button className="resetGame" onClick={rematch}>Rematch...</button>
        </div>
    )
}

export default Draw