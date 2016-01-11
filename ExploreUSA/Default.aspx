<%@ Page Language="C#" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Mak's Home Page</title>
    <link href="font/stylesheet.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" />
    <link href="css/styles.css" rel="stylesheet" type="text/css" />
    <link href="css/media-queries.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="fancybox/jquery.fancybox-1.34.css" media="screen" />
    <meta name="viewport" content="width=device-width" />
    <link rel="shortcut icon" href="mak.ico" type="image/x-icon">
    <link href='http://fonts.googleapis.com/css?family=Exo:400,800' rel='stylesheet' type='text/css'>
    <style>
        .wrap {
            min-width: 33%;
            padding-right: 2%;
        }

        .clear {
            clear: both;
        }

        .picture {
            max-width: 100%;
        }

        .master_navigation {
            list-style-type: circle;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

            .master_navigation a:link, .master_navigation a:visited {
                display: block;
                color: #000000;
                background-color: #ececec;
                padding: 5px;
                text-decoration: none;
            }

            .master_navigation a:hover, .master_navigation a:active {
                background-color: #cccccc;
            }

        #app-name h1 {
            color: black;
        }
    </style>

</head>
<body data-spy="scroll">
    <!-- TOP MENU NAVIGATION -->
    <div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <a class="brand pull-left" href="https://www.facebook.com/mansoor.khan.14203544" target="_blank">
                    <img src="images/img/fb.png" title="facebook" />
                </a>
                <a class="brand pull-left" href="https://twitter.com/MAK_90" target="_blank">
                    <img src="images/img/twitter.png" title="twitter">
                </a>
                <a class="brand pull-left" href="https://linkedin.com/pub/mansoor-ahmed-khan/75/9a3/699/" target="_blank">
                    <img src="images/img/link.png" title="linkedin">
                </a>
                <a class="brand pull-left" href="https://plus.google.com/u/1/+MansoorKhanmak/posts" target="_blank">
                    <img src="images/img/google.png" title="google">
                </a>
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <div class="nav-collapse collapse">
                    <ul id="nav-list" class="nav pull-right">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#experiment">Experiments</a></li>
                        <li><a href="#project">Project</a></li>
                        <li><a href="#project">Links</a></li>
                        <li><a href="#project">References</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- MAIN CONTENT -->
    <div class="container content container-fluid" id="home">
        <!-- HOME -->
        <div class="row-fluid">
            <div class="floatL wrap span5">
                <div>
                    <img src="images/img/mansoor-khan.jpg" class="picture" />

                </div>
                &nbsp
                    <p style="align-content: center">
                        <strong>M.S. in Computer Science<br>
                            Northeastern University, Boston<br>
                            khan.man@husky.neu.edu<br>
                            (+1)617-412-9057</strong>
                    </p>
            </div>
            <!-- APP DETAILS -->
            <div class="span7">
                <!-- APP NAME -->
                <div id="app-name">
                    <h1>Mansoor Ahmed Khan</h1>
                </div>
                <!-- TAGLINE -->
                <div id="tagline">
                    A Website for CS 5610 Course.
                </div>
                <!-- DESCRIPTION -->
                <div id="description">
                    <p>
                        Hi everyone, I am Mansoor Ahmed Khan, a graduate student studying computer science at Northeastern University.I am very interested in taking up a challenging project and make the best out of this course under the expert guidance of Prof. Rasala & Prof. Jose.
                    </p>
                </div>
                <!-- FEATURES -->
                <p>I intend to learn about the following things during the course:</p>
                <ul id="features">
                    <li>HTML5/CSS3</li>
                    <li>JavaScript, JQuery, Ajax</li>
                    <li>ASP.net, C#</li>
                </ul>
            </div>
        </div>

        <!-- Experiments -->
        <div class="row-fluid" id="experiment">

            <div class="span4 updates" id="experiment2">
                <h2 class="page-title" id="scroll_up">Experiments
				<a href="#home" class="arrow-top">
                    <img src="images/img/arrow-top.png">
                </a>
                </h2>

                <h3 class="version">Experiment 1</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-1/story.txt" target="_blank">HTML/CSS</a></li>
                </ul>
                <hr>

                <h3 class="version">Experiment 2</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-2/story.txt" target="_blank">BootStrap</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 3</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-3/story.txt" target="_blank">jQuery</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 4</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-4/story.txt" target="_blank">Slide Show</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 5</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-5/story.txt" target="_blank">Google Maps</a></li>
                </ul>
                <hr>
            </div>

            <div class="span4 updates" id="experiment1">
                <h2 class="page-title" id="scroll_up">&nbsp;

                </h2>

                <!-- UPDATES & RELEASE NOTES -->

                <h3 class="version">Experiment 6</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-6/story.txt" target="_blank">Ajax/Auto-Complete</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 7</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-7/story.txt" target="_blank">Web Services/File Upload</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 8</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-8/story.txt" target="_blank">Page Loading/Dynamic Feed Control</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 9</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-9/story.txt" target="_blank">Weather Report Api</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 10</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-10/story.txt" target="_blank">Custom Scroll</a></li>
                </ul>
                <hr>
            </div>

            <div class="span4 updates" id="experiment1">
                <h2 class="page-title" id="scroll_up">&nbsp;

                </h2>

                <!-- UPDATES & RELEASE NOTES -->

                <h3 class="version">Experiment 11</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-11/story.txt" target="_blank">Data Retrival</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 12</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-12/story.txt" target="_blank">Data View </a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 13</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-13/story.txt" target="_blank">USToday.Com API</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 14</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-14/story.txt" target="_blank">Restuarants-Yelp API</a></li>
                </ul>
                <hr>
                <h3 class="version">Experiment 15</h3>
                <ul>
                    <li><a href="story/index.htm?../experiments/Experiment-15/story.txt" target="_blank">Image/Web services</a></li>
                </ul>
                <hr>
            </div>

        </div>

        <div class="row-fluid" id="project">
            <div class="span6">
                <h2 class="page-title" id="scroll_up">Project
				<a href="#home" class="arrow-top">
                    <img src="images/img/arrow-top.png">
                </a>
                </h2>
                <p>A project done during the course, implemented all the things I learnt in the course.</p>
                <p>Project best viewed on Chrome browser</p>
                <ul>
                    <li><span class="label new">New</span> <a href="Project/Default.aspx" target="_blank">Explore USA</a></li>
                    <br>
                    <li><span class="label new">New</span> <a href="story/index.htm?../Documentation/story.txt" target="_blank">Project Documentation</a></li>
                </ul>
                <h2 class="page-title" id="scroll_up">References
                    <a href="#home" class="arrow-top">
                        <img src="images/img/arrow-top.png">
                    </a></h2>
                <ul>
                    <li><a href="http://net4.ccs.neu.edu/home/jga/" target="_blank">Professor Jose Annunziato</a></li>
                    <li><a href="http://net4.ccs.neu.edu/home/rasala/" target="_blank">Professor Rasala</a></li>
                    <li><a href="http://net4.ccs.neu.edu/home/rifat/" target="_blank">Rifat Hasan</a></li>
                    <li><a href="http://google.com" target="_blank">Google</a></li>
                    <li><a href="http://jquery.com/" target="_blank">Jquery</a></li>
                </ul>
            </div>
            <div class="span6 updates" id="project">
                <h2 class="page-title" id="scroll_up">Links
				<a href="#home" class="arrow-top">
                    <img src="images/img/arrow-top.png">
                </a>
                </h2>
                <ul class="master_navigation">
                    <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                    <li><a href="statistics/" target="_blank">Statistics</a></li>
                    <li><a href="source/" target="_blank">Source</a></li>
                    <li><a href="search/" target="_blank">Search</a></li>
                    <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                    <li><a href="textview/" target="_blank">TextView</a></li>
                    <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                    <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                    <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                    <li><a href="story/index.htm?../experiments/story.txt" target="_blank">Experiment</a></li>
                    <li><a href="blog/" target="_blank">Blog</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- FOOTER -->
    <div class="footer container container-fluid">
        <!-- COPYRIGHT - -->
        <div id="copyright">
            Copyright &copy; 2014 Mansoor Ahmed khan<br>
            All rights reserved. 
        </div>
    </div>
    <script src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
    <script src="javascript/bootstrap.min.js"></script>
    <script src="javascript/bootstrap-collapse.js"></script>
    <script src="javascript/bootstrap-scrollspy.js"></script>
    <script src="fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
    <script src="fancybox/jquery.fancybox-1.3.4.pack.js"></script>
    <script src="javascript/init.js"></script>
</body>
</html>
