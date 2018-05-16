//MAIN.JS for Qucik and Dirty Behance-based portfolio website


//Preparing the playing field

//Basic full-window canvas setup
const canvas = document.querySelector('canvas');
canvas.width = window.getComputedStyle(document.body).width.slice(0, -2);
canvas.height = window.getComputedStyle(document.body).height.slice(0, -2);
const c = canvas.getContext('2d');

//Behance API access setup
const bHkey = "uJDT67uomJ8dd2FpHlCgqBGT7zeCw1TT";
const bHuserID = "VFMADMAX615a";
const bHprojectID = "65597457";
const baseURL = "http://www.behance.net/v2/";

bHurl = baseURL + 'projects/' + bHprojectID + '?api_key=' + bHkey;
profBH = baseURL + 'users/' + bHuserID + '/?api_key=' + bHkey;
console.log(bHurl);

let behanceUser = {};
let behanceProject = {};

//Foreground

$.ajax({ url: profBH, type: "get", dataType: "jsonp" })
.done(function(result){behanceUser = result; console.log(result); })
.fail((error) => {console.log("Ajax request fails"); console.log(error); })
.then( function() 
{
	$.ajax({ url: bHurl, type: "get", dataType: "jsonp" })
	.done(function(result){behanceProject = result; console.log(result); })
	.fail((error) => {console.log("Ajax request fails"); console.log(error); })
	.then (
		function() {
			//Put up user name as the page header - without any header tags
			let bHname = behanceUser.user.first_name + " " + behanceUser.user.last_name;
			console.log(bHname);
			c.font = "40px Helvetica";
			c.fillStyle = "rgba(255, 255, 255, 1)"
			c.textAlign = "center";
			c.fillText(bHname, canvas.width*0.5 , canvas.height*0.08);

			let img = new Image;
			let imagIndex = Math.floor(Math.random()*behanceProject.project.modules.length);
			console.log(imagIndex);

			img.src = behanceProject.project.modules[imagIndex].src;
			let maxWidth = behanceProject.project.modules[imagIndex].dimensions.original.width;
			let maxHeight = behanceProject.project.modules[imagIndex].dimensions.original.height;

			let allotWidth = canvas.width*0.85;
			let allotHeight = canvas.height*0.85;

			let scale = 1;

			if (maxHeight > allotHeight || maxWidth > allotWidth) {
				let scaleH = allotHeight / maxHeight;
				let scaleW = allotWidth / maxWidth;
				if (scaleW > scaleH) {scale = scaleH}
					else {scale = scaleW}
				console.log(scale);
			}

			maxWidth = scale*maxWidth;
			maxHeight = scale*maxHeight;

			let xPos = canvas.width/2 - maxWidth/2;
			let yPos = canvas.height*0.10;
			img.onload = () => {
			c.drawImage(img, xPos, yPos, maxWidth, maxHeight); };

		}
	);
});



//Background

const renderBGrid = () => {
	for (let i = 1; i < 50; i++) {
		c.beginPath();
		c.moveTo(0,0);
		let x = canvas.width*Math.random();
		let y = canvas.height;
		let o = Math.random();
		o = Math.round(o * 100)/ 100;
		col = "rgba(255, 255, 255, " + o/4 + ")";
		c.lineTo(x,y);
		c.strokeStyle = col;
		//c.strokeStyle = "rgba(255, 255, 255, 1)";
		c.stroke();
	}
	for (let i = 1; i < 50; i++) {
		c.beginPath();
		c.moveTo(canvas.width,canvas.height);
		let x = canvas.width*Math.random();;
		let o = Math.random();
		o = Math.round(o * 100)/ 100;
		col = "rgba(255, 255, 255, " + o/3 + ")";
		c.lineTo(x,0);
		c.strokeStyle = col;
		c.stroke();
	}
}

renderBGrid();

