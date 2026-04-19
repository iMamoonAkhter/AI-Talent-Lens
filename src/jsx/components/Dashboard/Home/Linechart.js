import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
   defaultFontFamily: "Poppins",
   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
   datasets: [
      {
        label: "Sales Stats",
		backgroundColor: ['rgba(234, 73, 137, 0)'],
		borderColor: '#2953E8',
		pointBackgroundColor: '#2953E8',
		pointBorderColor: '#2953E8',
		borderWidth:6,
		borderRadius:10,
		pointHoverBackgroundColor: '#2953E8',
		pointHoverBorderColor: '#2953E8',
		data: [20, 10, 20, 10, 25, 20, 35, 30],
		tension:0.4,
      },
   ],
};

const options = {
	plugins:{
		legend: {
			display: !1
		},
		title: {
			display: !1
		},
		tooltip: {
			intersect: !1,
			mode: "nearest",
			xPadding: 10,
			yPadding: 10,
			caretPadding: 10
		},
		responsive: !0,
	},
	maintainAspectRatio: !1,
	hover: {
		mode: "index"
	},
   scales: {
      y: {
		display: !1,
		grid: !1,
		scaleLabel: {
			display: !0,
			labelString: "Value"
		},
		ticks: {
			beginAtZero: !0
		}
	}
   },
   elements: {
		point: {
			radius: 0,
			borderWidth: 0
		}
	},
	layout: {
		padding: {
			left: 0,
			right: 0,
			top: 5,
			bottom: 0
		}
	}
};
class Linechart extends Component {
   render() {
      return (
         <>
            <Line data={data} options={options} height={150} />
         </>
      );
   }

   // componentDidMount() {
   //     const { datasets } = this.refs.chart.chartInstance.data
   //     console.log(datasets[0].data);
   // }
}

export default Linechart;
