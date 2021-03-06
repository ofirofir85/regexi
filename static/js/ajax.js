function reset_results(){
	document.getElementById('result_text').innerHTML = ''
	document.getElementById('result_summary').innerHTML = ''
	document.getElementById('result_summary').style.visibility = 'hidden'
	document.getElementById('result_text').style.visibility = 'hidden'
}

function check_regex(api_url){
	reset_results()
	var pattern = document.getElementById('pattern');
	var text = document.getElementById('text_area');
	if (pattern.value != '' && text.value != ''){ //only when both fields are filled
		console.log('sending request pattern: ' + pattern.value + ' text: ' + text.value);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){ //when a valid response arrived
				console.log('recived response!')
				on_response(this.responseText) 
			}
		}
		xhttp.open('POST', api_url, true); //init the requests
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //lets flask read the posted data as submitted form
		var post_string = 'pattern='+pattern.value+'&text=' + text.value; // post data
		xhttp.send(post_string); //send the ajax request
	}
}

function on_response(response){
	response = JSON.parse(response) //raw response given is a text(json formatted), this make it json obj.
	document.getElementById('result_summary').className = 'alert alert-'+response['result_type']
	document.getElementById('result_summary').style.visibility = 'visible'
	document.getElementById('result_summary').innerHTML = response['result_summary']
	document.getElementById('result_text').style.visibility = 'visible'
	document.getElementById('result_text').innerHTML = response['result_html']
}
console.log('imported')