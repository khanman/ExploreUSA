<%@ Page Language="C#" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>USA Today Search Demostration
    </title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="../../css/experiments.css" type="text/css" />
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="../../Flat-master/css/flat-ui.css">
    <link rel="stylesheet" href="../../css/experiments.css" type="text/css" />
    <script type="text/javascript">
        function sendRequest() {
            var keys = document.getElementById('keywrds').value;
            var authKeys = "5xuf8cca6w62a2esa9wyk7kk";
            var uri = "http://api.usatoday.com/open/articles?keyword=" + keys + "&encoding=json&api_key=" + authKeys + "";

            $.ajax({
                url: uri,
                dataType: 'json',
                success: function (results) {
                    var descrip = results.stories;
                    var str = "<div>";
                    for (var i = 0; i < results.stories.length; i++) {
                        str += "<div class='breakingnews'><b>" + results.stories[i].title + "</b><br/>";
                        str += "<p>" + results.stories[i].description + "&nbsp;&nbsp;<a href=" + results.stories[i].link + ">Read More</a></p></div>";

                    }
                    str += "</div>";
                    $('#results').append(str);
                }
            });
        }
    </script>
    <style type="text/css">
        .breakingnews {
            background: #eeeeee;
            margin: 10px;
            padding: 10px;
            width: 90%;
        }
    </style>

</head>
<body class="justify">
    <form method="post" action="Default.aspx" id="form1">
        <div class="aspNetHidden">
            <input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKLTgzMTUzNzcxNWRkMe1v+dm1B11vK+z0iZQVi7ecs0BQpwbqExtbuNAxTds=" />
        </div>
        <style type='text/css'>
            .fileview_pretag {
                color: #00f;
                font-weight: bold;
                font-family: 'Consolas', 'Lucida Console', 'Courier New', 'Andale Mono', monospace;
            }

                .fileview_pretag a {
                    color: #08f;
                    text-decoration: none;
                }

                    .fileview_pretag a:visited {
                        color: #88f;
                    }

                    .fileview_pretag a:hover {
                        color: #f00;
                    }
        </style>
        <div class="pad">
            <h4 style="font-family: 'Comic Sans MS'"><b>Experiment: Web Services</b></h4>
            <hr />
            <div class="well">
                <p>
                    UStoday.com-Api<br>
                    <br>
                    In this experiment, I tried to retrieve the information by setting searching parameters.
                    The data type of is jsonp. Here by entering any keyword the recent news can be searched.  
                </p>
            </div>
            <div class="experiment">
                <h4>News Search</h4>
                <div>
                    Enter keyword:
                    <input type="text" id="keywrds" size="30" placeholder="Eg:sports"/>
                    &nbsp;&nbsp;<input type="button" id="SearchButton" value="Get News" onclick="sendRequest();" />
                </div>

                <hr />
                <div id="jsonDataPlace">
                    <div id="results">
                    </div>
                </div>
            </div>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-13/news.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                </p>
            </div>
        </div>
    </form>

</body>
</html>
