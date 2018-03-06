<?php

$destinataire = 'grandvincent.marion@gmail.com';
$expediteur = 'www.salmodis.fr';
//$copie = 'adresse@fai.com';
//$copie_cachee = 'adresse@fai.com';


$post = (!empty($_POST)) ? true : false;

$nom = stripslashes($_POST['nom']);
$prenom = stripslashes($_POST['prenom']);
$email = stripslashes($_POST['mail']);
$objet = stripslashes($_POST['objet']);
$message = stripslashes($_POST['message']);

if($post){


$objet = 'Vous avez reçu un nouveau message !'; // Objet du message

$headers  = 'MIME-Version: 1.0' . "\n"; // Version MIME
$headers .= 'Reply-To: '.$expediteur."\n"; // Mail de reponse
$headers .= 'From: "www.salmodis.fr"<'.$expediteur.'>'."\n"; // Expediteur
$headers .= 'Delivered-to: '.$destinataire."\n"; // Destinataire
//$headers .= 'Cc: '.$copie."\n"; // Copie Cc
//$headers .= 'Bcc: '.$copie_cachee."\n\n"; // Copie cachée Bcc     


$lemessage = "Bonjour, vous avez reçu un nouveau message envoyé depuis le site internet www.salmodis.fr." ;
$lemessage .= "\n\n";
$lemessage .= "Nom:".$nom." \r\n";
$lemessage .= "Prénom: ".$prenom." \r\n";
$lemessage .= "Email: ".$mail." \r\n";
$lemessage .= "Objet: ".$objet." \r\n";
$lemessage .= "Message: ".$message."\r\n";
$lemessage .= "\n\n";
$lemessage .= "________________________________________________";
$lemessage .= "\n\n";

if(!$error){

$mail = mail($destinataire, $objet, $lemessage, $headers);



if($mail){
    echo 'OK';
}

}


}
?>