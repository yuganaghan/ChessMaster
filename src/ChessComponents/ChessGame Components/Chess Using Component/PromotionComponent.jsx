import React from 'react';
import Queen from "../../../Chess Logic/Piece Logic/Queen";
import Knight from "../../../Chess Logic/Piece Logic/Knight";
import Bishop from "../../../Chess Logic/Piece Logic/Bishop";
import Rook from "../../../Chess Logic/Piece Logic/Rook";

function PromotionComponent({ color, position,promote }) {
    console.log(position);
    const pieces = [
        new Queen(position[0], position[1], color),
        new Bishop(position[0], position[1], color),
        new Knight(position[0], position[1], color),
        new Rook(position[0], position[1], color)
    ];


    return (
        <div className="promotionPopUp">
            <div className="singlePopUpPiece" onClick={()=> promote(pieces[0])}>
                <img src= {pieces[0].image} alt="" className="popUpImg" />
            </div>
            <div className="singlePopUpPiece" onClick={()=> promote(pieces[1])}>
                <img src= {pieces[1].image} alt="" className="popUpImg" />
            </div>
            <div className="singlePopUpPiece" onClick={()=> promote(pieces[2])}>
                <img src= {pieces[2].image} alt="" className="popUpImg" />
            </div>
            <div className="singlePopUpPiece" onClick={()=> promote(pieces[3])}>
                <img src= {pieces[3].image} alt="" className="popUpImg" />
            </div>
        </div>
    );
}

export default PromotionComponent;
