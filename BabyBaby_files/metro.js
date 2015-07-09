/* Metro */

function createArtifact(element, fill, x, y) {
	var tile = fill.cloneNode(true);

	tile.style.position = "absolute";
	tile.style.top = (y * 210) + "px";
	tile.style.left = (x * 210) + "px";
	
	element.parentElement.insertBefore(tile, element.nextSibling);
}

function metrofy() {
	$('.metro').each(function(){
		var gridX = 0;
		var gridY = 0;
		var occupiedX = [];
		var occupiedXnext = [];
		var fill;
		
		var gridXmax = Math.floor($(this).width() / 210);

		$(this).css({width: gridXmax * 210 + "px"});
		
		var tiles = $(this).children();

		if ($(this).find(".tile.fill.template").length) {
			fill = $(this).find(".tile.fill.template").get(0).cloneNode(true);
			fill.className = "artifact";
			fill.style.display = "inline";
			$(this).find(".tile.fill.template").css({display: "none"});
		}
		else {
			fill = document.createElement("div");
			fill.className = "artifact";
		}
		
		for (var i = 0; i < tiles.length; i++) {		
			if (tiles[i].style.display != "none") {
				var classID = tiles[i].className.split(" ");
				
				if (classID[0] != "tile" && classID[0] != "box") {
					tiles[i].remove();
				}
				else {
					if (classID[1] == "small" || classID[1] == "fill") {
						if (gridX >= gridXmax) {
							gridX = 0;
							gridY++;
							occupiedX = occupiedXnext;
							occupiedXnext = [];
						}

						while (occupiedX.indexOf(gridX) > -1) {
							gridX++;

							if (gridX >= gridXmax) {
								gridX = 0;
								gridY++;
								occupiedX = occupiedXnext;
								occupiedXnext = [];
							}
						}
						
						if (classID[1] == "fill") {
							createArtifact(tiles[i], fill, gridX, gridY);
						}
						else {
							tiles[i].style.position = "absolute";
							tiles[i].style.top = (gridY * 210) + "px";
							tiles[i].style.left = (gridX * 210) + "px";
						}
						gridX++;
					}
					else if (classID[1] == "medium") {
						if (gridX >= gridXmax - 1) {
							if (occupiedX.indexOf(gridX) == -1 && gridX == gridXmax - 1) {
								createArtifact(tiles[i], fill, gridX, gridY);
							}
							gridX = 0;
							gridY++;
							occupiedX = occupiedXnext;
							occupiedXnext = [];
						}
						
						while (occupiedX.indexOf(gridX) > -1 || occupiedX.indexOf(gridX + 1) > -1) {
							if (occupiedX.indexOf(gridX) == -1) {
								createArtifact(tiles[i], fill, gridX, gridY);
							}
							gridX++;

							if (gridX >= gridXmax - 1) {
								if (occupiedX.indexOf(gridX) == -1 && gridX == gridXmax - 1) {
									createArtifact(tiles[i], fill, gridX, gridY);
								}
								gridX = 0;	
								gridY++;
								occupiedX = occupiedXnext;
								occupiedXnext = [];
							}
						}
						
						tiles[i].style.position = "absolute";
						tiles[i].style.top = (gridY * 210) + "px";
						tiles[i].style.left = (gridX * 210) + "px";
						
						gridX = gridX + 2;
					}
					else if (classID[1] == "large") {
						if (gridX >= gridXmax - 1) {
							if (occupiedX.indexOf(gridX) == -1 && gridX == gridXmax - 1) {
								createArtifact(tiles[i], fill, gridX, gridY);
							}
							gridX = 0;
							gridY++;
							occupiedX = occupiedXnext;
							occupiedXnext = [];
						}

						while (occupiedX.indexOf(gridX) > -1 || occupiedX.indexOf(gridX + 1) > -1) {
							if (occupiedX.indexOf(gridX) == -1) {
								createArtifact(tiles[i], fill, gridX, gridY);
							}
							gridX++;

							if (gridX >= gridXmax - 1) {
								if (occupiedX.indexOf(gridX) == -1 && gridX == gridXmax - 1) {
									createArtifact(tiles[i], fill, gridX, gridY);
								}
								gridX = 0;	
								gridY++;
								occupiedX = occupiedXnext;
								occupiedXnext = [];
							}
						}
						
						tiles[i].style.position = "absolute";
						tiles[i].style.top = (gridY * 210) + "px";
						tiles[i].style.left = (gridX * 210) + "px";
						
						occupiedXnext.push(gridX, gridX + 1);
						gridX = gridX + 2;
					}
					
					if (classID[2] == "last") {
						gridX = 0;
						gridY++;
						occupiedX = occupiedXnext;
						occupiedXnext = [];
					}
				}
			}
		}
		
                tiles = $(this).children();

		if (gridX != 0) {
			while (gridX < gridXmax) {
				if (occupiedX.indexOf(gridX) == -1) {
					createArtifact(tiles[tiles.length - 1], fill, gridX, gridY);
				} 
				gridX++;
			}
		}
		
		if (occupiedXnext.length > 0) {
			gridY++;
			gridX = 0;
			occupiedX = occupiedXnext;

			while (gridX < gridXmax) {
				if (occupiedX.indexOf(gridX) == -1) {
					createArtifact(tiles[tiles.length - 1], fill, gridX, gridY);
				}
				gridX++;
			}
		}

		$(this).css({height: (gridY + 1) * 210 + "px"});
	});
}