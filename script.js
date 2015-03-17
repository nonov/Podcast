

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
<<<<<<< Updated upstream
	var contenu = document.getElementById("Channelcontent");
	var tabChannel = podcast.getElementsByTagName("channel"); //Tableau des channel même si il n'y en à qu'une en général
	console.log("Nombre de channel: " + tabChannel.length);
	//for (var i, chaine; chaine=tabChannel[i];i++) {   //Pour chaque chaine
   	for (var j=0; j<tabChannel.length; j++){
   		console.log("chaine");
   		var titreNode = contenu.children[0];
   		var linkNode = contenu.children[1];
   		var descriptionNode = contenu.children[2];
   		var imageNode = contenu.children[3];
   		var itemNode = document.getElementById("item");
   		var itemNodeVide = itemNode.cloneNode(true);

   		titreNode.textContent = podcast.getElementsByTagName("title")[0].textContent;
   		linkNode.textContent = podcast.getElementsByTagName("link")[0].textContent;
   		descriptionNode.textContent = podcast.getElementsByTagName("description")[0].textContent;
		
		//Test si il existe une image
		if (podcast.getElementsByTagName("image")[0] !== null){
			console.log("Il y a une image");
			var image = podcast.getElementsByTagName("image")[0];
			imageNode.src = image.getElementsByTagName("url")[0].textContent;
			imageNode.title = image.getElementsByTagName("title")[0].textContent;
			imageNode.link = image.getElementsByTagName("link")[0].textContent;
		}



		console.log("Nombre d'item: " + podcast.getElementsByTagName("item").length);
		var tabItem = podcast.getElementsByTagName("item");
		var listeItem = document.getElementById("listeItem");
		for (var i=0; i<tabItem.length; i++){  //Pour chaque item
			//Nouvel item
			var newItem = itemNodeVide.cloneNode(true);
			newItem.style.display="inline";
			listeItem.appendChild(newItem);
			//Recuperer title, link, description et enclosure et les insérer dans newItem
			newItem.children[0].textContent=tabItem[i].getElementsByTagName("title")[0].textContent;
			newItem.children[1].textContent=tabItem[i].getElementsByTagName("link")[0].textContent;
			newItem.children[2].textContent=tabItem[i].getElementsByTagName("description")[0].textContent;
			

		}
	}
=======
	var div = document.getElementById("content");
	var title = podcast.getElementsByTagName("title")[0].textContent;
	var link = podcast.getElementsByTagName("link")[0].textContent;
	var description = podcast.getElementsByTagName("description")[0].textContent;

	var crtTitle = document.createElement("h1");
	crtTitle = crtTitle.appendChild("title");
	div.textContent = crtTitle;
>>>>>>> Stashed changes
}

function handleError(req) {
	console.log("Erreur " + req.status + ":" + req.statusText);
}