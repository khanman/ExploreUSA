using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using System.Collections.Generic;
using System.IO;

namespace edu.neu.ccis.rasala
{
    /// <summary>
    /// Summary description for USStateList
    /// </summary>
    public class USStateList : List<USStateData>
    {
        /// <summary>
        /// Default constructor that creates an empty USStateList.
        /// 
        /// Required to permit XML serialization.
        /// </summary>
        public USStateList() { }


        /// <summary>
        /// Constructs the state list from the given text file.
        /// 
        /// The file should consists of lines of the form:
        ///   name-abbr-population
        /// 
        /// Expects the file "statedata.txt" in app_data.
        /// </summary>
        public USStateList(string filename)
        {
            List<string> data = FileTools.FileDataAbsolutePath(filename);

            foreach (string s in data)
                this.Add(new USStateData(s));
        }

    }
}