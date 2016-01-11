<%@ Page Language="C#" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Drag and Drop with HTML 5</title>
    <link rel="stylesheet" type="text/css" href="../../css/dndimg.css" />
    <link rel="stylesheet" type="text/css" href="resources/styles/jquery/cupertino/jquery-ui-1.8.1.custom.css" />
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="../../Flat-master/css/flat-ui.css">
    <script src="http://www.google.com/jsapi?key=ABQIAAAADYbHHQrNWPElNtE4hn2g1hQhn5tTlmnhbGVHENfXgw8ik0kvARSWpfuAdtdt1KqinQpUokxB7SpcsQ"
        type="text/javascript"></script>
    <script type="text/javascript">
        /*Loads jquery and jquery ui on startup*/
        google.load("jquery", "1");
        google.load("jqueryui", "1");
    </script>
    <script type="text/javascript" src="../../javascript/dndimg.js"></script>
</head>
<body>
    <div class="pad">
        <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: Image Drag and Drop</b></h3>
        <hr />
        <div>
            <p>
                Html5 Image Drag and Drop:<br>
                <br>
                This experiment explores the drag and drop and file api
                provided by HTML5. In this example when you drag an image from your computer and
                drop it in the box provided below, an HTML5 drop event is fired, in which the file
                that is dropped is checked whether it is and image file or not. If the file is an
                image then the file is read and displayed in a separate box provided below. 
        </div>
        <br>
        <div class="well">
            <div id="dropbox" class="center" style="margin: auto; width: 500px; height: 100px;">
                <span id="droplabel">Drop file here...</span>
                <div id="progressbar">
                </div>
            </div>
            <br />
            <div class="center" style="margin: auto; width: 500px;">
                <img id="preview" src="" alt="[ preview will display here ]" width:"500px" />
            </div>
        </div>
        <hr>
        <div>
            <p>
                <b>View Source: </b>
                <a href="../../fileview/default.aspx?~/experiments/Experiment-15/image.aspx" target="_blank">ASPX Source</a>|
                <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
            </p>
        </div>
        <div>
                <p>
                    <b>Reference:</b>
                    <a href="http://www.thebuzzmedia.com/html5-drag-and-drop-and-file-api-tutorial/" target="_blank">BuzzMedia</a>
                </p>
            </div>
    </div>
</body>
</html>


