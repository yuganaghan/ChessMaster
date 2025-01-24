import { useState } from 'react';
import ChessBoard from '../../../ChessBord';
import '../../ChessComponentsCss/ChessComponents.css';
import BottomSetting from '../Chess Side Component/BotomSettings';
import PieceComponent from '../Chess Side Component/PieceComponent';
import SidePiecesBars from '../Chess Side Component/SidePiecesBars';
import Draw from '../Chess Using Component/Draw';
import CheckMate from '../Chess Using Component/CheckMate';
import PromotionComponent from '../Chess Using Component/PromotionComponent';
import PieceClass from '../../../Chess Logic/Piece Collection Logic/PieceClass';
import Pawn from '../../../Chess Logic/Piece Logic/Pawn';

var lastMove = undefined;
var flip = false;

function drawBoard() {
    const [visibilityStates, setVisibilityStates] = useState(Array(64).fill(false));
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [selectedPieceMoves, setSelectedPieceMoves] = useState(null);
    const [showpieceSection, setShowpieceSection] = useState(false);
    const [showpieceInfo, setShowpieceInfo] = useState(null);
    const [checkMate, setCheckMate] = useState(null);
    const [draw, setDraw] = useState(false);
    const [deadWhite, setDeadWhite] = useState(ChessBoard.whitePiece.pieceNumber);
    const [pieces, setPieces] = useState(defineAllPiece());
    const [deadBlack, setDeadBlack] = useState(ChessBoard.blackPiece.pieceNumber);

    function defineAllPiece() {
        var temp = Array(64).fill(null);
        temp = temp.map((_, index) => {
            if (flip) { index = 63 - index; }
            const isBlackSquare = (Math.floor(index / 8) + index) % 2 === 0;
            const k = [Math.floor(index / 8), index % 8];
            const classType = isBlackSquare ? "WhiteSquare" : "BlackSquare";
            const img = ChessBoard.ChessBoard[k[0]][k[1]] == 0 ? null : ChessBoard.ChessBoard[Math.floor(index / 8)][index % 8].image;

            return ({
                    color: isBlackSquare,
                    location: k,
                    classColor: classType,
                    image: img,
                })
        })
        return temp;
    }


    function chageTheDisplayBoard(index) {
        const piece = ChessBoard.ChessBoard[index[0]][index[1]];
        chageToNormal();
        if (checkMate == null && showpieceSection == false) {

            if (piece instanceof PieceClass && piece.color == ChessBoard.move) {
                setSelectedPiece(piece);
                piece.nextMoves(ChessBoard.ChessBoard);

                if (piece.color == "White") { ChessBoard.whitePiece.filterMove(piece); }
                else if (piece.color == "Black") { ChessBoard.blackPiece.filterMove(piece); }


                setSelectedPieceMoves(piece.nextMovesList);

                piece.nextMovesList.forEach(function (ele, ind) {
                    chagePointStates((ele[0] * 8) + ele[1]);
                })

            }

            if (selectedPiece != null) {
                selectedPieceMoves.forEach(element => {
                    if (element[0] == index[0] && element[1] == index[1]) {
                        moveAPiece(index)
                        return
                    }
                });
            }
        }

    }


    function moveAPiece(index) {
        ChessBoard.halfMove += 1
        const color = selectedPiece.color
        var temp = ChessBoard.ChessBoard[index[0]][index[1]]
        ChessBoard.ChessBoard[index[0]][index[1]] = selectedPiece
        ChessBoard.ChessBoard[selectedPiece.x][selectedPiece.y] = 0;
        lastMove = [index, [selectedPiece.x, selectedPiece.y]];
        handleSpecialMove(selectedPiece.moveThePiece(index[0], index[1]));
        if (selectedPiece instanceof Pawn) { ChessBoard.halfMove = 0; }
        if (ChessBoard.RemovePiece(temp)) {
            ChessBoard.halfMove = 0;
            setDeadWhite(ChessBoard.whitePiece.pieceNumber)
            setDeadBlack(ChessBoard.blackPiece.pieceNumber)
        }
        reset();
        if (color == "Black") {
            ChessBoard.whitePiece.King.incheck = ChessBoard.whitePiece.isKingInCheck(ChessBoard.ChessBoard, "Black", undefined, "DrawBoard")
            if (ChessBoard.whitePiece.CheckForMate(ChessBoard.ChessBoard)) {
                setCheckMate("Black");
            }
            if (ChessBoard.whitePiece.CheckforStalmet(ChessBoard.ChessBoard)) {
                setDraw(true);
            }

        }
        else if (color == "White") {
            ChessBoard.blackPiece.King.incheck = ChessBoard.blackPiece.isKingInCheck(ChessBoard.ChessBoard, "White", undefined, "DrawBoard");
            if (ChessBoard.blackPiece.CheckForMate(ChessBoard.ChessBoard)) {
                setCheckMate("White")
            }
            if (ChessBoard.blackPiece.CheckforStalmet(ChessBoard.ChessBoard)) {
                setDraw(true);
            }
        }
        ChessBoard.GenrateFenChar(ChessBoard.ChessBoard[index[0]][index[1]]);
        handleDraw();

    }

    function reset() {
        chageIntoPiece();
        setSelectedPiece(null);
        setSelectedPieceMoves(null);
        ChessBoard.whitePiece.pieceMoved();
        ChessBoard.blackPiece.pieceMoved();
    }

    function handleSpecialMove(specialMove = undefined) {
        if (specialMove != undefined) {
            if (specialMove.move == "Enpassent") {
                const temp = ChessBoard.ChessBoard[specialMove.deadpiece[0]][specialMove.deadpiece[1]]
                ChessBoard.ChessBoard[temp.x][temp.y] = 0
                temp.color == "Black" ? ChessBoard.RemovePiece(temp) : ChessBoard.RemovePiece(temp);
            }
            if (specialMove.move == "Castle") {
                const castlerook = ChessBoard.ChessBoard[specialMove.rook[0]][specialMove.rook[1]]
                ChessBoard.ChessBoard[specialMove.rook[0]][specialMove.rook[1] == 0 ? specialMove.rook[1] + 3 : specialMove.rook[1] - 2] = castlerook
                castlerook.moveThePiece(specialMove.rook[0],specialMove.rook[1] == 0 ? specialMove.rook[1] + 3 : specialMove.rook[1] - 2,"P")
                ChessBoard.ChessBoard[specialMove.rook[0]][specialMove.rook[1]] = 0

            }
            if (specialMove.move == "Promotion") {

                setSelectedPiece(ChessBoard.ChessBoard[specialMove.pawn[0]][specialMove.pawn[1]])
                setShowpieceSection(true);
                setShowpieceInfo({ color: selectedPiece.color, position: [selectedPiece.x, selectedPiece.y] })
                selectedPiece.promoted = true;
                if (selectedPiece.color == "Black") { ChessBoard.RemovePiece(selectedPiece) }
                else { ChessBoard.RemovePiece(selectedPiece) }
            }
        }
    }

    function chageToNormal() {
        setVisibilityStates(Array(64).fill(false));
    }

    function chagePointStates(index) {
        if (flip) { index = 63 - index; }
        setVisibilityStates((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        })
    }

    function chageIntoPiece() {
        if (flip) {
            temp = []
            for (let i = 63; i >= 0; i--) {
                temp.push(pieces[i]);
            }
            temp.forEach(element => {
                element.image = ChessBoard.ChessBoard[element.location[0]][element.location[1]] == 0 ? null : ChessBoard.ChessBoard[element.location[0]][element.location[1]].image;
                element.classColor = element.color ? "WhiteSquare" : "BlackSquare";
                if (lastMove && ((lastMove[0][0] == element.location[0] && lastMove[0][1] == element.location[1]) || (lastMove[1][0] == element.location[0] && lastMove[1][1] == element.location[1]))) {
                    element.classColor = element.color ? "selectedPieceWhite" : "selectedPieceDark";;
                }
            })
        }
        else {
            pieces.forEach(element => {
                element.image = ChessBoard.ChessBoard[element.location[0]][element.location[1]] == 0 ? null : ChessBoard.ChessBoard[element.location[0]][element.location[1]].image;
                element.classColor = element.color ? "WhiteSquare" : "BlackSquare";
                if (lastMove && ((lastMove[0][0] == element.location[0] && lastMove[0][1] == element.location[1]) || (lastMove[1][0] == element.location[0] && lastMove[1][1] == element.location[1]))) {
                    element.classColor = element.color ? "selectedPieceWhite" : "selectedPieceDark";;
                }
            })
        }

    }



    function promotePiece(piece) {
        piece.promoted = true;
        ChessBoard.ChessBoard[piece.x][piece.y] = piece;
        if (piece.color == "White") {
            ChessBoard.whitePiece.pieces.push(piece);
            ChessBoard.whitePiece.isKingInCheck(ChessBoard.ChessBoard, "Black");
        }
        else {
            blackPiece.pieces.push(piece);
            blackPiece.isKingInCheck(ChessBoard.ChessBoard, "White");
        }
        setShowpieceSection(!showpieceSection)
        setPieces(defineAllPiece())
    }

    function Rematch() {
        ChessBoard.ResetBoard();
        setPieces(defineAllPiece());
        setCheckMate(null);
        setSelectedPiece(null);
        setSelectedPieceMoves(null);
        setDraw(false);
        lastMove = undefined;
    }

    function handleDraw() {
        if (ChessBoard.CheckDraw()) { setDraw(true); }
    }

    function FlipBoard() {
        flip = (flip == true) ? false : true;
        setPieces(defineAllPiece())
        chageIntoPiece()
    }

    var temp = pieces.map((_, index) => (
        <PieceComponent
            key={index}
            PieceType={pieces[index].classColor}
            onClick={() => chageTheDisplayBoard(pieces[index].location)}
            image={pieces[index].image}
            visibility={visibilityStates[index]}>
        </PieceComponent>
    ))


    const popUp = showpieceSection ? <PromotionComponent color={showpieceInfo.color} position={[showpieceInfo.position[0], showpieceInfo.position[1]]} promote={promotePiece}></PromotionComponent> : null
    const mate = checkMate ? <CheckMate color={checkMate} rematch={Rematch}></CheckMate> : undefined
    const drawGame = draw ? <Draw rematch={Rematch}></Draw> : undefined;;
    return (
        <div className="container">
            <div className="innerContainer">
                <SidePiecesBars King={ChessBoard.whitePiece.King} List={deadWhite} />
                <div className="boardContainer">
                    {popUp}
                    <div id="baseBoard">
                        {temp}
                    </div>
                    {mate}
                    {drawGame}
                </div>
                <SidePiecesBars King={ChessBoard.blackPiece.King} List={deadBlack} />
            </div>
            <BottomSetting flipBoard={FlipBoard} Resign={() => { setCheckMate(ChessBoard.move == "Black" ? "White" : "Black") }} />
        </div>
    )
}

export default drawBoard; 