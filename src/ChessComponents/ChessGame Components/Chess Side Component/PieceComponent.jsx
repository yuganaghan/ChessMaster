function PieceComponent({PieceType,onClick,image,visibility}){
    const dotImg = {
        width: '28%',   
        height: '28%',  
        backgroundColor: 'rgba(66, 56, 56, 0.74)', 
        borderRadius: '50%', 
        position: 'absolute', 
        bottom: '35%',  
        right: '35%',   
        zIndex: 1,
        visibility: visibility ? 'visible' : 'hidden' 
    };    


    return(
        <div className={`singlePiece ${PieceType}`}onClick={onClick}   >
            <img src={image} alt="" className="piece" />
            <div style={dotImg} ></div>
        </div>
    );
}

export default PieceComponent;