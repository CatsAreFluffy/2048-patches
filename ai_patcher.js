var gametitle=document.getElementsByClassName("title")[0].innerHTML
if(takeOver){ //takeOver is a function used by the AI
    function takeOver(){

    //try {    //enable for error protection
    
        // test game is compatible and set exec str
        ///testGame();
    
        // take over manager
        realGM = eval(gm_exec_str);

        // set constants
        GRID_SIZE = realGM.size;
        for (var i=0;i<100;i++) {
            if (realGM.getVector(i) == null) break;
        }    
        NUM_OF_MOVES = i;
    
        // setup speedups
//        speedups();

        var testAI = new AI(realGM);
        var res = testAI.getBestMove();
    
        realAI = new AI(realGM);
    
        if (document.getElementById('toggleAI')) return;
        setup_UI();
    /*} catch (e) {
        alert("There's a problem accessing this game. If you want me to fix this, please report it at the feedback link.");*/
    
    }    
    console.log('AI Patch successful!');
    console.log('You can play with the AI constants RUNS and MOVES_AHEAD to control AI strength. Set DEBUG to see verbose running data.');
    console.log('run speedups() for experimental speedup patchs.');
    
    }
    if(gametitle==="Isotopic 256"){ //Isotopic 256 requires a patch to copy instability to random runs
        AI.prototype.cloneGM=function(gm) {
            // create a backgroud manager to do the runs on
            var bgm = new GameManager(GRID_SIZE, StubManager, StubManager, StubManager);
    
                // clone grid
                for (var x=0;x<gm.grid.cells.length;x++) {
                for (var y=0;y<gm.grid.cells[x].length;y++) {
                    var cell = gm.grid.cells[x][y];
            
                    // clone cell if exists
                    if (cell) {
                        var value = JSON.parse(JSON.stringify(cell.value));
                        var unstable = cell.unstable
                        cell = new Tile({ x: cell.x, y: cell.y }, cell.value);
                        cell.unstable = unstable
                    }
            
                    bgm.grid.cells[x][y] = cell;
                }
            }
    
            return bgm;
        }
    }if(gametitle=="DIVE"){ //AI fails to load
        GameManager.prototype.isGameTerminated = function () {
            if (this.over || (this.won && !this.keepPlaying)) {
                return true;
            } else {
                return false;
            }
        }
        GameManager.prototype.keepPlaying = true;
        StubManager.prototype.updateCurrentlyUnlocked=StubManager.prototype.setGameMode=StubManager.prototype.announce=nullfunc;
        // this gets annoying
        HTMLActuator.prototype.announce = function (message) {
            var announce = document.createElement("p");
            announce.classList.add("announcement");
            announce.textContent = message;
            this.announcer.appendChild(announce);
            setTimeout(this.removeFirstChild.bind(this,this.announcer),250);
        }
        AI.prototype.cloneGM=function(gm) {
            // create a backgroud manager to do the runs on
            var bgm = new GameManager(GRID_SIZE, StubManager, StubManager, StubManager);
    
                // clone grid
                for (var x=0;x<gm.grid.cells.length;x++) {
                for (var y=0;y<gm.grid.cells[x].length;y++) {
                    var cell = gm.grid.cells[x][y];
            
                    // clone cell if exists
                    if (cell) {
                        var value = JSON.parse(JSON.stringify(cell.value));
                        cell = new Tile({ x: cell.x, y: cell.y }, cell.value);
                    }
            
                    bgm.grid.cells[x][y] = cell;
                }
            }
            bgm.tileTypes = gm.tileTypes;
    
            return bgm;
        }
        document.getElementsByClassName("game-intro")[1].classList.remove("game-intro");
        takeOver();
}
if(gametitle==="DIVE"){
    document.body.appendChild(document.createElement('style')).src='https://catsarefluffy.github.io/2048-patches/big_grid_dive.css';
}else{
    document.body.appendChild(document.createElement('style')).src='https://catsarefluffy.github.io/2048-patches/big_grid.css';
}
