from flask import Flask, render_template, url_for, request, jsonify
import re

app = Flask(__name__)

@app.route('/')
def main():
	return render_template('main.html')

@app.route('/check', methods=['POST'])
def check_regex():
	pattern = request.form['pattern']
	text = request.form['text']
	results = []
	try:
		results = re.findall(pattern, text)
	except re.error as e:
		result_html = ":("
		result_type = 'danger'
		if e.pos != None:
			result_summary = f'Not A Valid Regex Expression!<br />ERROR: {e.msg} At Pos {e.pos}'
		elif e.lineno != None:
			result_summary = f'Not A Valid Test Text!<br />ERROR: {e.msg} At Line {e.lineno} Col {e.colno}'
	else:
		result_html = re.sub(pattern,get_matched_html,text,count=0) #replaces all(count=0) matched parts of a string with the results of the function.
		result_summary = f'Pattern Matched {len(results)} Times In Given Text!' if len(results) > 0 else 'Text Do Not Match Pattern..'
		result_type = 'success' if len(results) > 0 else 'warning'
	finally:
		result_dict = {
			'result_html': result_html,
			'result_summary':result_summary,
			'result_type': result_type
			 }
		return jsonify(result_dict) #returns an http response with the data

def get_matched_html(match_obj):
	return f"<span class='badge badge-warning'>{match_obj[0]}</span>"

if __name__ == '__main__':
	app.run()
