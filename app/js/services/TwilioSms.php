<?php

  // header("Content-Type: application/json");

  /* Send an SMS using Twilio. You can run this file 3 different ways:
   *
   * - Save it as sendnotifications.php and at the command line, run 
   *        php sendnotifications.php
   *
   * - Upload it to a web host and load mywebhost.com/sendnotifications.php 
   *   in a web browser.
   * - Download a local server like WAMP, MAMP or XAMPP. Point the web root 
   *   directory to the folder containing this file, and load 
   *   localhost:8888/sendnotifications.php in a web browser.
   */

  // Step 1: Download the Twilio-PHP library from twilio.com/docs/libraries, 
  // and move it into the folder containing this file.
  require "../../lib/twilio-php-master/Services/Twilio.php";

  // Step 2: set our AccountSid and AuthToken from www.twilio.com/user/account
  // $AccountSid = "ACc4715f2e78015ea2433eaf781fa172fa"; // test
  // $AuthToken = "d5167df576ba3624de5586e229da5630"; // test
  
  $AccountSid = "ACf49b97b5d7e9734b9bed1eb1735d62ab"; // live
  $AuthToken = "5c829bb9a278367c2987d24eb45cde71"; // live

  $twilioNumber = "604-239-2881";

  // Step 3: instantiate a new Twilio Rest Client
  $client = new Services_Twilio($AccountSid, $AuthToken);

  // Step 4: make an array of people we know, to send them a message. 
  // Feel free to change/add your own phone number and name here.
  /*$people = array(
    "+16046186619" => "Curious Wesley"
    ,
    "+14158675309" => "Curious George",
    "+14158675310" => "Boots",
    "+14158675311" => "Virgil",
  );*/
  if(isset($_GET['numbers'])){
    $numbers = explode(',',$_GET['numbers']);

    // Step 5: Loop over all our friends. $number is a phone number above, and 
    // $name is the name next to it
    // foreach ($people as $number => $name) {
    foreach ($people as $number) {

      $name = 'Generic Name';

      $sms = $client->account->messages->sendMessage(

      // Step 6: Change the 'From' number below to be a valid Twilio number 
      // that you've purchased, or the (deprecated) Sandbox number
        "604-239-2881", 

        // the number we are sending to - Any phone number
        $number,

        // the sms body
        "Hey $name, Monkey Party at 6PM. Bring Bananas!"
      );

      // Display a confirmation message on the screen
      echo json_encode(array("success"=>true, "message"=>"Sent message to $name"));
    }

  }else{
    echo json_encode(array("success"=>true, "message"=>"No numbers were defined."));
  }

  