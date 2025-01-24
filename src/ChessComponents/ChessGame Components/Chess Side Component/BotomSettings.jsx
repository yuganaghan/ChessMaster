
function BottomSetting({flipBoard,Resign}){
    return(
        <div className="bottomSetting">
            <button className="bottomButton" onClick={flipBoard}>Flip Board</button>        
            <button className="bottomButton" onClick={Resign}>Resign</button>        
        </div>
    )
}

export default BottomSetting