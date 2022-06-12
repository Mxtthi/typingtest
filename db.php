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

$data = [];

$sql = "SELECT * FROM typingtest WHERE difficulty = 'easy' ORDER BY speed DESC";
$stmt = $db->query($sql);
$easy = $stmt->fetchAll();

$sql = "SELECT * FROM typingtest WHERE difficulty = 'intermediate' ORDER BY speed DESC";
$stmt = $db->query($sql);
$intermediate = $stmt->fetchAll();

$sql = "SELECT * FROM typingtest WHERE difficulty = 'hard' ORDER BY speed DESC";
$stmt = $db->query($sql);
$hard = $stmt->fetchAll();

array_push($data, $hard, $intermediate, $easy);
echo '<button class="collapsible">Scoreboard</button>
        <hr>
            <div id="collapsibleContent" class="content">';

for ($n = 0; $n < count($data); $n++) {

    $count = 0;
    $arr = [];

    echo "<p>TOP 10 " . strtoupper($data[$n][0]['difficulty']) . ":</p>";

    for ($i = 0; $i < count($data[$n]); $i++) {
        if (isset($data[$n][$i])) {
            if (!($count < 10)) {
                break;
            }
            if (!(in_array($data[$n][$i]["username"], $arr)) && $data[$n][$i]["userID"] != 0) {
                array_push($arr, $data[$n][$i]["username"]);
                $count++;
                // echo substr($data[$n][$i]["username"], 0, 32) . ": " . $data[$n][$i]["speed"] . " WPM | " . $data[$n][$i]["accuracy"] . "%" . "<br>";
                echo $data[$n][$i]["speed"] . " WPM | " . $data[$n][$i]["accuracy"] . "% | " . substr($data[$n][$i]["username"], 0, 32) . "<br>";
            }
        }
    }
    echo "<br>";
}
echo "</div></div>";
echo "<script>collapsible()</script>";