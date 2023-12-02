<?php
// ini_set("SMTP", "smtp.gmail.com");
// ini_set("smtp_port", 587);

//todos los campos deben existir y no ser nulos o vacios.
if( validarCamposEmail() ){
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "El email proporcionado no es válido.";
    }
    //! necesita https para funcionar
    $enviaPara = 'sofia.vigliaccio@davinci.edu.ar'; 
    $subject   = $_POST['asunto-mail']; 

    $mensaje = '';
    $primero = true;
    foreach($_POST as $indice => $valor){
        if(is_array($valor)){
            $mensaje .= '<strong>'.$indice.': </strong><ul>';
            foreach($valor as $item){
                $mensaje .= '<li>'.$item .'</li>';
            }				
            $mensaje .= '</ul><br>'; 
        }else{
            if($primero){
                $from = $valor;
                $primero = false;
            }
            $mensaje .= '<strong>'.$indice.': </strong>';
            $mensaje .= $valor . '<br>';
            if(strpos($valor, '@')>3 && strpos($valor, '.') > -1){
                $from = $valor;
            }
        }
    }
    $mail_headers  = "MIME-Version: 1.0\r\n";
    $mail_headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $mail_headers .= 'From: ' . $from . "\r\n";

    $result = mail($enviaPara, $subject, $mensaje, $mail_headers);

    if (!$result) {
        $errorMessage = error_get_last()['message'];
        // var_dump($errorMessage);
    }
}else{
    $result=false;
}

header("Location: index.html?enviado=$result");

/**
 * @return bool true si los campos son validos para enviar el mail. False si los campos son invalidos.
 */
function validarCamposEmail():bool
{
    $mail       = $_POST['email'];
    $mensaje    = $_POST['message-mail'];
    $asunto     = $_POST['asunto-mail'];

    $existen = isset($asunto) && !empty($asunto)  
    && isset($mensaje) && !empty($mensaje) 
    && isset($mail) && !empty($mail);

    if($existen){
        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) return false;
        if (!ctype_print($mensaje)) return false;
        if (!ctype_print($asunto)) return false;
    }

    return $existen;
}
?>
