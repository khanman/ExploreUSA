<%@ Page Language="C#" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>Rss Feed</title>
    <meta charset="utf-8">
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="../../Flat-master/css/flat-ui.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
    <script src="https://www.google.com/jsapi?key=ABQIAAAAUdkcpGUZK7PFxXtmRx_dnBQR4OGDxLSB_AhQYxhmM7udsBN4zRTIJcRdcjfog1-sxQrCX683PrLBiw"
        type="text/javascript"></script>
    <!-- Dynamic Feed Control and Stylesheet -->
    <script src="http://www.google.com/uds/solutions/dynamicfeed/gfdynamicfeedcontrol.js"
        type="text/javascript"></script>
    <style type="text/css">
        @import url("http://www.google.com/uds/solutions/dynamicfeed/gfdynamicfeedcontrol.css");
    </style>

    <script type="text/javascript">
        /*
        *  How to use the Dynamic Feed Control, which has pretty UI already made for you!
        *  Don't forget to check out the options:
        *  http://www.google.com/uds/solutions/dynamicfeed/reference.html
        */

        google.load('feeds', '1');

        function OnLoad() {
            var feeds = [
        {
            title: 'Cricket Magazine',
            url: 'http://www.espncricinfo.com/rss/content/story/feeds/magazine.xml?genre=0;author=0'
        },
        {
            title: 'Live Score',
            url: 'http://www.espncricinfo.com/rss/livescores.xml'
        }
            ];
            var options = {
                stacked: true,
                horizontal: false,
                numResults: 10,
                title: "Cricket News"
            };
            new GFdynamicFeedControl(feeds, 'content', options);
            document.getElementById('content').style.width = "900px";
        }

        google.setOnLoadCallback(OnLoad);
    </script>
</head>
<body style="font-family: Arial, sans-serif; border: 0 none;">
     <div class="pad">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: Dynamic Feed</b></h3>
            <hr />
            <div>
                <div class="well">
                    <p>
                         Google Rss Dynamic Feed:<br>
                         In this experiment I have used Google API to display the Cricket RSS Feed.
                         There is the function which loads the feed which are provided in the XML format.
                         I have provided the 2 RSS Feed which are to be dsiplayed.
                         In this var option I have set the number to results.
                         You can customise it accordingly.
                    </p>
                </div>
            <div id="content">
                <span style="color: red; font-size: 10px; margin: 10px; padding: 4px;">Loading...</span>
            </div>
        </div>
          <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-8/rssfeed-1.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                </p>
            </div>
            <div>
                <p>
                    <b>Reference:</b>
                    <a href="http://www.w3schools.com/rss/rss_channel.asp" target="_blank">w3schools</a>
                </p>
            </div>
    </div>
</body>
</html>
​