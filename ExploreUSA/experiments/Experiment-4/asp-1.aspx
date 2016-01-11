<%@ Page Language="C#" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Asp Basics</title>
    <link type="text/css" rel="stylesheet" href="../../css/bootstrap.css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <h3 style="font-family: 'Comic Sans MS'"><b>Experiment: ASPX BASICS</b></h3>
            <hr>
            <div class="row">
                <div class="col-lg-4">
                    <h4>Generate Dynamic Content-Loop</h4>
                    <br>
                    <p>
                        You can generate dynamic content by embedding source code right in your Web pages. 
                     For instance the ordered list above was created using the following for loop.
                    </p>
                </div>
                <div class="col-lg-4">
                    <h4>Source Code: </h4>
                    <br>
                    &lt;ul&gt;<br>
                    &lt;% for (int i = 0; i &lt;= 10; i++)<br>
                    {%&gt;<br>
                    &lt;li style=&quot;color: red&quot;&gt;CS5610&lt;/li&gt;<br>
                    &lt;% }%&gt;<br>
                    &lt;/ul&gt;<br>
                </div>
                <div class="col-lg-4">
                    <h4>Loop</h4>
                    <ul>
                        <% for (int i = 0; i <= 10; i++)
                           {%>
                        <li style="color: red">CS5610</li>
                        <% }%>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-4">
                    <h4>Generate Dynamic Content-Index</h4>
                    <br>
                    <p>
                        Variables can be embedded in source code using the notation. For instance,
                        the numbers 0 through 10 in the above unordered list were
                        displayed. The variable i is set by a surrounding loop as shown below.
                    </p>
                </div>
                <div class="col-lg-4">
                    <h4>Source Code: </h4>
                    <br>
                   &lt;ul&gt;<br>
                   &lt;% for (int i = 0; i &lt;= 5; i++)<br>
                   {%&gt;<br>
                   &lt;li style=&quot;color: forestgreen&quot;&gt;CS5610 | &lt;%= i %&gt;&lt;/li&gt;<br>
                   &lt;% }%&gt;<br>
                   &lt;/ul&gt;<br>
                </div>

                <div class="col-lg-4">
                    <h4>Index</h4>
                    <ul>
                        <% for (int i = 0; i <= 5; i++)
                           {%>
                        <li style="color: forestgreen">CS5610 | <%= i %></li>
                        <% }%>
                    </ul>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-lg-4">
                    <h4>Generate Dynamic Content-Array</h4>
                    <br>
                    <p>
                        We can declare arrays in pages and then iterate over them
                    </p>
                </div>
                <div class="col-lg-4">
                    <h4>Source Code: </h4>
                    <br>
                    &lt;ol&gt;<br>
                    &lt;%  string[] names = { &quot;MAnu&quot;, &quot;Real&quot;, &quot;Stoke&quot; };<br>
                    for (int i = 0; i &lt; names.Length; i++){<br>
                    %&gt;<br>
                    &lt;li&gt;Team &lt;%= names[ i ] %&gt;&lt;/li&gt;<br>
                    &lt;%  }<br>
                    %&gt;<br>
                    &lt;/ol&gt;<br>
                </div>
                <div class="col-lg-4">
                    <h4>Array</h4>
                    <ol>
                        <%  string[] names = { "MAnu", "Real", "Stoke" };
                            for (int i = 0; i < names.Length; i++)
                            {
                        %>
                        <li>Team <%= names[ i ] %></li>
                        <%  }
                        %>
                    </ol>
                </div>
            </div>
            <hr>
             <div>
            <p>
                <b>View Source: </b>
                <a href="../../fileview/default.aspx?~/experiments/Experiment-4/asp-1.aspx" target="_blank">ASPX Source</a>|
                <a href="../../fileview/default.aspx?~/css/bootstrap.css" target="_blank">CSS Source</a>
            </p>
        </div>
            <br>
            <br>
      </div>
    </form>
</body>
</html>

