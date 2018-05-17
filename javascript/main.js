//MAIN.JS for Qucik and Dirty Behance-based portfolio website


//Preparing the playing field

//Basic full-window canvas setup

//one for foreground
const canvas = document.querySelector('.topCanvas');
canvas.width = window.getComputedStyle(document.body).width.slice(0, -2);
canvas.height = window.getComputedStyle(document.body).height.slice(0, -2);
const c = canvas.getContext('2d');

//one for background
const backCan = document.querySelector('.bottomCanvas');
backCan.width = window.getComputedStyle(document.body).width.slice(0, -2);
backCan.height = window.getComputedStyle(document.body).height.slice(0, -2);
const cBg = backCan.getContext('2d');



//Behance API access setup
const bHkey = "uJDT67uomJ8dd2FpHlCgqBGT7zeCw1TT";
const bHuserID = "VFMADMAX615a";
const bHprojectID = "65597457";
const baseURL = "http://www.behance.net/v2/";

bHurl = baseURL + 'projects/' + bHprojectID + '?api_key=' + bHkey;
profBH = baseURL + 'users/' + bHuserID + '/?api_key=' + bHkey;

let behanceUser = {};
let behanceProject = {};

//Foreground

//Call upon the API data.
//This part ran into all sorts of permission errors. Only $.ajax worked

let imagIndex = 0;



$.ajax({ url: profBH, type: "get", dataType: "jsonp" })
.done(function(result){behanceUser = result; console.log(result); })
.fail((error) => {console.log("Ajax request fails"); console.log(error); })
.then( function() 
{
	$.ajax({ url: bHurl, type: "get", dataType: "jsonp" })
	.done(function(result){behanceProject = result; console.log(result); })
	.fail((error) => {console.log("Ajax request fails"); console.log(error); })

	//Nothing happens until both API JSONs are loaded
	.then (
		function() {
			//Put up user name as the page header - without any header tags
			let bHname = behanceUser.user.first_name + " " + behanceUser.user.last_name;
			
			
			watcher.addEventListener("click",
				function (){
					drawFront();
				});
			
			const drawFront = () => {
				//Wipe the board
				c.clearRect(0,0,canvas.width,canvas.height);

				//Write the name pulled from the API
				//c.globalCompositeOperation = "source-over";
				c.font = "40px Helvetica";
				c.fillStyle = "rgba(255, 255, 255, 1)"
				c.textAlign = "center";
				c.fillText(bHname, canvas.width*0.5 , canvas.height*0.08);

				//Draw the hero image, pulled from the behance API by random index

				let img = new Image;
				
				if (imagIndex === behanceProject.project.modules.length) {imagIndex =0;};
				img.src = behanceProject.project.modules[imagIndex].src;
				let maxWidth = behanceProject.project.modules[imagIndex].dimensions.original.width;
				let maxHeight = behanceProject.project.modules[imagIndex].dimensions.original.height;

				//Set the margins
				let allotWidth = canvas.width*0.85;
				let allotHeight = canvas.height*0.85;

				//Figure out by how much to squeeze the image if necessary
				let scale = 1;

				if (maxHeight > allotHeight || maxWidth > allotWidth) {
					let scaleH = allotHeight / maxHeight;
					let scaleW = allotWidth / maxWidth;
					if (scaleW > scaleH) {scale = scaleH}
						else {scale = scaleW}
							console.log(scale);
					}

				//Scale proportionally and draw in the middle
				maxWidth = scale*maxWidth;
				maxHeight = scale*maxHeight;

				let xPos = canvas.width/2 - maxWidth/2;
				let yPos = canvas.height*0.10;
				img.onload = () => {
					c.drawImage(img, xPos, yPos, maxWidth, maxHeight); };

					imagIndex++;

				}

				drawFront();
		}
	);
});



//Background drawing function

const renderBGrid = () => {
	cBg.globalCompositeOperation = "destination-over";
	
	cBg.clearRect(0,0,canvas.width,canvas.height);

	for (let i = 1; i < 350; i++) {
		cBg.beginPath();
		cBg.moveTo(0,0);
		let x = canvas.width*Math.random();
		let y = canvas.height;
		let o = Math.random();
		o = Math.round(o * 100)/ 100;
		col = "rgba(255, 255, 255, " + o/4 + ")";
		cBg.lineTo(x,y);
		cBg.strokeStyle = col;
		//c.strokeStyle = "rgba(255, 255, 255, 1)";
		cBg.stroke();
	}
	for (let i = 1; i < 50; i++) {
		cBg.beginPath();
		cBg.moveTo(canvas.width,canvas.height);
		let x = canvas.width*Math.random();;
		let o = Math.random();
		o = Math.round(o * 100)/ 100;
		col = "rgba(255, 255, 255, " + o/3 + ")";
		cBg.lineTo(x,0);
		cBg.strokeStyle = col;
		cBg.stroke();
	}
}

renderBGrid();


const watcher = document.getElementById("topside");

watcher.style.top = (canvas.height/2 - 150) + 'px';
watcher.style.left = (canvas.width/2 - 200) + 'px';

watcher.addEventListener("mouseenter",
	function (){
		
		let ranc = "rgba(44, 47, 50, 1)";
		document.body.style.background = ranc;
	});

watcher.addEventListener("mouseleave",
	function (){
		let ranc = "rgba(74, 77, 90, 1)";
		document.body.style.background = ranc;
	});

watcher.addEventListener("mousemove", function(){
	setTimeout(renderBGrid, 1000);
});
