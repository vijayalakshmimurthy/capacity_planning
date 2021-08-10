/**
 * Chart Options Constants
 */
/** BarChartOptions property */
export const BarChartOptions = {
    legend: { display: false },
    plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
            color: '#36A2EB',
            font: {
                weight: 'bold',
                size: 0,
            }
        }
    },
    tooltips: {
        enabled: true
    },
    hover: {
        animationDuration: 1
    },
    scales: {
        yAxes: [{
            ticks: {
                // stepSize: 4,
                beginAtZero: true
            }
        }],
        xAxes: [{
            barPercentage: 0.4
        }]
    },
    title: {
        display: true,
        text: 'Shortfall Category',
        position: 'left'
    },
    layout: {
        padding: {
            left: 0,
            right: 10,
            top: 20,
            bottom: 0
        }
    }
};
