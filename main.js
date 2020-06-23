var socket = io();
window.onload = function() {
  load()
}
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyC32lx8OZcoOBeit45ZCbO_dTv_SqjQvfM",
	authDomain: "shopping-48a27.firebaseapp.com",
	databaseURL: "https://shopping-48a27.firebaseio.com",
	projectId: "shopping-48a27",
	storageBucket: "shopping-48a27.appspot.com",
	messagingSenderId: "428354980291",
	appId: "1:428354980291:web:f521b41d008e90eae35576",
	measurementId: "G-1XDXYE4W95"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function load(){
	//reads all of the data and updates the table
	console.log("loading data")
	var database = firebase.database()
	var ref = firebase.database().ref();
	ref.once("value", function(snapshot) {
	   res = snapshot.val();
	   var wf = res["wf"]
	   var is = res["is"]
	   
	   
	   //updating the table with the new data
	   for (var i in wf){
		   for (var food in wf[i]){
			 wadd(i,wf[i][food])  
		   }
	   }
	   for (var i in is){
		   for (var food in is[i]){
			 iadd(i,is[i][food])  
		   }
	   }
	}, function (error) {
	   console.log("Error: " + error.code);
	});
	
	
}
function wadd(t1,t2){
	var table = document.getElementById("wTable")
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell3 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var a = document.createElement("INPUT");
	a.value = t1;
	var c = document.createElement("INPUT");
	c.value = t2;
	var b = document.createElement("BUTTON");
	b.innerText = "Delete Item";
	b.className = "btn btn-danger";
	b.addEventListener("click", function(e) {
		var database = firebase.database()
		var ref = database.ref()
		if ((this.parentNode.parentNode.children[0].children[0].value)){
			var d = this.parentNode.parentNode.children[0].children[0].value.toString()
			ref.child("wf").child(d).remove()
		}
		this.parentNode.parentNode.remove()
	}, false);
	//blur event
	a.id = "a";
	a.addEventListener("blur", function() {
		var t = this.value.toString();
		var database = firebase.database()
		var ref = database.ref().child("wf").child(this.value)
		ref.set({
		  [t]:"1"
		})
	});
	c.addEventListener("blur", function() {
		var t = this.value.toString();
		var d = a.value;
		var database = firebase.database()
		var ref = database.ref().child("wf").child(d)
		var foo = {}
		foo[d] = t
		ref.set(foo)
		
		//console.log(d)
	});
	// Add some text to the new cells:
	cell1.appendChild(a);
	cell2.appendChild(b);
	cell3.appendChild(c);
}
			
function iadd(t1,t2){
	var table = document.getElementById("iTable")
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell3 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var a = document.createElement("INPUT");
	a.id = "a"
	a.value = t1;
	var b = document.createElement("BUTTON");
	var c = document.createElement("INPUT");
	c.value = t2;
	b.innerText = "Delete Item";
	b.className = "btn btn-danger";
	a.addEventListener("blur", function() {
		var t = this.value.toString();
		var database = firebase.database()
		var ref = database.ref().child("is").child(this.value)
		ref.set({
		  [t]:"1"
		})
	});
	c.addEventListener("blur", function() {
		var t = this.value.toString();
		var l = document.getElementById("a");
		var d = a.value;
		var database = firebase.database()
		var ref = database.ref().child("is").child(d)
		var foo = {}
		foo[d] = t
		ref.set(foo)
		
		//console.log(d)
	});
	b.addEventListener("click", function(e) {
		var database = firebase.database()
		var ref = database.ref()
		if ((this.parentNode.parentNode.children[0].children[0].value)){
			var d = this.parentNode.parentNode.children[0].children[0].value.toString()
			ref.child("is").child(d).remove()
		}
		this.parentNode.parentNode.remove()
	}, false);
	// Add some text to the new cells:
	cell1.appendChild(a);
	cell2.appendChild(b);
	cell3.appendChild(c);
}
var database = firebase.database().ref()
database.on('child_changed', function(snapshot){
	socket.emit("update");
	location.reload()
});