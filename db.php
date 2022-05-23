<?php

session_start();

//Database-Verbindung
require "../../database.php";

if (isset($_SESSION["username"])) {

    $speed = htmlentities($_POST["speed"]);
    $accuracy = htmlentities($_POST["accuracy"]);
    $difficulty = htmlentities($_POST["difficulty"]);
    $username = htmlentities($_SESSION["username"]);
    $userID = htmlentities($_SESSION["id"]);

    $sql = "INSERT INTO typingtest (userID, username, difficulty, speed, accuracy)
    VALUES (?, ?, ?, ?, ?);";
    $stmt = $db->prepare($sql);
    $stmt->execute([$userID, $username, $difficulty, $speed, $accuracy]);
}

$sql = "SELECT * FROM typingtest WHERE difficulty = 'easy' ORDER BY speed DESC";
$stmt = $db->query($sql);
$easy = $stmt->fetchAll();

$sql = "SELECT * FROM typingtest WHERE difficulty = 'intermediate' ORDER BY speed DESC";
$stmt = $db->query($sql);
$intermediate = $stmt->fetchAll();

$sql = "SELECT * FROM typingtest WHERE difficulty = 'hard' ORDER BY speed DESC";
$stmt = $db->query($sql);
$hard = $stmt->fetchAll();

echo "<div id='result'>";

echo "<p>TOP 10 Hard:</p>";
$count = 0;
$arr = [];
for ($i = 0; $i < count($hard); $i++) {
    if (isset($hard[$i])) {
        if (!($count < 10)) {
            break;
        }
        if (!(in_array($hard[$i]["username"], $arr)) && $hard[$i]["userID"] != 0) {
            array_push($arr, $hard[$i]["username"]);
            $count++;
            echo substr($hard[$i]["username"], 0, 32) . ": " . $hard[$i]["speed"] . " WPM | " . $hard[$i]["accuracy"] . "%" . "<br>";
        }
    }
}

echo "<p>TOP 10 Intermediate:</p>";
$count = 0;
$arr = [];
for ($i = 0; $i < count($intermediate); $i++) {
    if (isset($intermediate[$i])) {
        if (!($count < 10)) {
            break;
        }
        if (!(in_array($intermediate[$i]["username"], $arr)) && $intermediate[$i]["userID"] != 0) {
            array_push($arr, $intermediate[$i]["username"]);
            $count++;
            echo substr($intermediate[$i]["username"], 0, 32) . ": " . $intermediate[$i]["speed"] . " WPM | " . $intermediate[$i]["accuracy"] . "%" . "<br>";
        }
    }
}

echo "<p>TOP 10 Easy:</p>";
$count = 0;
$arr = [];
for ($i = 0; $i < count($easy); $i++) {
    if (isset($easy[$i])) {
        if (!($count < 10)) {
            break;
        }
        if (!(in_array($easy[$i]["username"], $arr)) && $easy[$i]["userID"] != 0) {
            array_push($arr, $easy[$i]["username"]);
            $count++;
            echo substr($easy[$i]["username"], 0, 32) . ": " . $easy[$i]["speed"] . " WPM | " . $easy[$i]["accuracy"] . "%" . "<br>";
        }
    }
}

echo "</div>";
