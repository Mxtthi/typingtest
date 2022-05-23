<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypingTest</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="onloadScripts.js"></script>
    <script type="text/javascript" src="generateText.js"></script>
    <script type="text/javascript" src="visuals.js"></script>
    <script type="text/javascript" src="wordList.js"></script>
    <script type="text/javascript" src="timer.js"></script>
    <script type="text/javascript" src="stats.js"></script>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <?php

    require "../../database.php";

    session_start();

    if (!isset($_SESSION['auth']) || $_SESSION['auth'] !== true) {
        echo "<script>
    if (confirm('Du bist nicht eingeloggt. Als Gast fortfahren?')) {
        sessionStorage.setItem('loggedIn', false);
      } else {
        window.location.href = '../../login.php';
      }
    </script>";
    } else {
        echo "<script>sessionStorage.setItem('loggedIn', false);;</script>";
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
    echo "<div id='result'>";

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
                    echo $data[$n][$i]["speed"] . " WPM | " . $data[$n][$i]["accuracy"] . "% | " . substr($data[$n][$i]["username"], 0, 32) . "<br>";
                }
            }
        }
        echo "<br>";
    }
    echo "</div>";

    ?>

    <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
        <div id="mainContainer" class="unselectable">
            <button class="collapsible active">General Settings</button>
            <hr>
            <div class="content">
                <div>
                    <span>Difficulty:</span><br>
                    <input checked type="radio" name="difficulty" id="easy" value="easy">
                    <label for="easy">Easy</label><br>
                    <input type="radio" name="difficulty" id="intermediate" value="intermediate">
                    <label for="intermediate">Intermediate</label><br>
                    <input type="radio" name="difficulty" id="hard" value="hard">
                    <label for="hard">Hard</label><br>
                </div>
                <hr>
            </div>

            <button class="collapsible">Advanced Settings</button>
            <hr>
            <div id="collapsibleContent" class="content">
                <div><label for="minWordLength">min. Word-Length:</label><br>
                    <input value="2" type="number" id="minWordLength" min="1">
                </div>
                <div><label for="maxWordLength">max. Word-Length:</label><br>
                    <input value="6" type="number" id="maxWordLength" min="1">
                </div>
                <div><label for="textWordLength">Words:</label><br>
                    <input value="15" type="number" id="textWordLength" min="1">
                </div>
                <div><label for="slider">Font-Size:</label><br>
                    <input id="slider" type="range" min="1" max="100" value="50">
                    <span id="output"></span>
                </div>
                <hr>
            </div>
        </div>
    </div>

    <div id="main" class="unselectable">
        <button id="openButton" class="openbtn" onclick="openNav()">☰</button>
    </div>

    <div id="container" class="unselectable"></div>
    <div id="statsDiv" class="unselectable">
        <p id="speed"></p>
        <hr>
        <p id="accuracy"></p>
    </div>

    <div id="timeDiv" class="unselectable">
        <span class="timerClass" id="lastTry">0:00:00</span>
    </div>

    <body>

    </body>

</html>