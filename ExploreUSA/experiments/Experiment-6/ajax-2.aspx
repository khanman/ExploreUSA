<%@ Page Language="C#"%>

<!DOCTYPE html>
<script runat="server">
    
    protected void UpdateTimer_Tick(object sender, EventArgs e)
    {
        DateStampLabel.Text = DateTime.Now.ToString();
    }
</script>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Ajax Experiment</title>
    <meta charset="utf-8">
    <script src="../../javascript/jquery-1.9.js"></script>
    <script src="../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../css/bootstrap.css">
    <link rel="stylesheet" href="../../css/experiment_1_style.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="pad">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: AJAX</b></h3>
            <hr />
            <div>
                <div>
                    <p>
                        AJAX: Time Control<br>
                        This is an ajax experiment that demonstrates the use of update panel. 
                        When the button is clicked it changes the text in the label without a post back.
                        The asp:UpdatePanel control allows us to wrap markup which we would like to be updated
                        without causing a real postback. 
                        Exchanging data with a server, and updating parts of a web page - without reloading
                        the whole page.
                        <p>
                             It simply updates a timestamp every 5 seconds.
                            Timer controls allow you to do postbacks at certain intervals.
                            It allows for timed partial updates of your page.
                            </p>
                    </p>
                </div>
                <div>
                    <asp:ScriptManager ID="ScriptManager1" runat="server" />
                    <asp:Timer runat="server" ID="UpdateTimer" Interval="5000" OnTick="UpdateTimer_Tick" />
                    <div class="well">
                    <asp:UpdatePanel runat="server" ID="TimedPanel" UpdateMode="Conditional">
                        <Triggers>
                            <asp:AsyncPostBackTrigger ControlID="UpdateTimer" EventName="Tick" />
                        </Triggers>
                        <ContentTemplate>
                            <asp:Label CssClass="btn btn-danger" runat="server" ID="DateStampLabel" />
                        </ContentTemplate>
                    </asp:UpdatePanel>
                        </div>
                </div>
            </div>
            <hr>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-6/ajax-1.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                </p>
            </div>
            <div>
                <p>
                    <b>Reference:</b>
                    <a href="http://ajax.net-tutorials.com/basics/hello-world/" target="_blank">AJAX TUTORIALS</a>
                </p>
            </div>
        </div>
    </form>
</body>
</html>
