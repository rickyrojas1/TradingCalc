'use-strict'


let price;
let buyVal;
let sellVal;



function calculate(){


	var a = document.getElementById("buynum1").value;
	var b = document.getElementById("buynum2").value;
	var c = document.getElementById("buynum3").value;
	var d = document.getElementById("buynum4").value;
	var e = document.getElementById("buynum5").value;
	var f = document.getElementById("buynum6").value;
	buyVal = +a + +b + +c + +d + +e + +f;
	console.log(a)

	var g = document.getElementById("sellnum1").value;
	var h = document.getElementById("sellnum2").value;
	var i = document.getElementById("sellnum3").value;
	var j = document.getElementById("sellnum4").value;
	var k = document.getElementById("sellnum5").value;
	var l = document.getElementById("sellnum6").value;
	sellVal = +g + +h + +i + +j + +k + +l;
	console.log(sellVal)


	document.getElementById("buyLabel").innerHTML = "Buy Values (" + buyVal + " BTC)";
	document.getElementById("sellLabel").innerHTML = "Sell Values (" + sellVal + " BTC)";

	getBtcPrice();
	fillStats(buyVal, sellVal);

	
}


function clearBoard(){
	document.getElementById('buynum1').value = "";
	document.getElementById('buynum2').value = "";
	document.getElementById('buynum3').value = "";
	document.getElementById('buynum4').value = "";
	document.getElementById('buynum5').value = "";
	document.getElementById('buynum6').value = "";
	document.getElementById('sellnum1').value = "";
	document.getElementById('sellnum2').value = "";
	document.getElementById('sellnum3').value = "";
	document.getElementById('sellnum4').value = "";
	document.getElementById('sellnum5').value = "";
	document.getElementById('sellnum6').value = "";
	document.getElementById("buyLabel").innerHTML = "Buy Values";
	document.getElementById("sellLabel").innerHTML = "Sell Values";
	document.getElementById('buyVal').innerHTML= "$0";
	document.getElementById('sellVal').innerHTML = "$0";
	document.getElementById('percentGains').style.color = '#000000';
	document.getElementById('percentGains').innerHTML = "$0";
	document.getElementById('gains').style.color = '#000000';
	document.getElementById('gains').innerHTML = "$0";







	
}

function getBtcPrice(){
	fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
	.then(function(res){
		return res.json();
	})
	.then(function(data){

		price = data.bpi.USD.rate_float.toFixed(2);
		let current = price.toLocaleString();
		console.log(current);
		document.getElementById('btcPrice').innerHTML = "$" + current;
		

		

	});
}


function fillStats(buy, sell){
	fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
	.then(function(res){
		return res.json();
	})
	.then(function(data){

		price = data.bpi.USD.rate_float.toFixed(2);
		let buyNum = price*buy;
		let sellNum = price*sell;
		let gainz = sellNum - buyNum;
		document.getElementById('buyVal').innerHTML = "$" + buyNum.toLocaleString();
		document.getElementById('sellVal').innerHTML = "$" + sellNum.toLocaleString();

		if(gainz > 0){
			let positiveGainz = "$"+ gainz.toLocaleString();
			let percent = getPercentageChange(buyNum,sellNum);

			document.getElementById('gains').innerHTML = positiveGainz;
			document.getElementById('gains').style.color = '#5fb760';
			document.getElementById('percentGains').innerHTML = percent;
			document.getElementById('percentGains').style.color = '#5fb760';
			
		}else if(gainz < 0){
			let negativeGainz = "$"+ gainz.toLocaleString();
			let percent = getPercentageChange(sellNum,buyNum);

			document.getElementById('gains').innerHTML = negativeGainz;
			document.getElementById('gains').style.color = '#cc0000';
			document.getElementById('percentGains').innerHTML = "-"+ percent;
			document.getElementById('percentGains').style.color = '#cc0000';
			
		}


	});
}

function getPercentageChange(num1, num2){


	return ((num2 - num1) / num1 * 100 + "%");
	

}





