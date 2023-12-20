function loadSignUpUser() {
    const loadForm = document.body;
    loadForm.innerHTML = writeForm();

}

function writeForm() {
    console.log("writeForm")

    var str = `
    <div class="login-form-container"">
        
        <form id="loginForm", onsubmit="loadUtilisateur()">
                <div class="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" placeholder="Saisissez votre email" required>
                </div>
                <div class="form-group">
                    <label for="inputPassword">Mot de passe</label>
                    <input type="password" class="form-control" id="inputPassword" placeholder="Saisissez votre mot de passe" required>
                </div>
                <div class="center-button">
                    <button type="submit" class="btn btn-primary mx-auto d-block" id="submitButton">Se Connecter</button>
                    <div class="register-link">
                        <p>Vous n'avez pas de compte? <a href="lien_vers_page_inscription" onclick="formEnregistrer">S'enregistrer</a></p>
                    </div>
                </div>
        </form>
    </div>
   
    `
        ;


    return str;
}

function loadUtilisateur() {
    // Récupérer les valeurs des champs
    const email = document.getElementById('inputEmail').value;
    const motDePasse = document.getElementById('inputPassword').value;
    const loadForm = document.body;
    loadForm.innerHTML = ``;
    // Construire l'URL avec les paramètres
    const url = `http://localhost:3000/gestionBiblio/utilisateurs?email=${email}&motDePasse=${motDePasse}`;

    // Effectuer une requête fetch avec les valeurs des champs
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Accéder aux propriétés de l'objet retourné
            const emailTrouver = data.result.emailTrouver;
            const roleTrouver = data.result.roleTrouver;

            // Afficher les valeurs dans votre page HTML
            loadForm.innerHTML =
                `<div id="identificationUtilisateur">
                <h3>Email: ${emailTrouver}</h3>
                <h3>Rôle: ${roleTrouver}</h3>
                <br></br>
                <div id="optionChoisi"></div>
                <button type="button" class="btn btn-primary" onclick=OptionChargerProfil()>Profil&nbsp;&nbsp;</button>
                <button type="button" class="btn btn-info" onclick=optionChargerLivre()>Livre&nbsp;&nbsp;</button>
                <button type="button" class="btn btn-success" onclick=OptionChargerAuteur()>Auteur&nbsp;&nbsp;</button>
                <div id="developpement"> </div>  
            </div>`;
        })
        .catch(error => console.error('Erreur:', error));
}

//Fonction pour charger un profil dans <div id="developpement">
function OptionChargerProfil() {
    const loadDivUtilisateur = document.getElementById('developpement');
    const loadOptionChoisi = document.getElementById('optionChoisi');
    loadOptionChoisi.innerHTML = `<h3>Profil</h3>`
    loadDivUtilisateur.innerHTML =
        `<form> 
            <br></br>
            <form id="utilisateurForm", onsubmit="formModifierProfil()">
            <div class="form-group">
                <label>Id utilisateur</label>
                <label class="form-control" id="inputIdAuteurLivre" placeholder="Saisissez un id auteur" required>
            </div>
            <br></br>
            <div class="center-button">
                <button type="submit" class="btn btn-warning mx-auto d-block" id="submitModifierButton">Modifier</button>
            </div>
        </form>`
}

//Fonction pour charger un livre dans <div id="developpement">
function optionChargerLivre() {
    const loadDivLivreAuteur = document.getElementById('developpement');
    const loadOptionChoisi = document.getElementById('optionChoisi');
    loadOptionChoisi.innerHTML = `<h3>Livre</h3>`
    loadDivLivreAuteur.innerHTML =
        `   <br></br>
        <div id= "champsLivreAuteur">
        </div>
        <br></br>
        <button type="button" class="btn btn-primary" onclick=optionRechercheLivre()>Rechercher livre</button>
        <button type="button" class="btn btn-success" onclick=formCreerLivre()>Créer livre</button>
        <button type="button" class="btn btn-warning" onclick=formMettreAJLivre()>Mettre à jour livre</button>
        <button type="button" class="btn btn-danger" onclick=formSupprimerLivre()>Supprimer livre</button>`
}

//Fonction pour charger un auteur dans <div id="developpement">
function OptionChargerAuteur() {
    const loadDivLivreAuteur = document.getElementById('developpement');
    const loadOptionChoisi = document.getElementById('optionChoisi');
    loadOptionChoisi.innerHTML = `<h3>Auteur</h3>`
    loadDivLivreAuteur.innerHTML =
        `   <br></br>
        <div id= "champsLivreAuteur">
        </div>
        </div>
        <br></br>
        <button type="button" class="btn btn-primary" onclick=optionRechercheAuteur()>Rechercher auteur</button>
        <button type="button" class="btn btn-success" onclick=formCreerAuteurs()>Créer auteur</button>
        <button type="button" class="btn btn-warning" onclick=formMettreAJAuteur()>Mettre à jour auteur</button>
        <button type="button" class="btn btn-danger" onclick=formSupprimerAuteur()>Supprimer auteur</button>`
}

function optionRechercheLivre() {
    const loadsearchDelete = document.getElementById('champsLivreAuteur')
    loadsearchDelete.innerHTML =
        `         
            <form>
                <div>
                    <label>Id livre</label>
                    <input class="form-control" id="inputSearchLivre" placeholder="Saisissez un id livre" required>
                </div>
                <br></br>
                <div class="center-button">
                    <button type="button" class="btn btn-primary mx-auto d-block" onclick="rechercheLivre()">Recherche</button>
                </div>
            </form>`
}

function optionRechercheAuteur() {
    const loadsearchAuteur = document.getElementById('champsLivreAuteur');
    loadsearchAuteur.innerHTML =
        `         
            <form>
                <div>
                    <label>Id auteur</label>
                    <input class="form-control" id="inputSearchAuteur" placeholder="Saisissez un id auteur" required>
                </div>
                <br>

                <div class="center-button">
                    <button type="button" class="btn btn-primary mx-auto d-block" onclick="rechercheAuteur()">Recherche</button>
                </div>
            </form>`;
}


function rechercheLivre() {
    id = parseInt(document.getElementById('inputSearchLivre').value);
    const loadDiv = document.getElementById('champsLivreAuteur');
    loadDiv.innerHTML = ``;

    // Construire l'URL avec les paramètres
    const url = `http://localhost:3000/gestionBiblio/livres/${id}`;

    // Effectuer une requête fetch avec les valeurs des champs
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Accéder aux propriétés de l'objet retourné
            const titre = data.result.titre;
            const auteurId = data.result.auteurId;
            const annee = data.result.annee;
            const genre = data.result.genre;

            // Afficher les valeurs dans votre page HTML
            loadDiv.innerHTML = `
                <div id="detailLivre">
                    <h3>Titre: ${titre}</h3>
                    <h3>Auteur Id: ${auteurId}</h3>
                    <h3>Annee: ${annee}</h3>
                    <h3>Genre: ${genre}</h3>
                    <button type="button" class="btn btn-primary" onclick="updateLivre()">Mettre à jour&nbsp;&nbsp;</button>
                    <button type="button" class="btn btn-secondary" onclick="deleteLivre()">Supprimer&nbsp;&nbsp;</button> 
                </div>
            `;
        });
}


function rechercheAuteur() {

    idLivre = document.getElementById(inputSearchLivre).value
    const loadDiv = document.getElementById('champsLivreAuteur')

    // Construire l'URL avec les paramètres
    const url = `http://localhost:3000/gestionBiblio/livres/`;

    // Effectuer une requête fetch avec les valeurs des champs
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Accéder aux propriétés de l'objet retourné
            const id = data.result.id;
            const nom = data.result.nom;
            const biographie = data.result.biographie;

            // Afficher les valeurs dans votre page HTML
            loadDiv.innerHTML = `
            <div id="detailAuteur">
                <h3>Id: ${id}</h3>
                <h3>Nom: ${nom}</h3>
                <h3>Biographie: ${biographie}</h3>
                <button type="button" class="btn btn-warning" onclick=updateLivre()>Mettre à jour&nbsp;&nbsp;</button>
                <button type="button" class="btn btn-danger" onclick=deleteLivre()>Supprimer&nbsp;&nbsp;</button> 
            </div>
            `;
        })
}

function formCreerLivre() {
    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')
    loadDivLivreAuteur.innerHTML = `
    <form id="createLivreForm">
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" class="form-control" id="inputTitre" placeholder="Saisissez le titre du livre" required>
                </div>
                <div class="form-group">
                    <label>idAuteur</label>
                    <input type="text" class="form-control" id="inputIdAuteur" placeholder="Saisissez id auteur" required>
                </div>
                <div class="form-group">
                    <label>Annee</label>
                    <input type="text" class="form-control" id="inputAnnee" placeholder="Saisissez l'année du livre" required>
                </div>
                <div class="form-group">
                    <label>Genre</label>
                    <input type="text" class="form-control" id="inputGenre" placeholder="Saisissez le genre du livre" required>
                </div>
                <div class="center-button">
                    <button type="button" class="btn btn-success mx-auto d-block" id="submitButton" onclick= "creerLivre()">Créer livre</button>
                </div>
        </form>
    `
}

function formCreerAuteurs() {

    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')
    loadDivLivreAuteur.innerHTML = `
    <form id="createAuteurForm">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" class="form-control" id="inputNomAuteur" placeholder="Saisissez le nom de l'auteur" required>
                </div>
                <div class="form-group">
                    <label>Biographie</label>
                    <input type="text" class="form-control" id="inputBiographie" placeholder="Saisissez la Biographie" required>
                </div>
                <div class="center-button">
                    <button type="button" class="btn btn-primary mx-auto d-block" id="submitCreerAuteur" onclick="creerAuteurs()">Créer auteur</button>
                </div>
    </form>`
}
function creerLivre() {
    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')

    const form = document.getElementById('createLivreForm');
    const titre = document.getElementById('inputTitre').value;
    const auteurId = parseInt(document.getElementById('inputIdAuteur').value);
    const annee = document.getElementById('inputAnnee').value;
    const genre = document.getElementById('inputGenre').value;

    const nouveauLivre = {
        titre: titre,
        auteurId: auteurId,
        annee: annee,
        genre: genre
    };

    fetch('http://localhost:3000/gestionBiblio/livres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Cet en-tête est essentiel pour le contenu JSON
        },
        body: JSON.stringify(nouveauLivre)
    })
        .then(response => response.json())
        .then(data => {
            loadDivLivreAuteur.innerHTML = `<h3>Livre créer avec succés</h3>`
        })
        .catch(error => {
            loadDivLivreAuteur.innerHTML = `<h3>Erreur lors de la création du livre</h3>`;
            console.error('Erreur lors de la requête :', error);
        });
}

function creerAuteurs() {
    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')
    const nom = document.getElementById('inputNomAuteur').value;
    const biographie = document.getElementById('inputBiographie').value;

    const nouveauAuteur = {
        nom: nom,
        biographie: biographie
    };

    fetch('http://localhost:3000/gestionBiblio/auteurs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Cet en-tête est essentiel pour le contenu JSON
        },
        body: JSON.stringify(nouveauAuteur)
    })
        .then(response => response.json())
        .then(data => {
            loadDivLivreAuteur.innerHTML = `<h3>Auteur créer avec succés</h3>`
        })

        .catch(error => {
            loadDivLivreAuteur.innerHTML = `<h3>Erreur lors de la création de l'auteur</h3>`;
            console.error('Erreur lors de la requête :', error);
        });
}

function formMettreAJLivre() {
    const loadsearchMAJ = document.getElementById('champsLivreAuteur')
    loadsearchMAJ.innerHTML =
        `         
            <form id="majLivreForm">
                <div>
                    <label>Id livre</label>
                    <input class="form-control" id="inputSearchLivre" placeholder="Saisissez un id livre" required>
                </div>
                <div class="form-group">
                    <label>Titre</label>
                    <input type="text" class="form-control" id="inputTitre" placeholder="Saisissez le titre du livre" required>
                </div>
                <div class="form-group">
                    <label>idAuteur</label>
                    <input type="text" class="form-control" id="inputAuteurId" placeholder="Saisissez id auteur" required>
                </div>
                <div class="form-group">
                    <label>Annee</label>
                    <input type="text" class="form-control" id="inputAnnee" placeholder="Saisissez l'année du livre" required>
                </div>
                <div class="form-group">
                    <label>Genre</label>
                    <input type="text" class="form-control" id="inputGenre" placeholder="Saisissez le genre du livre" required>
                </div>
                    <button type="button" class="btn btn-primary mx-auto d-block">Recherche</button>
                    <button type="button" class="btn btn-warning mx-auto d-block" onclick="mettreAJLivre()">Mettre à jour livre</button>
            </form>`
}

function mettreAJLivre() {
    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')

    const form = document.getElementById('majLivreForm');
    const titre = document.getElementById('inputTitre').value;
    const auteurId = parseInt(document.getElementById('inputAuteurId').value);
    const annee = document.getElementById('inputAnnee').value;
    const genre = document.getElementById('inputGenre').value;
    const id = parseInt(document.getElementById('inputSearchLivre').value);
    const updateLivre = {
        titre: titre,
        auteurId: auteurId,
        annee: annee,
        genre: genre
    };

    fetch(`http://localhost:3000/gestionBiblio/livres/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateLivre)
    })
        .then(response => response.json())
        .then(data => {
            loadDivLivreAuteur.innerHTML = `<h3>Livre mit à jour avec succés</h3>`
        })

        .catch(error => {
            loadDivLivreAuteur.innerHTML = `<h3>Erreur de mise à jour</h3>`;
            console.error('Erreur lors de la requête :', error);
        });
}



function formMettreAJAuteur() {
    const loadSearchMAJ = document.getElementById('champsLivreAuteur')
    loadSearchMAJ.innerHTML =
    `<form id="majAuteurForm">
        <div>
            <label>Id auteur</label>
            <input class="form-control" id="inputSearchAuteur" placeholder="Saisissez un id auteur" required>
        </div>
   
        <div class="form-group">
            <label>Nom</label>
            <input type="text" class="form-control" id="inputNomMAJ" placeholder="Saisissez le nom de l'auteur" required>
        </div>
        <div class="form-group">
            <label>Biographie</label>
            <input type="text" class="form-control" id="inputBiographieMAJ" placeholder="Saisissez la biographie de l'auteur" required>
        </div>
            <button type="button" class="btn btn-primary mx-auto d-block">Recherche</button>
            <button type="button" class="btn btn-warning mx-auto d-block" onclick="mettreAJAuteur()">Mettre à jour</button>
    </form>
     `
}

function mettreAJAuteur() {
    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')

    const form = document.getElementById('majAuteurForm');
    const id = parseInt(document.getElementById('inputSearchAuteur').value);
    const nom = document.getElementById('inputNomMAJ').value;
    const biographie = document.getElementById('inputBiographieMAJ').value;
    
    const updateAuteur = {
        nom: nom,
        biographie: biographie

    };

    fetch(`http://localhost:3000/gestionBiblio/auteurs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateAuteur)
    })
        .then(response => response.json())
        .then(data => {
            loadDivLivreAuteur.innerHTML = `<h3>Auteur mit à jour avec succés</h3>`
        })

        .catch(error => {
            loadDivLivreAuteur.innerHTML = `<h3>Erreur de mise à jour</h3>`;
            console.error('Erreur lors de la requête :', error);
        });
}

function formSupprimerLivre() {

    const loadsearchDelete = document.getElementById('champsLivreAuteur')
    loadsearchDelete.innerHTML =
        `         
            <form id="deleteLivreForm">
                <div>
                    <label>Id livre</label>
                    <input class="form-control" id="inputSearchLivre" placeholder="Saisissez un id livre" required>
                </div>
                <br></br>
                    <button type="button" class="btn btn-primary mx-auto d-block" >Recherche</button>
                    <button type="button" class="btn btn-danger mx-auto d-block" onclick="supprimerLivre()">supprimer</button>
            </form>`
}

function supprimerLivre() {
    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')
    const id = parseInt(document.getElementById('inputSearchLivre').value);
    const form = document.getElementById('deleteLivreForm');

    fetch(`http://localhost:3000/gestionBiblio/livres/${id}`, {
        method: 'DELETE',		
    })
    .then(response => {
        if(response.ok) {
            loadDivLivreAuteur.innerHTML = `<h3>Livre supprimée</h3>`

        } else {
            throw new Error('Erreur lors de la suppression');
        }
    })
    .catch(error => console.error('Erreur:', error));
}

function formSupprimerAuteur() {
    const loadSearchMAJ = document.getElementById('champsLivreAuteur')
    loadSearchMAJ.innerHTML =
    `<form id="deleteAuteurForm">
        <div>
            <label>Id auteur</label>
            <input class="form-control" id="inputSearchAuteur" placeholder="Saisissez un id auteur" required>
        </div>
        <br></br>
            <button type="button" class="btn btn-primary mx-auto d-block">Recherche</button>
            <button type="button" class="btn btn-danger mx-auto d-block" oclick= "supprimerAuteur()">Supprimer</button>
    `
}

function supprimerAuteur() {
    const loadDivLivreAuteur = document.getElementById('champsLivreAuteur')
    const id = parseInt(document.getElementById('inputSearchAuteur').value);
    const form = document.getElementById('deleteAuteurForm');

    fetch(`http://localhost:3000/gestionBiblio/auteurs/${id}`, {
        method: 'DELETE',		
    })
    .then(response => {
        if(response.ok) {
            loadDivLivreAuteur.innerHTML = `<h3>Auteur supprimée</h3>`
        } else {
            throw new Error('Erreur lors de la suppression');
        }
    })
    .catch(error => console.error('Erreur:', error));
}


/*

function loginForm() {
    const form = document.body;
    const name = document.getElementsByName('name')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;


    const newuser = {
        name: name,
        email: email,
        password: password
    };

    fetch('http://localhost:4000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Cet en-tête est essentiel pour le contenu JSON
            // ... inclure d'autres en-têtes comme l'autorisation si nécessaire
        },
        body: JSON.stringify(newuser)
    })
        .then(response => response.json())
        .then(data => {
            console.log('utilisateur créée:', data);
            //window.location.href = '/accueil.html'; // Rediriger vers accueil.html
            form.style.display = 'none'; // Afficher le formulaire
            loadusers(); // Recharger la liste des utilisateurs
        })
        .catch(error => console.error('Erreur:', error));
}
*/

function formEnregistrer() {
    str = `<div class="login-form-container">
    <form id="loginForm">
        <div class="form-group">
            <label for="inputEmail">Email</label>
            <input type="email" class="form-control" id="inputEmail" placeholder="Saisissez votre email" required>
        </div>
        <div class="form-group">
            <label for="inputPassword">Mot de passe</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="Saisissez votre mot de passe" required>
        </div>
        <div class="form-group">
            <label for="userType">Type d'utilisateur</label>
            <select class="form-control" id="userType" required>
                <option value="admin">Admin</option>
                <option value="utilisateur">Utilisateur</option>
            </select>
        </div>
        <div class="center-button">
            <button type="submit" class="btn btn-primary mx-auto d-block" id="submitButton">Se Connecter</button>
        </div>
    </form>
</div>
`
    return str
}

document.addEventListener('DOMContentLoaded', loadSignUpUser);




