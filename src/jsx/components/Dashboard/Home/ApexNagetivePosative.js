import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexNagetivePosative extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
		  render: false,
         series: [
            {
               name: "New Clients",
               data: [70, 20, 75, 20, 50, 40, 65, 15, 40, 55, 60, 20, 75, 40],
            },
            {
               name: "Retained Clients",
               data: [-60, -10, -50, -25, -30, -65, -22, -10, -50, -20, -70, -35, -60, -20],
            },
         ],
         options: {
            chart: {
               type: "bar",
               height: 320,
               stacked: true,
               toolbar: {
                  show: false,
               },
               sparkline: {
                  //enabled: true
               },
               backgroundBarRadius: 5,
               offsetX: 0,
            },
            plotOptions: {
               bar: {
                  columnWidth: "30%",
                  endingShape: "rounded",
                 colors: {
						backgroundBarColors: ['#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4', '#F4F4F4'],
						backgroundBarOpacity: 1,
						backgroundBarRadius: 5,
						opacity:0
					},
               },
               distributed: true,
            },
           colors:['#2953E8', '#09268A'],

            grid: {
               show: true,
            },
            legend: {
               show: false,
            },
            fill: {
               opacity: 1,
            },
            dataLabels: {
               enabled: false,
               colors:['#2953E8', '#09268A'],
               dropShadow: {
                  enabled: true,
                  top: 1,
                  left: 1,
                  blur: 1,
                  opacity: 1,
               },
            },
            xaxis: {
              categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
               labels: {
                  style: {
                     colors: "#787878",
                     fontSize: "13px",
                     fontFamily: "Poppins",
                     fontWeight: 400,
                  },
               },
               crosshairs: {
                  show: false,
               },
               axisBorder: {
                  show: false,
               },
            },

            yaxis: {
               //show: false
               labels: {
				   offsetX:-15,
                  style: {
                     colors: "#787878",
                     fontSize: "13px",
                     fontFamily: "Poppins",
                     fontWeight: 400,
                  },
               },
            },

            tooltip: {
               x: {
                  show: true,
               },
            },
         },
      };
   }
	
	componentDidMount() {
	  setTimeout(function() { //Start the timer
		  this.setState({render: true}) //After 1 second, set render to true
	  }.bind(this), 1000)
	}	
		
	render() {
		let renderContainer = false;
		if(this.state.render) {
			renderContainer = <div id="chart">
				<ReactApexChart  options={this.state.options}  series={this.state.series}   type="bar"	 height={320}	/>
			 </div>;
		}
			
        return (
				
			renderContainer //Render the dom elements, or, when this.state == false, nothing.
		);
	}
}

export default ApexNagetivePosative;
