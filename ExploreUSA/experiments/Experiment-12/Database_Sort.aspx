<%@ Page Language="C#"%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ASP.NET DataGrid</title>
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
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: DataGrid</b></h3>
            <hr />
            <div>
                <div>
                    <p>
                        ASP: Sort Table<br>
                        <br>
                        This is a database experimented to demonstrate Sort tables 
                        This experiment demonstrates sorting from the database directly from the table.
                        The gridview is displayed from database, Grid View makes use of the SqlDataSource to access the table.
                        and has an "EnableSorting" set to true 
                        By clicking on the column one can sort the record and update it simultanoulsy. 
                        The tables are responisve and change of color of a row when you hover on it.
                    </p>
                    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" DataKeyNames="Id" DataSourceID="SqlDataSource1" EmptyDataText="There are no data records to display." AllowSorting="True" CssClass="table-responsive table-hover table-bordered table-striped">
                        <Columns>
                            <asp:BoundField DataField="Id" HeaderText="Id" ReadOnly="True" SortExpression="Id" />
                            <asp:BoundField DataField="State" HeaderText="State" SortExpression="State" />
                            <asp:BoundField DataField="City" HeaderText="City" SortExpression="City" />
                            <asp:BoundField DataField="ZipCode" HeaderText="ZipCode" SortExpression="ZipCode" />
                        </Columns>
                    </asp:GridView>
                    <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:khan25ConnectionString1 %>" DeleteCommand="DELETE FROM [Table] WHERE [Id] = @Id" InsertCommand="INSERT INTO [Table] ([Id], [State], [City], [ZipCode]) VALUES (@Id, @State, @City, @ZipCode)" ProviderName="<%$ ConnectionStrings:khan25ConnectionString1.ProviderName %>" SelectCommand="SELECT [Id], [State], [City], [ZipCode] FROM [Table]" UpdateCommand="UPDATE [Table] SET [State] = @State, [City] = @City, [ZipCode] = @ZipCode WHERE [Id] = @Id">
                        <DeleteParameters>
                            <asp:Parameter Name="Id" Type="Int32" />
                        </DeleteParameters>
                        <InsertParameters>
                            <asp:Parameter Name="Id" Type="Int32" />
                            <asp:Parameter Name="State" Type="String" />
                            <asp:Parameter Name="City" Type="String" />
                            <asp:Parameter Name="ZipCode" Type="String" />
                        </InsertParameters>
                        <UpdateParameters>
                            <asp:Parameter Name="State" Type="String" />
                            <asp:Parameter Name="City" Type="String" />
                            <asp:Parameter Name="ZipCode" Type="String" />
                            <asp:Parameter Name="Id" Type="Int32" />
                        </UpdateParameters>
                    </asp:SqlDataSource>

                </div>

            </div>
            <hr>
            <div>
                <p>
                    <b>View Source: </b>
                    <a href="../../fileview/default.aspx?~/experiments/Experiment-12/Database_Sort.aspx" target="_blank">ASPX Source</a>|
                    <a href="../../fileview/default.aspx?~/css/experiment_1_style.css" target="_blank">CSS Source</a>
                </p>
            </div>
        </div>
    </form>
</body>
</html>
