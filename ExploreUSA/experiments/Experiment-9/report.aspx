<%@ Page Language="C#" %>
<%@ Import Namespace="edu.neu.ccis.rasala" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Xml" %>
<script runat="server">

    static string validchars = "^[0-9]{5}$";

    static string weatherbug_get_tool =
        "http://net4.ccs.neu.edu/home/rasala/weatherbug/get.aspx";


    protected void Page_Load(object sender, EventArgs e)
    {
        weatherbuglink.HRef = weatherbug_get_tool;

        string zipcode = RequestTools.Query(Request);

        if (StringTools.IsTrivial(zipcode))
        {
            message.Visible = true;
            return;
        }

        bool valid = Regex.IsMatch(zipcode, validchars,
            RegexOptions.IgnoreCase);

        if (!valid)
        {
            message.Visible = true;
            return;
        }

        weatherbuglink.HRef = weatherbug_get_tool + "?" + zipcode;

        Process_Zipcode(zipcode);
    }


    protected void Process_Zipcode(string zipcode)
    {
        content.Visible = true;

        original_zipcode.Text = zipcode;

        string url = weatherbug_get_tool + "?" + zipcode;
        string xml = SimpleProxy.GetResponseContent(url);

        if (StringTools.IsTrivial(xml))
        {
            no_xml_message.Visible = true;
        }
        else
        {
            Process_Xml(xml);
        }
    }


    protected void Process_Xml(string xml)
    {
        xml_ok.Visible = true;

        XmlDocument document = new XmlDocument();
        document.LoadXml(xml);

        XmlNode root = document.ChildNodes[0];
        Echo_Name_ChildCount(root);

        XmlNodeList list = root.ChildNodes;

        if (list.Count == 0)
        {
            return;
        }

        XmlNode node = list[0];
        Echo_Name_ChildCount(node);
        Process_ChannelList(node.ChildNodes);
    }


    protected void Process_ChannelList(XmlNodeList list)
    {
        int count = list.Count;

        bool found = false;
        XmlNode node = null;

        for (int i = 0; i < count; i++)
        {
            if (list[i].Name == "aws:weather")
            {
                found = true;
                node = list[i];
                Echo_Name_ChildCount(node);
                break;
            }
        }

        if (found)
        {
            Process_WeatherList(node.ChildNodes);
        }
    }


    protected void Process_WeatherList(XmlNodeList list)
    {
        int count = list.Count;

        bool found = false;
        XmlNode node = null;

        for (int i = 0; i < count; i++)
        {
            if (list[i].Name == "aws:ob")
            {
                found = true;
                node = list[i];
                Echo_Name_ChildCount(node);
                break;
            }
        }

        if (found)
        {
            Process_WeatherObservationList(node.ChildNodes);
        }
    }


    protected void Process_WeatherObservationList(XmlNodeList list)
    {
        int count = list.Count;

        XmlNode node = null;

        for (int i = 0; i < count; i++)
        {
            node = list[i];

            switch (node.Name)
            {
                case "aws:ob-date":
                    Process_DateList(node.ChildNodes);
                    break;

                case "aws:city-state":
                    Process_CityState(node);
                    break;

                case "aws:temp":
                    Process_NodeWithUnits(node, reported_temp);
                    break;

                case "aws:feels-like":
                    Process_NodeWithUnits(node, reported_feelslike);
                    break;

                case "aws:gust-direction":
                    Process_PlainNode(node, reported_direction);
                    break;

                case "aws:gust-speed":
                    Process_NodeWithUnits(node, reported_speed);
                    break;

                case "aws:humidity":
                    Process_NodeWithUnits(node, reported_humidity);
                    break;

                case "aws:pressure":
                    Process_NodeWithUnits(node, reported_pressure);
                    break;

                default:
                    break;
            }
        }
    }


    protected void Process_DateList
        (XmlNodeList list)
    {
        int count = list.Count;

        XmlNode node = null;

        string year = "";
        string month = "";
        string day = "";
        string hour = "";
        string minute = "";
        string am_pm = "";
        string time_zone = "";

        for (int i = 0; i < count; i++)
        {
            node = list[i];

            switch (node.Name)
            {
                case "aws:year":
                    year = node.Attributes.GetNamedItem("number").Value;
                    break;

                case "aws:month":
                    month = node.Attributes.GetNamedItem("text").Value;
                    break;

                case "aws:day":
                    day = node.Attributes.GetNamedItem("number").Value;
                    break;

                case "aws:hour":
                    hour = node.Attributes.GetNamedItem("number").Value;
                    break;

                case "aws:minute":
                    minute = node.Attributes.GetNamedItem("number").Value;
                    break;

                case "aws:am-pm":
                    am_pm = node.Attributes.GetNamedItem("abbrv").Value;
                    break;

                case "aws:time-zone":
                    time_zone = node.Attributes.GetNamedItem("abbrv").Value;
                    break;

                default:
                    break;
            }
        }

        date_label.Text = month + " "
            + day + " "
            + year + " @ "
            + hour + ":"
            + minute + " "
            + am_pm + " "
            + time_zone;
    }


    protected void Process_CityState(XmlNode node)
    {
        string zipcode = node.Attributes.GetNamedItem("zipcode").Value;
        string citystate = node.InnerText;

        reported_zipcode.Text = zipcode;
        reported_citystate.Text = citystate;
    }


    protected void Process_PlainNode
        (XmlNode node, Label label)
    {
        string val = node.InnerText;

        label.Text = val;
    }


    protected void Process_NodeWithUnits
        (XmlNode node, Label label)
    {
        string units = node.Attributes.GetNamedItem("units").Value;
        string val = node.InnerText;

        label.Text = val + units;
    }


    protected void Echo_Name_ChildCount(XmlNode node)
    {
        xml_messages.Text += node.Name + " [child count: "
            + node.ChildNodes.Count + "]<br />";
    }
    
</script>
<script type="text/javascript">

    function sendValue() {
        var zip = document.getElementById('zipcode').value;
        window.location.href = "?" + zip;
    }
    function sendValue1() {
        var zip1 = document.getElementById('zipcode1').value;
        window.location.href = "?" + zip1;
    }
</script>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Weather Report</title>
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="../../Flat-master/css/flat-ui.css">
    <link rel="stylesheet" href="../../css/experiments.css" type="text/css" />
   
</head>
<body>
    <form id="form1" runat="server">
        <div class="pad">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: Web Services</b></h3>
            <hr />
            <div>
                <p>
                    Weather-Report-Api<br>
                    <br>
                    In this experiment,I have just followed Professor Rasala's WeatherBug Experiment provided in the class.
                    The changes to made instead of writing the ZIP Code in url, it can be also inserted from the text box.  
                </p>
            </div>
            <div id="layout-exp" class="experiment">

                <h6 style="font-family: 'Comic Sans MS'">Weather Bug Experiment </h6>


                <div id="message" runat="server" visible="false">

                    <p class="red">
                        Please pass a 5-digit zipcode as the query parameter to this
experiment.
                    </p>

                    <div class="right-column-content">
                        Enter 5 Digit Zip Code:
                            <input type="text" id="zipcode" name="zipcode" size="30" />
                    </div>
                    <br />
                    <input type="button" id="theForm" value="Get Weather" onclick="sendValue()" />
                </div>


                <div id="content" runat="server" visible="false">

                    <p>
                        Requested Zipcode:
                            <code>
                                <asp:Label ID="original_zipcode" runat="server"></asp:Label></code>
                    </p>

                    <div id="no_xml_message" runat="server" visible="false">

                        <hr />

                        <p class="red">
                            No XML could be loaded for the zipcode
                        </p>

                    </div>

                    <div id="xml_ok" runat="server" visible="false">

                        <p>
                            Reported Zipcode:
                                <code>
                                    <asp:Label ID="reported_zipcode" runat="server"></asp:Label></code>
                            @
                                <asp:Label ID="reported_citystate" runat="server"></asp:Label>
                        </p>

                        <p>
                            Temperature:
                                <code>
                                    <asp:Label ID="reported_temp" runat="server"></asp:Label></code>
                            Feels Like:
                                <code>
                                    <asp:Label ID="reported_feelslike" runat="server"></asp:Label></code>
                        </p>

                        <p>
                            Humidity:
                                <code>
                                    <asp:Label ID="reported_humidity" runat="server"></asp:Label></code>
                        </p>

                        <p>
                            Wind:
                                <code>
                                    <asp:Label ID="reported_direction" runat="server"></asp:Label></code>
                            @
                                <code>
                                    <asp:Label ID="reported_speed" runat="server"></asp:Label></code>
                        </p>

                        <p>
                            Pressure:
                                <code>
                                    <asp:Label ID="reported_pressure" runat="server"></asp:Label></code>
                        </p>

                        <p>
                            Date:
                                <asp:Label ID="date_label" runat="server"></asp:Label>
                        </p>

                        <hr />
                        <div class="right-column-content">
                            Enter 5 Digit Zip Code:
                                <input type="text" id="zipcode1" name="zipcode1" size="30" />
                        </div>
                        <br />
                        <input type="button" id="theForm1" value="Get Weather" onclick="sendValue1()" />
                        <hr />
                        <p class="green">
                            WeatherBug XML loaded
                        </p>

                        <p class="green">
                            <asp:Label ID="xml_messages" runat="server"></asp:Label>
                        </p>

                    </div>
                </div>

                <hr />


                <div>
                    <p>
                        <b>View Source: </b>
                        <a href="../../fileview/default.aspx?~/experiments/Experiment-9/report.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                    </p>
                </div>
                <div>
                    <p>
                        <b>Reference:</b>
                        <a href="http://net4.ccs.neu.edu/home/rasala/Default.aspx" target="_blank">Professor Rasala</a>
                    </p>
                </div>

                <p>
                    Launch
                        <code>
                            <a id="weatherbuglink" href="" target="_blank" runat="server">~/weatherbug/get.aspx
                            </a>
                        </code>
                    with current zipcode (if available)
                </p>


            </div>

        </div>
    </form>
</body>
</html>
