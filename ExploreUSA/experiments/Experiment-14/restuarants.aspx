<%@ Page Language="C#" %>

<!DOCTYPE html>
<html>
<head>
    <title>Yelp API Experiment</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/oauth.js"></script>
    <script type="text/javascript" src="http://oauth.googlecode.com/svn/code/javascript/sha1.js"></script>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="../../Flat-master/css/flat-ui.css">
    <link rel="stylesheet" href="../../css/experiments.css" type="text/css" />
    <script type="text/javascript">
        function sendRequest() {
            var auth = {
                consumerKey: "kGhZlJc5OojzAlu_IdRNWQ",
                consumerSecret: "3yewdZJTlhzRkPHbQRLFCeudlsc",
                accessToken: "fe9AwxBH4Yx-YVO4avpJ0_3H8eHbproo",
                accessTokenSecret: "PVJAtZnTtyf_zW8VzxU0kH4aOq4",
                serviceProvider: {
                    signatureMethod: "HMAC-SHA1"
                }
            };
            var terms = 'food';
            var near = document.getElementById('city').value;;
            var limit = 10;
            var offset = 0;

            var accessor = {
                consumerSecret: auth.consumerSecret,
                tokenSecret: auth.accessTokenSecret
            };

            parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', near]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

            var message = {
                'action': 'http://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);

            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

            $.ajax({
                'url': message.action,
                'data': parameterMap,
                'cache': true,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                'success': function (data, textStats, XMLHttpRequest) {
                    var str = "";
                    for (var i = 0; i < data.businesses.length; i++) {
                        str += '<div class="jsonData"><div class="insideContent"';
                        str += '<b>Name:</b> <span><b>' + data.businesses[i].name + '</b></span> <br />';
                        str += '<b>Rating:</b> <span> <img src=' + data.businesses[i].rating_img_url + ' alt="" /> </span> <br />';
                        str += '<div class="jsonImg"><img class="resImg" src=' + data.businesses[i].image_url + ' alt="" /><br /></div>';
                        var phone = data.businesses[i].phone;
                        if (phone != undefined) {
                            str += '<b>Phone No:</b> <span>' + data.businesses[i].phone + '</span>';
                        }
                        str += '</div></div>';
                    }

                    finalStr = str + '<div class="afterDiv"></div>';
                    $("#jsonContent").append(finalStr);
                }
            });

        }
    </script>
    <style type="text/css">
        #jsonDataPlace {
            width: 98%;
            margin: 0 auto;
        }

        #jsonContent {
            width: 85%;
            margin: 0 auto;
        }

        .insideContent {
            width: 90%;
            margin: 0 auto;
        }

        .jsonData {
            float: left;
            width: 250px;
            height: 250px;
            margin: 10px;
            padding: 5px;
            background: #ececec;
            border: 2px groove #cccccc;
        }

        .jsonImg {
            width: 90%;
            margin: 0 auto;
            text-align: center;
        }

        .resImg {
            width: 150px;
            height: 150px;
            margin: auto;
        }

        .afterDiv {
            clear: left;
        }
    </style>
</head>
<body>
    <form method="post" action="Default.aspx" id="form1" runat="server">
        <div class="pad">
            <h4 style="font-family: 'Comic Sans MS'"><b>Experiment: Web Services</b></h4>
            <hr />
            <div>
                <p>
                    Yelp API:<br>
                    In this experiment, I tried to retrieve the information about different restaurants 
                    in any place from Yelp API.The data type of Yelp API is jsonp. To display multiple results, 
                    I simply went on appending the new restaurant 
                    to the list of restaurants found out so far. The authorization of my keys is done using
                    oAuth, which is an open standard for authorizatoin.  
                </p>
            </div>
            <div class="experiment">
                <h4>Search for Restuarants</h4>
                <div>
                    Enter the city:
                    <input type="text" id="city" size="30" placeholder="Boston" />
                    &nbsp;&nbsp;<input type="button" id="SearchButton" value="Get Restuarants" onclick="sendRequest();" />
                </div>

                <hr />
                <div id="jsonDataPlace">
                    <div id="jsonContent">
                    </div>
                </div>
            </div>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-14/restuarants.aspx" target="_blank">ASPX Source</a>|
                        <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                </p>
            </div>
            <div>
                <p>
                    <b>Reference:</b>
                    <a href="http://www.yelp.com/developers/documentation" target="_blank">YELP</a>
                </p>
            </div>
        </div>
    </form>
</body>
</html>
