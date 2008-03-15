<?php
    $demo = $_GET['demo'] . ".php";
    $demo = "../" . $demo;
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Language" content="en" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>jQuery UI: Demo Viewer</title>

    <style type="text/css">
        @import "css/demo.css";
    </style>
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script src="../../../../plugins/dimensions/jquery.dimensions.js" type="text/javascript"></script>
<script src="../../../../plugins/corner/jquery.corner.js" type="text/javascript"></script>
<!-- jQuery UI -->
<script src="../../../../ui/ui.mouse.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.draggable.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.draggable.ext.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.droppable.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.droppable.ext.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.resizable.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.resizable.ext.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.sortable.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.sortable.ext.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.tabs.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.tabs.ext.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.dialog.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.slider.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/ui.accordion.js" type="text/javascript" charset="utf-8"></script>
<script src="../../../../ui/datepicker/core/ui.datepicker.js" type="text/javascript" charset="utf-8"></script>

<script src="../js/demo.js" type="text/javascript" charset="utf-8"></script>

<link rel="stylesheet" href="../../../../themes/flora/flora.all.css" type="text/css" media="screen" title="Flora (Default)" />

</head>
<body>
    <div id="sidebar">
        <ul>
            <li class="menutitle">Components</li>
            <li><a href="?demo=ui.accordian" title="Goto Accordian's Component Page">Accordian</a></li>
            <li><a href="?demo=ui.dialog" title="Goto Dialog's Component Page">Dialog</a></li>
            <li><a href="?demo=ui.draggable" title="Goto Draggable's Component Page">Draggable</a></li>
            <li><a href="?demo=ui.droppable" title="Goto Droppable's Component Page">Droppable</a></li>
            <li><a href="?demo=ui.resizable" title="Goto Resizable's Component Page">Resizable</a></li>
            <li><a href="?demo=ui.selectable" title="Goto Selectable's Component Page">Selectable</a></li>
            <li><a href="?demo=ui.sortable" title="Goto Sortable's Component Page">Sortable</a></li>
            <li><a href="?demo=ui.tabs" title="Goto Tabs Component Page">Tabs</a></li>
        </ul>
    </div>
    <div id="main">
        <div id="header">
        	<h1>jQuery UI 1.5 - Demos</h1>
        </div>
        <div id="content">
            <div id="containerDemo">
     		<?php
                if (file_exists($demo)){
                    include($demo);
                }
                else {
                    echo("<p>Welcome to Demo Viewer, an interactive page for looking at and playing with each jQuery UI component.</p>");
                }

            ?>
            </div>
        </div>
    </div>

    <script type="text/javascript">
    	$(function() {

    	});
    </script>
</body>
</html>