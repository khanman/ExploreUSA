<%@ Page Language="C#"
    MaintainScrollPositionOnPostback="True"
    AutoEventWireup="true" %>

<%@ Import Namespace="edu.neu.ccis.rasala" %>
<%@ Import Namespace="System.Collections" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Xml.Serialization" %>

<script runat="server">

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            // Initialize our sort state information
            // InitSortStates();

            // Set initial visibility
            SetInitialVisibility();

            // Load the widgets that use DataSource directly

            string filename = "~/app_data/statedata.txt";
            string filepath = Server.MapPath(filename);

            USStateList Repeater1List = new USStateList(filepath);
            USStateList GridView1List = new USStateList(filepath);

            Repeater1.DataSource = Repeater1List;

            Repeater1.DataBind();


            // Set desired visibility
            SetDesiredVisibility();

            // Make this call once to create XML file
            // makeXML(list);

            // Make this call once to create SQL file
            // makeSQL(list);
        }
    }


    /// <summary>
    /// Create XML file from the given USStateList
    /// </summary>
    /// <param name="list"></param>
    private void makeXML(USStateList list)
    {
        string xmlname = "~/app_data/statedata3.xml";
        string xmlpath = Server.MapPath(xmlname);

        XmlSerializer serializer =
            new XmlSerializer(typeof(USStateList));

        using (StreamWriter writer = new StreamWriter(xmlpath))
        {
            serializer.Serialize(writer, list);
        }
    }


    private void makeSQL(USStateList list)
    {
        string sqlname = "~/experiments/databaseexp/sql_script/USStateInsert.sql";
        string sqlpath = Server.MapPath(sqlname);

        using (StreamWriter writer = new StreamWriter(sqlpath))
        {
            writer.WriteLine("USE [khan25]");

            foreach (USStateData state in list)
            {
                writer.Write("INSERT US.Data (Abbr, Name, Population) VALUES ('");
                writer.Write(state.Abbr);
                writer.Write("', '");
                writer.Write(state.Name);
                writer.Write("', ");
                writer.Write(state.Population);
                writer.WriteLine(")");
            }
        }
    }


    protected void SetInitialVisibility()
    {
        // Set all visibility to invisible
        Repeater1CheckBox.Checked = false;

        TreeView1CheckBox.Checked = false;

    }


    protected void SetDesiredVisibility()
    {
        Repeater1Panel.Visible = Repeater1CheckBox.Checked;

        TreeView1Panel.Visible = TreeView1CheckBox.Checked;

    }


    protected void SetVisibility_Click(object sender, EventArgs e)
    {
        // Set desired visibility
        SetDesiredVisibility();

    }


    protected string PopBarImgTag(int population)
    {
        int w = population / 100000;
        return AutoBox.ImgTag(w, 10);
    }


    //    protected void InitSortStates()
    //    {
    //        InitSortState("GridView4");
    //        InitSortState("GridView5");
    //    }


    protected void InitSortState(string id)
    {
        ViewState[id + "Sort"] = "Population";
        ViewState[id + "DirectionPopulation"] = "Descending";
        ViewState[id + "DirectionName"] = "Ascending";
        ViewState[id + "DirectionAbbr"] = "Ascending";
    }


    protected void AdjustSortState(string id, string sortfield)
    {
        string sortfieldkey = id + "Sort";
        string directionkey = id + "Direction" + sortfield;

        // Reverse direction if sorting on current field
        // Otherwise just change current field to sortfield
        if (ViewState[sortfieldkey].Equals(sortfield))
        {
            if (ViewState[directionkey].Equals("Ascending"))
                ViewState[directionkey] = "Descending";
            else
                ViewState[directionkey] = "Ascending";
        }
        else
        {
            ViewState[sortfieldkey] = sortfield;
        }
    }


    protected void GridViewAdjustSort
        (string id, GridViewSortEventArgs e)
    {
        string sortfield = e.SortExpression;
        string directionkey = id + "Direction" + sortfield;

        AdjustSortState(id, sortfield);

        if (ViewState[directionkey].Equals("Ascending"))
            e.SortDirection = SortDirection.Ascending;
        else
            e.SortDirection = SortDirection.Descending;
    }


    protected void GridViewOnSorting
        (Object sender, GridViewSortEventArgs e)
    {
        GridView gridview = sender as GridView;
        string id = gridview.ID;

        GridViewAdjustSort(id, e);
    }


    protected void RepeaterOnItemCommand
        (object source, RepeaterCommandEventArgs e)
    {
        Repeater repeater = source as Repeater;
        string id = repeater.ID;

        string command = e.CommandName;

        if (command.Equals("Sort"))
        {
            string sortfield = (string)e.CommandArgument;

            AdjustSortState(id, sortfield);

            LoadRepeaterData(repeater);
        }
    }


    protected void LoadRepeaterData(Repeater repeater)
    {
        USStateList list;

        string id = repeater.ID;
        string sortfieldkey = id + "Sort";
        string sortfield = (string)ViewState[sortfieldkey];

        if (sortfield == null)
        {
            list = USStateDAL.Load();

            repeater.DataSource = list;
            repeater.DataBind();

            return;
        }

        string directionkey = id + "Direction" + sortfield;
        string direction = (string)ViewState[directionkey];

        string constraint = sortfield;

        if (direction.Equals("Descending"))
            constraint += " DESC";

        list = USStateDAL.Load(constraint);

        repeater.DataSource = list;
        repeater.DataBind();
    }



    

</script>


<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <meta name="viewport"
        content="initial-scale=1.0, minimum-scale=1.0" />

    <title>US State Data: SQL/XML</title>
    <script src="../../../javascript/jquery-1.9.js"></script>
    <script src="../../../javascript/jquery-ui.js"></script>
    <link rel="stylesheet" href="../../../css/bootstrap.css">
    <link rel="stylesheet" href="../../../css/experiment_1_style.css">
    <link rel="stylesheet" href="../../../Flat-master/css/flat-ui.css">
    <link rel="stylesheet" href="../../../css/experiments.css" type="text/css" />
    <link rel="shortcut icon" type="image/ico" href="../../wavygon.ico" />

</head>

<body>
    <form id="form1" runat="server">
        <div class="pad">

            <p class="center fs125"><b>US State Data: SQL/XML</b></p>

            <p class="fs110">
                This is an experiment from Professor Rasala's website.
                Here I tried to get a data from a text file and save that data to
                the database and the grab that data and show in two different views.
            </p>
            <hr />
            <asp:ScriptManager ID="MasterScriptManager" runat="server" />

            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                <ContentTemplate>

                    <div class="fs125">
                        <p>
                            Check the views that you wish to see and then click the button
    <i>Show Values</i>.
                        </p>

                        <asp:CheckBox ID="Repeater1CheckBox"
                            Checked="True"
                            runat="server" />
                        Gridview USStateList
    <br />

                        <asp:CheckBox ID="TreeView1CheckBox"
                            Checked="True"
                            runat="server" />
                        TreeView 
    <br />

                        <br />

                        <asp:Button ID="SetVisibility"
                            runat="server"
                            Text="Show Values"
                            OnClick="SetVisibility_Click" CssClass="btn-danger"/>
                    </div>

                    <br />
                    <hr />

                    <div class="fs150">
                        <asp:Label ID="DebugLabel" runat="server" />
                    </div>

                    <asp:Panel runat="server" ID="Repeater1Panel">

                        <h3>Gridview USStateList</h3>

                        <p class="fs150">
                            State data table using a gridview with a USStateList
        data source based on the text file statedata.txt
                        </p>

                        <asp:Repeater
                            ID="Repeater1"
                            runat="server">

                            <HeaderTemplate>
                                <table class="fs125" cellpadding="5">
                                    <tr bgcolor="#C0C0FF">
                                        <td>Name</td>
                                        <td>Abbr</td>
                                        <td>Population</td>
                                        <td>Population Bar</td>
                                    </tr>
                            </HeaderTemplate>

                            <ItemTemplate>
                                <tr bgcolor="#DEB887">
                                    <td><%# Eval("Name") %></td>
                                    <td><%# Eval("Abbr") %></td>
                                    <td class="right"><%# Eval("Population") %></td>
                                    <td><%# Eval("PopulationBar") %></td>
                                </tr>
                            </ItemTemplate>

                            <AlternatingItemTemplate>
                                <tr bgcolor="#FA8072">
                                    <td><%# Eval("Name") %></td>
                                    <td><%# Eval("Abbr") %></td>
                                    <td class="right"><%# Eval("Population") %></td>
                                    <td><%# Eval("PopulationBar") %></td>
                                </tr>
                            </AlternatingItemTemplate>

                            <FooterTemplate>
                                </table>
                            </FooterTemplate>
                        </asp:Repeater>

                        <br />
                        <hr />

                    </asp:Panel>


                    <asp:Panel runat="server" ID="TreeView1Panel">

                        <h3>TreeView</h3>

                        <p class="fs150">
                            State data table using a TreeView
        based on statedata1.xml
                        </p>

                        <asp:TreeView
                            ID="TreeView1"
                            runat="server"
                            DataSourceID="TreeView1XmlDataSource">

                            <DataBindings>

                                <asp:TreeNodeBinding
                                    Depth="0"
                                    DataMember="ArrayOfUSStateData"
                                    Text="US State Information" />

                                <asp:TreeNodeBinding
                                    Depth="1"
                                    DataMember="USStateData"
                                    Text="State" />

                                <asp:TreeNodeBinding
                                    Depth="2"
                                    DataMember="Name"
                                    TextField="#innertext" />

                                <asp:TreeNodeBinding
                                    Depth="2"
                                    DataMember="Abbr"
                                    TextField="#innertext" />

                                <asp:TreeNodeBinding
                                    Depth="2"
                                    DataMember="Population"
                                    TextField="#innertext" />

                            </DataBindings>

                        </asp:TreeView>

                        <asp:XmlDataSource
                            ID="TreeView1XmlDataSource"
                            runat="server"
                            DataFile="~/app_data/statedata1.xml"></asp:XmlDataSource>

                        <br />
                        <hr />

                    </asp:Panel>


                </ContentTemplate>
            </asp:UpdatePanel>

            <p><i>Sources:</i></p>

            <p>
                <rasala:FileView ID="FileView1"
                    TildeFilePath="~/experiments/Experiment-11/us_state/StateData.aspx"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView2"
                    TildeFilePath="~/app_code/USStateData.cs"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView3"
                    TildeFilePath="~/app_code/USStateList.cs"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView4"
                    TildeFilePath="~/app_code/USStateDAL.cs"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView5"
                    TildeFilePath="~/app_data/statedata0.txt"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView6"
                    TildeFilePath="~/app_data/statedata.txt"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView7"
                    TildeFilePath="~/app_data/statedata1.xml"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView8"
                    TildeFilePath="~/app_data/statedata2.xml"
                    runat="server" />
            </p>

            <p>
                <rasala:FileView ID="FileView9"
                    TildeFilePath="~/app_data/statedata3.xml"
                    runat="server" />
            </p>

            <hr />
        </div>
    </form>
</body>
</html>
