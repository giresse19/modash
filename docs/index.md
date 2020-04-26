<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Instagram auth app</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
				integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="./index.css">
</head>
<body>
<div class="container">
	<nav class="navbar navbar-default">
		<div class="container-fluid">			
			<ul class="nav navbar-nav navbar-right">
				<li>
					<form action="/login" class="form-inline">
						<label for="username">username:</label><br>
						<input type="text" id="username" name="username" placeholder="IG username"><br>
						<button type="submit">Submit</button>
						<div>
						<h5>Privacy policy</h5>
						This app is strictly for educational purpose and does not use any 
						information access via the FB API for any harmful purpose.
											
						</div>
					</form>					  					
				</li>
			</ul>
		</div>
	</nav>
</div>
</body>
</html>