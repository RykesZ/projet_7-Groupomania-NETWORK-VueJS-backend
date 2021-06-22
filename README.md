----------------------------------------------------------------- I -----------------------------------------------------------------

-Pour mettre en place la base de données vide et prête à l'emploi :
    1) Se connecter à MySQL avec vos identifiants
    2) Entrer la commande " SOURCE DB_setup/BDD_setup.sql; " pour créer la base de données groupomania et les tables users, publications, et comments
    3) Entrer la commande " SOURCE DB_setup/TRIGGERS_setup.sql; " pour créer les triggers nécessaires au bon fonctionnement de la base de données

-Pour mettre en place la base de données de démonstration :
    1) Se connecter à MySQL avec vos identifiants
    2) Entrer la commande " SOURCE DB_setup/BDD_setup.sql; " pour créer la base de données groupomania et les tables users, publications, et comments
    3) Entrer la commande " SOURCE DB_setup/peuplementBDD_setup.sql; " pour peupler la base de données par des utilisateurs, des publications et des commentaires fictifs
    4) Entrer la commande " SOURCE DB_setup/TRIGGERS_setup.sql; " pour créer les triggers nécessaires au bon fonctionnement de la base de données

---------------------------------------------------------------- II ------------------------------------------------------------------

-Dans le fichier à la racine ".env.example", remplacer la valeur des champs DB_USER et DB_PASS respectivement par vos nom d'utilisateur et mot-de-passe permettant de vous connecter à MySQL, puis renommer le fichier simplement en ".env" : cela permettra au serveur d'agir sur la base de données groupomania sur votre ordinateur.

--------------------------------------------------------------- III -------------------------------------------------------------------

-Dans la base de données de démonstration, il existe 7 utilisateurs fictifs, avec chacun leur adresse email nécessaire à leur connexion sur l'application :
-Barack Opamal (barackopamal@gmail.com)
-Michel Palaref (michelpalaref@gmail.com)
-Johnny Validay (johnnyvaliday@gmail.com)
-Michel Sordou (michelsordou@gmail.com)
-Bernard Tanpie (bernardtanpie@gmail.com)
-Julien Supers (juliensupers@gmail.com)
-Morgan Fraisman (morganfraisman@gmail.com)

-Le compte Barack Opamal possède les droits de modérateur, capable de supprimer/modifier les publications et commentaires de tous les autres utilisateurs.

-Tous ces comptes fictifs ont le même mot-de-passe de connexion à l'application : babar01