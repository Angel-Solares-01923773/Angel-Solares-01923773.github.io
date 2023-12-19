 
// Name: Angel Solares
// Email: angel_solares@student.uml.edu
// File: scrabble.js
// Date: 12/12/23
// GUI Assignment: Scrabble javascript file to make the scrabble game.


$(document).ready(function() {
    // Array of available tiles
   var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;

var tileValues = {
    "A": 1, "B": 3, "C": 3, "D": 2, "E": 1, "F": 4, "G": 2, "H": 4, "I": 1, "J": 8,
    "K": 5, "L": 1, "M": 3, "N": 1, "O": 1, "P": 3, "Q": 10, "R": 1, "S": 1, "T": 1,
    "U": 1, "V": 4, "W": 4, "X": 8, "Y": 4, "Z": 10
};



   
    function generateRandomTiles() {
        var randomTileCount = 7; 
        var tileKeys = Object.keys(ScrabbleTiles);
    
        for (var i = 0; i < randomTileCount; i++) {
            if (tileKeys.length === 0) {
                break;
            }
            
            var randomTileIndex = Math.floor(Math.random() * tileKeys.length);
            var randomTileKey = tileKeys[randomTileIndex];
            var randomTilePath = "img/Scrabble_Tiles/Scrabble_Tile_" + randomTileKey + ".jpg";
    
            var tileImg = $('<img>', {
                class: 'draggable',
                src: randomTilePath,
                alt: randomTileKey 
            });
    
            $('#random-tiles').append(tileImg);
    
            tileKeys.splice(randomTileIndex, 1);
        }
    }

    generateRandomTiles();

    function returnToRack(tile) {
        tile.appendTo('#rack'); 
        tile.css({ top: 0, left: 0 }); 
        $('#rack').find('.tile-container').append(tile);
        updateCurrentWord(); 
    }
    

    $("#gameboard > div").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            var droppedSquare = $(this);
            if (droppedSquare.children().length === 0) { 
                ui.draggable.appendTo(droppedSquare).css({ width: '90px', height: '90px' });
    
                var doubleScoreTiles = droppedSquare.hasClass('doubleScoreTargetBlock');
                var letter = ui.draggable.attr('alt');
                var tileValue = ScrabbleTiles[letter].value;
    
                var currentScore = parseInt($('#score').text());
                var newScore = currentScore + tileValue;
    
                if (doubleScoreTiles) {
                    newScore *= 2; // Double the score for a double score block
                }
                
                $('#score').text(newScore); // Update the score
                ui.draggable.data('counted', true); 
                updateCurrentWord();
            } else {
                returnToRack(ui.draggable); 
                updateCurrentWord();
            }
        }
    });

    // restart button
    $('#restartButton').on('click', function() {
        location.reload(); // Reload the page
      });
   

    // Save Word Button
    $("#saveWordButton").on("click", function() {
        var currentWord = $('.currentWord').text().split('Word: ')[1];
        var currentScore = parseInt($('#score').text());
        var totalPoints = parseInt($('#points').text()) || 0;
        
        if (currentWord.length <= 1) {
            alert("Please form a valid word to save!");
        } else {
            totalPoints += currentScore;
            $('#points').text(totalPoints); 
            // $('#clearButton').click();
            clearGame();
            // generateRandomTiles(); 
            generateMissingTiles();
        }
    });

    
    function clearGame() {
        $('#gameboard .draggable').each(function() {
            $(this).remove(); // Remove the draggable tiles from the game board
        });
    
        $('#gameboard').html(`
            <div class="targetBlock ui-droppable" row="0" col="0"></div>
            <div class="doubleScoreTargetBlock ui-droppable" row="0" col="1"></div>
            <div class="targetBlock ui-droppable" row="0" col="2"></div>
            <div class="targetBlock ui-droppable" row="0" col="3"></div>
            <div class="targetBlock ui-droppable" row="0" col="4"></div>
            <div class="doubleScoreTargetBlock ui-droppable" row="0" col="5"></div>
            <div class="targetBlock ui-droppable" row="0" col="6"></div>
        `);
    
        // Reinitialize droppable functionality
        $(".targetBlock, .doubleScoreTargetBlock").droppable({
            accept: ".draggable",
            drop: function(event, ui) {
                var droppedSquare = $(this);
                if (droppedSquare.children().length === 0) {
                    ui.draggable.appendTo(droppedSquare).css({ width: '90px', height: '90px' });
    
                    if (droppedSquare.hasClass('doubleScoreTargetBlock')) {
                        var letter = ui.draggable.attr('alt');
                        var tileValue = ScrabbleTiles[letter].value;
    
                        var currentScore = parseInt($('#score').text());
                        var newScore = currentScore + tileValue;
                        newScore *= 2; // Double the score for a double score block
                        $('#score').text(newScore); // Update the score
                        ui.draggable.data('counted', true); 
                    } else {
                        updateCurrentWord();
                    }
                } else {
                    updateCurrentWord();
                }
            }
        });
    }
    
    function generateMissingTiles() {
        var rackLetters = [];
        $('#rack .draggable').each(function() {
            var letter = $(this).attr('alt');
            rackLetters.push(letter);
        });
    
        var tilesNeeded = 7 - rackLetters.length;
        var tileKeys = Object.keys(ScrabbleTiles);
    
        while (tilesNeeded > 0 && tileKeys.length > 0) {
            var randomTileIndex = Math.floor(Math.random() * tileKeys.length);
            var randomTileKey = tileKeys[randomTileIndex];
            var randomTilePath = "img/Scrabble_Tiles/Scrabble_Tile_" + randomTileKey + ".jpg";
    
            var tileImg = $('<img>', {
                class: 'draggable',
                src: randomTilePath,
                alt: randomTileKey,
                width: '90px',
                height: '95px',
            });
    
            returnToRack(tileImg);
            rackLetters.push(randomTileKey);
            tilesNeeded--;
            tileKeys.splice(randomTileIndex, 1);
        }
    
        $(".draggable").draggable({
            revert: function(valid) {
                if (!valid) {
                    $(this).animate({ top: 0, left: 0 }, 'slow');
                    returnToRack($(this)); // Return the tile to the rack
                    updateCurrentWord();
                }
                return !valid;
            },
            helper: "clone",
            snap: ".droppable"
        }).disableSelection();
    }
    
    
    
    
    // Clear button
    $('#clearButton').on('click', function() {

        $('#gameboard .draggable').each(function() {
            returnToRack($(this));
        });

    $('#gameboard').html(`
        <div class="targetBlock ui-droppable" row="0" col="0"> </div>
        <div class="doubleScoreTargetBlock ui-droppable" row="0" col="1"> </div>
        <div class="targetBlock ui-droppable" row="0" col="2"> </div>
        <div class="targetBlock ui-droppable" row="0" col="3"> </div>
        <div class="targetBlock ui-droppable" row="0" col="4"> </div>
        <div class="doubleScoreTargetBlock ui-droppable" row="0" col="5"> </div>
        <div class="targetBlock ui-droppable" row="0" col="6"> </div>
    `);

    // Droppable functionality
    $(".targetBlock, .doubleScoreTargetBlock").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            var droppedSquare = $(this);
            if (droppedSquare.children().length === 0) { 
                ui.draggable.appendTo(droppedSquare).css({ width: '90px', height: '90px' });
    
                
                if (droppedSquare.hasClass('doubleScoreTargetBlock')) {
                    var letter = ui.draggable.attr('alt');
                    var tileValue = ScrabbleTiles[letter].value;
    
                        var currentScore = parseInt($('#score').text());
                        var newScore = currentScore + tileValue;
                        newScore *= 2; 
                        $('#score').text(newScore); 
                        ui.draggable.data('counted', true); 
                    
                } else {
                    updateCurrentWord();
                }
            } else {
                returnToRack(ui.draggable); 
                updateCurrentWord();

            }
        }
    });
    });
// Clear button end

    $(".draggable").draggable({
        revert: function(valid) {
            if (!valid) {
                $(this).animate({ top: 0, left: 0 }, 'slow');
                returnToRack($(this)); 
                updateCurrentWord();
            }
            return !valid;
        },
        helper: "clone",
        snap: ".droppable" 
    }).disableSelection(); 


    // function updateScore(word) {
    //     var score = 0;
    //     for (var i = 0; i < word.length; i++) {
    //         var letter = word[i];
    //         score += tileValues[letter] || 0;
    //     }
    //     $('#score').text(score);
    // }

    // Function to update the current word
    function updateCurrentWord() {
        var currentWord = '';
        var totalScore = 0;
        var usedLetters = [];
        var doubleScoreMultiplier = 1;
    
        $('#gameboard > div').each(function() {
            var tile = $(this).find('.draggable');
            if (tile.length > 0) {
                var letter = tile.attr('alt');
                if (letter && !usedLetters.includes(letter)) {
                    currentWord += letter;
    
                    var tileValue = ScrabbleTiles[letter].value;
    
                    if ($(this).hasClass('doubleScoreTargetBlock')) {
                        doubleScoreMultiplier *= 2; 
                    }
    
                    totalScore += tileValue;
                    usedLetters.push(letter);
                }
            }
        });
    
        totalScore *= doubleScoreMultiplier; 
        $('.currentWord').text('Word: ' + currentWord);
        $('#score').text(totalScore);
    }
    
    
});