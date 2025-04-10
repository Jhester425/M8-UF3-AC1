<?php
 $db = mysqli_connect('mysql', 'root', 'root') or
        die ('Unable to connect. Check your connection parameters.');
        mysqli_select_db($db, 'crud' ) or die(mysqli_error($db));
?>