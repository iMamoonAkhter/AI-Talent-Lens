import React from 'react';
import ReactApexChart from 'react-apexcharts';

class Radialchart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [75],
            options: {
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
					hollow: {
						margin: 0,
						size: '70%',
						background: '#fff',
						image: undefined,
						imageOffsetX: 0,
						imageOffsetY: 0,
						position: 'front',
					},
					track: {
						  background: '#F8F8F8',
						  strokeWidth: '67%',
						  margin: 0, // margin is in pixels
						},
					 dataLabels: {
						  show: true,
						  value: {
							offsetY:-7,
							color: '#111',
							fontSize: '20px',
							show: true,
						  }
						},	
                },
              },
			  
				labels: [''],
			  fill: {
			  type: 'gradient',
			  gradient: {
				shade: 'dark',
				type: 'horizontal',
				shadeIntensity: 0.1,
				gradientToColors: ['#2953E8'],
				inverseColors: true,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 100]
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
					<ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={300} />
				</div>;
			}	
			return (
				renderContainer //Render the dom elements, or, when this.state == false, nothing.	
			);
		}
	}

export default Radialchart;