using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using System.Xml.Serialization;

namespace edu.neu.ccis.rasala
{
    /// <summary>
    /// Summary description for StateData in the US
    /// </summary>
    public class USStateData
    {
        /// <summary>
        /// Default constructor that creates trivial USStateData.
        /// 
        /// Required to permit XML serialization.
        /// </summary>
        public USStateData()
        {
            Name = "";
            Abbr = "";
            Population = 0;
        }


        /// <summary>
        /// Sets the state properties from the given data
        /// </summary>
        public USStateData
            (string name, string abbr, int population)
        {
            Name = name;
            Abbr = abbr;
            Population = population;
        }


        /// <summary>
        /// Extracts the state data from a string of the form:
        ///     name-abbr-population
        /// </summary>
        public USStateData(string info)
        {
            Name = "";
            Abbr = "";
            Population = 0;

            if (info == null)
                return;

            string[] split = info.Split('-');
            int N = split.Length;

            if (N > 0)
                Name = split[0];

            if (N > 1)
                Abbr = split[1];

            if (N > 2)
            {
                try
                {
                    Population = Convert.ToInt32(split[2]);
                }
                catch (Exception) { }
            }

        }


        private string name;

        private string abbr;

        private int population;


        /// <summary>
        /// Returns the state name
        /// </summary>
        [XmlAttribute]
        public string Name
        {
            get
            {
                return name;
            }

            set
            {
                name = (value == null) ? "" : value;
            }
        }


        /// <summary>
        /// Returns the state two-letter abbreviation
        /// </summary>
        [XmlAttribute]
        public string Abbr
        {
            get
            {
                return abbr;
            }

            set
            {
                abbr = (value == null) ? "" : value;
            }
        }


        /// <summary>
        /// Returns the state population
        /// </summary>
        [XmlAttribute]
        public int Population
        {
            get
            {
                return population;
            }

            set
            {
                population = (value <= 0) ? 0 : value;
            }
        }


        /// <summary>
        /// Returns an image tag for a horizontal bar whose width
        /// is the rounded value of Population / 100000.0
        /// </summary>
        public string PopulationBar
        {
            get
            {
                if (population <= 0)
                    return "";

                // divide population by 100000 to get pixel width
                // of population bar for bar chart
                int w = Convert.ToInt32(Math.Round(population / 100000.0));
                int h = 10;

                return AutoBox.ImgTag(w, h);
            }
        }


        /// <summary>
        /// Returns an image URL for a horizontal bar whose width
        /// is the rounded value of Population / 100000.0
        /// </summary>
        public string PopulationBarURL
        {
            get
            {
                if (population <= 0)
                    return "";

                // divide population by 100000 to get pixel width
                // of population bar for bar chart
                int w = Convert.ToInt32(Math.Round(population / 100000.0));
                int h = 10;

                return AutoBox.ImgURL(w, h);
            }
        }


        /// <summary>
        /// Returns the alt text for a population bar image.
        /// 
        /// Has the form: "Population: " + population.
        /// </summary>
        public string PopulationBarAltText
        {
            get
            {
                return "Population: " + population;
            }
        }

    }
}