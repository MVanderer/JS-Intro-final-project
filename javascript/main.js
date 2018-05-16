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
console.log(bHurl);

let behanceAPI = {};
$.ajax({
	url: bHurl,
	type: "get",
//	  data: {projects: {}},
	dataType: "jsonp"
})
.done(function(result){
		behanceAPI = result;
        console.log(result);
})
.fail((error) => {
	console.log("Ajax request fails")
	console.log(error);
});

//Some Background flourishes
const renderBGrid = () => {
	for (let i = 0; i < 12; i++) {
		let x = 0;
		let y = 0;
		c.beginPath();
		c.moveTo(50,300);
		c.lineTo(300,100);
		c.lineTo(600,200);
		c.strokeStyle = "rgba(255, 255, 255, 1)";
		c.stroke();		
	}
	
}

renderBGrid();