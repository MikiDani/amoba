var boxDiv = document.getElementsByClassName('box-div');
var reBoxDiv = document.getElementById('rebox');
var reset = document.getElementById('reset');
var ikszKor = true;     //  true = X    false = 0
var keyboardLock = false;
var vId=12;
var boardX;
var boardY;

var board = Array(
    Array(0,0,0,0,0,),
    Array(0,0,0,0,0,),
    Array(0,0,0,0,0,),
    Array(0,0,0,0,0,),
    Array(0,0,0,0,0,),
);

var boardReset = () => {
    var szamol=0;
    for ( var y=0; y<board.length; ++y) {
        for ( var x=0; x<board[y].length; ++x) {
            board[x][y]=0;
            boxDiv[szamol].classList.remove('kor');
            boxDiv[szamol].classList.remove('iksz');
            boxDiv[szamol].classList.remove('keret');
        //  board[x][y]=Math.floor(Math.random() * 3);
            szamol++;
        }
    }
}

var boardDraw = () => {
    boxDiv[vId].classList.add('keret');
    var szamol=0;
    for ( var y=0; y<board.length; ++y) {
        for ( var x=0; x<board[y].length; ++x) {
            //boxDiv[szamol].innerHTML='<h6>id: '+szamol+' értek: '+boardDataRead(szamol)+'</h6>';
            if (board[y][x]==1) {
                boxDiv[szamol].classList.add('kor');
            }
            if (board[y][x]==2) {
                boxDiv[szamol].classList.add('iksz');
            }      
            szamol++;
        }
    }
}

var megnyom = (id) => {
    boxDiv[vId].classList.remove('keret');
    let seeVid= vId+id;
    if ((seeVid>-1) && (seeVid<25)) {
        vId=vId+id;
    }
    boxDiv[vId].classList.add('keret');
}

var boardDataRead = (id) => {
    var szamol=0;
    for ( var y=0; y<board.length; ++y) {
        for ( var x=0; x<board[y].length; ++x) {
            if (szamol==id) {
                boardX = x;
                boardY = y;
                return board[y][x];
            }
            szamol++;
        }
    }
}

var boardFullCheck = () => {
    vanUres=false;
    for ( var y=0; y<board.length; ++y) {
        for ( var x=0; x<board[y].length; ++x) {
            if (board[y][x]==0) {
                vanUres=true;
            }
        }
    }
    if (vanUres==false) {
        reBoxDiv.innerHTML='<h5>Megtelt a tábla.</h5>';
        gameOver();
    }
}

var insertDummy = () => {
    var boardValue=boardDataRead(vId);
    if (boardValue==0) {
        var audio = document.getElementById("space"); audio.play();
        if (ikszKor==false) {
            boxDiv[vId].classList.add('kor');
            board[boardY][boardX]=1;
            pointCheck(1);
            ikszKor=true;
        } else { 
            boxDiv[vId].classList.add('iksz');
            board[boardY][boardX]=2;
            pointCheck(2);
            ikszKor=false;
            }
    } else {
        reBoxDiv.innerHTML='<h5>Foglalt!</h5>';
    }
}

/********** ELLENŐRIZ ***********/
var pointCheck = (mit) => {
    var sz;
    var szamol=0;

    if (mit==1) { sz='piros'; }
    if (mit==2) { sz='sárga'; }
    
    /* függőleges */
    for ( var y=0; y<board.length-2; ++y) {
        for ( var x=0; x<board[y].length; ++x) {
            if (board[y][x]==mit) {
                if ((board[y+1][x]==mit) && (board[y+2][x]==mit)) {
                    reBoxDiv.innerHTML='<h5>Nyert a '+sz+' játékos!</h5>';
                    gameOver(sz);
                }
            }
        szamol++;
        }
    }
    /* vízszintes */
    for ( var y=0; y<board.length; ++y) {
        for ( var x=0; x<board[y].length-2; ++x) {
            if (board[y][x]==mit) {      
                if ((board[y][x+1]==mit) && (board[y][x+2]==mit)) {
                    reBoxDiv.innerHTML='<h5>Nyert a '+sz+' játékos!</h5>';
                    gameOver(sz);
                }
            }
        szamol++;
        }
    }
    /* keresztbe - */
    for ( var y=0; y<board.length-2; ++y) {
        for ( var x=2; x<board[y].length; ++x) {
            if (board[y][x]==mit) {
                if ((board[y+1][x-1]==mit) && (board[y+2][x-2]==mit)) {
                    gameOver(sz);
                }
            }
        szamol++;
        }
    }
    /* keresztbe + */
    for ( var y=0; y<board.length-2; ++y) {
        for ( var x=0; x<board[y].length-2; ++x) {
            if (board[y][x]==mit) {                
                if ((board[y+1][x+1]==mit) && (board[y+2][x+2]==mit)) {
                    gameOver(sz);
                } 
            }
        szamol++;
        }
    }
}

var gameOver = (jatekos) => {
    reBoxDiv.innerHTML='<h5>Nyert a '+jatekos+' játékos!</h5>';
    var audio = document.getElementById("win"); audio.play();
    keyboardLock=true;
    boxDiv[vId].classList.remove('keret');
}

var boardVezerel = () => {
    document.addEventListener('keydown', function(event) {
        if (keyboardLock==false) {
            reBoxDiv.innerHTML='<h5></h5>';

            if(event.keyCode == 39) {
                //console.log('jobb');
                megnyom(1);
            }   
            if(event.keyCode == 37) {
                //console.log('bal');
                megnyom(-1);
            }
            if(event.keyCode == 38) {
                //console.log('fel');
                megnyom(-5);
            }
            if(event.keyCode == 40) {
                //console.log('le');
                megnyom(+5);
            }
            if(event.keyCode == 32) {
                //console.log('space');
                insertDummy();
            }
            boardFullCheck();
        }
        if(event.keyCode == 82) {
            //console.log('gyors reset R');
            resetFunction();
        }
    });
}

var resetFunction = () => {
    ikszKor = true;
    keyboardLock = false;
    vId=12;
    reBoxDiv.innerHTML='<h5></h5>';
    //console.clear();
    boardReset();
    boardDraw();
}

reset.onclick = () => {
    resetFunction();
}

/************************/
boardDraw();
boardVezerel();
/************************/
