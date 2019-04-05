
// colors array
var colorsArray = ['red','maroon','yellow','green','lime','blue','navy','black','white'];
// Add css for all the colors in the toolbar
colorsArray.forEach((color)=>{
	var colorIDstring = '#'+color+'-button';
	$(colorIDstring).css({
		'background':color,
		'width':'50px',
		'height':'50px',
		'transform':'.5s ease',
		'border-color':'black',
		'cursor':'crosshair'
	});
})

var countSubmitPress = 0;
// Total number of pixel art boxes
var numOfBlocks;
// When submit button is clicked
$("#submit-dimensions").click(()=> {
	var rowVal = $(".rows").val();
	var colVal = $(".columns").val();
	var numRow = parseInt(rowVal);
	var numCol = parseInt(colVal);
	numOfBlocks = numCol*numRow;
	var s1="";

	// Handling errors in the input boxes of Rows and Columns
	$('.alert').alert('close')
	if(rowVal=="" && colVal==""){
		$("#rows-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Please fill in the number of rows!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
		$("#columns-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Please fill in the number of columns!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
    				"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
	}
	else if(numRow == 0 || rowVal == ""){
		$("#rows-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Please fill in the number of rows!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
	}
	else if(numCol == 0 || colVal == ""){
		$("#columns-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Please fill in the number of columns!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
	}
	else if(numCol > 18 && numRow > 18){
		$("#rows-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Number of rows should be less than 18!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
		$("#columns-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Number of columns should be less than 18!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
	}
	else if(numCol > 18){
		$("#columns-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Number of columns should be less than 18!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
	}
	else if(numRow > 18){
		$("#rows-form").append(
			"<div class=\"col-auto alert alert-danger alert-dismissible fade show\" role=\"alert\">"+
				"Number of rows should be less than 18!"+
				"<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">"+
					"<span aria-hidden=\"true\">&times;</span>"+
  				"</button>"+
			"</div>"
		)
	} 
	else {
		// Create the Pixel arena
		$("#showgrid").empty();
		for(var i=0; i<numRow;i++ ){
			s1 = s1.concat("<div class=\"row\">");
			for (var j=0; j<numCol;j++){
				s1=s1.concat("<div class=\"column\" id=\"block\" style=\"background-color: white;\" onclick=colorBox(this)></div>");
			}
			s1=s1.concat("</div>");
		}
		$("#showgrid").append(s1);
		s1="";

		// Adding the text - "Your creative arena:"
		if($("#showgrid").children().length > 0 && countSubmitPress == 0){
			$("#pixel-art-box").prepend("<h3><code>Your creative arena:</code></h3>");
			countSubmitPress++;
		}

		// Adding styling for showgrid 
		var grid = document.getElementById("showgrid");
		var valueOfWidth = 50 * numCol;
		grid.style.width = valueOfWidth + "px";

		// Adjusting the footer accordingly 
		if(numOfBlocks>4 && (numCol > 3 || numRow > 3)){
			$("footer").css('position','relative');
		}
	}
})

var color;

$("#red-button").click(() => {
	color = "red";
})

$("#maroon-button").click(() => {
	color = "maroon";
})

$("#yellow-button").click(() => {
	color = "yellow";
})

$("#lime-button").click(() => {
	color = "lime";
})

$("#navy-button").click(() => {
	color = "navy";
})

$("#blue-button").click(() => {
	color = "blue";
})

$("#green-button").click(() => {
	color = "green";
})

$("#black-button").click(() => {
	color = "black";
})

$("#white-button").click(() => {
	color = "white";
})

$("#eraser").click(() => {
	color = "white";
})

$("#color-palette").change(()=> {
	color = $("#color-palette").val();
})

// Adding the color to pixel boxes
var colorBox = (box)=> {
	$(box).css('background-color',color);
}

// Makes the Toolbar draggable
$('#Toolbox').draggable({
	handle: "#Toolbox-header",
	containment: "#pixel-art-box"
});

// To fill the pixel art boxes with custom color
$("#fill-button").click(()=> {
	for(var colorAll = 0; colorAll<numOfBlocks; colorAll++){
		$("#block").css('background-color',color);
	}
})

// Changing the arrows for collapsing Toolbar 
$('#collapseToolbar').on('shown.bs.collapse', () => {      
	var arrow = $("#collapseIcon");
    arrow.removeClass('fa fa-angle-down');
    arrow.addClass('fa fa-angle-up');
}).on('hidden.bs.collapse', () => {
	var arrow = $("#collapseIcon");       
    arrow.removeClass('fa fa-angle-up');
    arrow.addClass('fa fa-angle-down');
});

