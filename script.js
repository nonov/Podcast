// Lecteur essentiellement testé avec les flux suivants:
// Audio : http://radiofrance-podcast.net/podcast09/rss_11591.xml
// Video : http://rss.cnn.com/services/podcasting/studentnews/rss.xml
// Image : )

window.addEventListener("load", function() {
	var btn = document.getElementsByName("submit")[0];
	btn.addEventListener("click", function() {
		var url = document.getElementById("source").value.substring(7);
		var fullUrl = "http://dsi-liris-silex.univ-lyon1.fr/intro-js/corsproxy/" + url;

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

//Resolution du probleme de closure à l'intérieur d'une boucle
function createClickEvt(monItem, indice) {
	return function(){clickButton(monItem,indice);}
} // end createClickEvt

function afficher(podcast) {
	// Display panels
	var panels = document.getElementsByClassName("panel")[0];
	panels.style.display = "inline";
	
	var contenu = document.getElementById("Channelcontent");
	var tabChannel = podcast.getElementsByTagName("channel"); //Tableau des channels même si il n'y en à qu'une en général
	
	//Pour chaque chaine
	for (var j = 0; j < tabChannel.length; j++) {
		var titreNode = contenu.children[0];
		var linkNode = contenu.children[2];
		var descriptionNode = contenu.children[3];
		var imageNode = contenu.children[1];
		var itemNode = document.getElementById("item");
		var itemNodeVide = itemNode.cloneNode(true);

		titreNode.textContent = podcast.getElementsByTagName("title")[0].textContent;
		linkNode.children[0].textContent = podcast.getElementsByTagName("link")[0].textContent;
		linkNode.children[0].setAttribute('href', podcast.getElementsByTagName("link")[0].textContent);
		descriptionNode.textContent = podcast.getElementsByTagName("description")[0].textContent;

		//Test si il existe une image
		if (podcast.getElementsByTagName("image")[0] !== undefined){
			var image = podcast.getElementsByTagName("image")[0];
			imageNode.src = image.getElementsByTagName("url")[0].textContent;
			imageNode.alt = image.getElementsByTagName("title")[0].textContent;
			imageNode.width = 200;
			imageNode.height = 200;
		}// end if loop

		tabItem = podcast.getElementsByTagName("item");
		var listeItem = document.getElementById("listeItem");
		
		for (var i = 0; i < tabItem.length; i++) {  //Pour chaque item
			//Nouvel item
			var newItem = itemNodeVide.cloneNode(true);
			newItem.style.display = "inline";
			listeItem.appendChild(newItem);

			//Recupérer title, link, description et enclosure et les insérer dans newItem
			newItem.children[0].textContent = tabItem[i].getElementsByTagName("title")[0].textContent;
			newItem.children[2].children[0].textContent = tabItem[i].getElementsByTagName("link")[0].textContent;
			newItem.children[2].children[0].setAttribute('href', tabItem[i].getElementsByTagName("link")[0].textContent);
			//newItem.children[1].innerHTML = tabItem[i].getElementsByTagName("description")[0].textContent;
			var button = newItem.children[3];
			button.style.display = "inline";
			button.addEventListener("click", createClickEvt(newItem,i));
		} // end for loop
	} //end for loop

	var div = document.getElementById("content");
	var title = podcast.getElementsByTagName("title")[0].textContent;
	var link = podcast.getElementsByTagName("link")[0].textContent;
	var description = podcast.getElementsByTagName("description")[0].textContent;
} // end Afficher function

function handleError(req) {
	console.log("Erreur " + req.status + ":" + req.statusText);
} // end handleError


function clickButton(monItem, i) {
	//Gestion du lecteur en bas à droite de la page
	var lecteur = document.getElementById("enclosure");
	var type = tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("type");
	if (tabItem[i] === undefined) {
		console.log("indefini");
	}
	if (type !== null) {
		//Test si audio ou video
		if ((type.split("/")[0]) === "audio") {

			//Lecteur
			lecteur.children[0].src = tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
			lecteur.children[0].textContent = tabItem[i].getElementsByTagName("enclosure")[0].textContent;
			lecteur.children[0].style.display = "block";
			lecteur.children[1].style.display = "none";
			lecteur.children[2].style.display = "none";
		}
		else if ((type.split("/")[0]) === "video") {
			
			//Lecteur
			lecteur.children[1].src = tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
			lecteur.children[1].textContent = tabItem[i].getElementsByTagName("enclosure")[0].textContent;
			lecteur.children[1].style.display = "block";
			lecteur.children[0].style.display = "none";
			lecteur.children[2].style.display = "none";
			console.log(type);
		}
		else {
			console.log("image");
			
			//Lecteur
			lecteur.children[2].src = tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
			lecteur.children[2].style.display = "block";
			lecteur.children[0].style.display = "none";
			lecteur.children[1].style.display = "none";
		}
	}
} // end clickButton