/** LineChartOptions property */
export const LineChartOptions = {
    title: {
        display: true,
        text: 'TBPS',
        position: 'left'
    },
    legend: { display: false },
    plugins: {
        datalabels: {
            color: '#36A2EB',
            font: {
                weight: 'bold',
                size: 0,
            }
        }
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};
/** DoughnutChartOptions property */
export const DoughnutChartOptions = {
    animation: false,
    legend: { display: false }
};
