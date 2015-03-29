

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
		if (podcast.getElementsByTagName("image")[0] !== undefined){
			var image = podcast.getElementsByTagName("image")[0];
			imageNode.src = image.getElementsByTagName("url")[0].textContent;
			imageNode.alt = image.getElementsByTagName("title")[0].textContent;
			//imageNode.link = image.getElementsByTagName("link")[0].textContent;
		}



		console.log("Nombre d'item: " + podcast.getElementsByTagName("item").length);
		var tabItem = podcast.getElementsByTagName("item");
		var listeItem = document.getElementById("listeItem");
		console.log(tabItem.length);
		for (var i=0; i<tabItem.length; i++){  //Pour chaque item
			//Nouvel item
			console.log("ligne 64");
			var newItem = itemNodeVide.cloneNode(true);
			newItem.style.display="inline";
			listeItem.appendChild(newItem);
			console.log(tabItem[i]);
			//Recuperer title, link, description et enclosure et les insérer dans newItem
			newItem.children[0].textContent=tabItem[i].getElementsByTagName("title")[0].textContent;
			newItem.children[1].textContent=tabItem[i].getElementsByTagName("link")[0].textContent;
			newItem.children[2].innerHTML=tabItem[i].getElementsByTagName("description")[0].textContent;
			var button = newItem.children[4];
			button.style.display="inline";
			button.addEventListener("click", createClickEvt(newItem,i));
		}

		//Resolution du probleme de closure à l'intérieur d'une boucle
		function createClickEvt(monItem, indice){
			return function(){clickButton(monItem,indice);}
		}

		function clickButton(monItem, i){
					//Gestion du lecteur en bas à droite de la page
   					var lecteur = document.getElementsByClassName("fixed")[0];
					console.log("Clique ! ");
					console.log("indice = "+i);
					console.log("Valeure de tabItem:" + tabItem[i]);
					var type = tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("type");
					if (tabItem[i]===undefined){console.log("indefini");}
						if (type !== null){
							//Test si audio ou video
							if ((type.split("/")[0])==="audio"){
								console.log("audio");

								
								//Lecteur
								lecteur.children[0].src=tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
								lecteur.children[0].textContent=tabItem[i].getElementsByTagName("enclosure")[0].textContent;
								lecteur.children[0].style.display="block";
								lecteur.children[1].style.display="none";
								lecteur.children[2].style.display="none";


								// monItem.children[3].children[0].src=tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
								// monItem.children[3].children[0].textContent=tabItem[i].getElementsByTagName("enclosure")[0].textContent;
								// monItem.children[3].children[0].style.display="block";
								// monItem.children[3].children[1].style.display="none";
								// monItem.children[3].children[2].style.display="none";
							}
							else if((type.split("/")[0])==="video"){
								console.log("video");
								
								//Lecteur
								lecteur.children[1].src=tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
								lecteur.children[1].textContent=tabItem[i].getElementsByTagName("enclosure")[0].textContent;
								lecteur.children[1].style.display="block";
								lecteur.children[0].style.display="none";
								lecteur.children[2].style.display="none";

								// monItemItem.children[3].children[1].src=tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
								// monItem.children[3].children[1].textContent=tabItem[i].getElementsByTagName("enclosure")[0].textContent;
								// monItem.children[3].children[1].style.display="block";
								// monItem.children[3].children[0].style.display="none";
								// monItem.children[3].children[2].style.display="none";
							}
							else{
								console.log("image");
								
								//Lecteur
								lecteur.children[2].src=tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
								lecteur.children[2].style.display="block";
								lecteur.children[0].style.display="none";
								lecteur.children[1].style.display="none";

								// monItem.children[3].children[2].src=tabItem[i].getElementsByTagName("enclosure")[0].getAttribute("url");
								// monItem.children[3].children[2].style.display="block";
								// monItem.children[3].children[0].style.display="none";
								// monItem.children[3].children[1].style.display="none";
							}
						}
			}
	}
	var div = document.getElementById("content");
	var title = podcast.getElementsByTagName("title")[0].textContent;
	var link = podcast.getElementsByTagName("link")[0].textContent;
	var description = podcast.getElementsByTagName("description")[0].textContent;

	/*var crtTitle = document.createElement("h1");
	crtTitle = crtTitle.appendChild("title");
	div.textContent = crtTitle;*/
}

function handleError(req) {
	console.log("Erreur " + req.status + ":" + req.statusText);
}