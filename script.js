window.addEventListener("load", function() {
	var btn = document.getElementsByName("submit")[0];
	btn.addEventListener("click", function() {
		var url = document.getElementById("source").value.substring(7);
		var fullUrl = "http://dsi-liris-silex.univ-lyon1.fr/intro-js/corsproxy/" + url;
		console.log(fullUrl);

		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				if (req.status === 200) {
					var podcast = req.responseXML;
					afficher(podcast);
				} else {
					handleError(req);
				}
			}
		};
		req.open("GET", fullUrl , true);
		req.send();

	}); // Submit Url
});

function afficher(podcast) {
	var div = document.getElementById("content");
	div.textContent = podcast.getElementsByTagName("title")[0].textContent;
}

function handleError(req) {
	console.log("Erreur " + req.status + ":" + req.statusText);
}