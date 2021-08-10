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
        }]
    },
    title: {
        display: true,
        text: 'No of Ports',
        position: 'left'
    },
    layout: {
        padding: {
            left: 0,
            right: 10,
            top: 20,
            bottom: 0
        }
    },
    animation: {
        duration: 1,
        // tslint:disable-next-line:object-literal-shorthand
        onComplete: function() {
            const chartInstance = this.chart;
            if (chartInstance) {
                const ctx = chartInstance.ctx;
                ctx.textAlign = 'center';
                ctx.fillStyle = 'rgba(0, 0, 0, 1)';
                ctx.textBaseline = 'bottom';
                const values = [];
                const lablesCount = this.data.labels.length;
                const stackCount = 3;
                const dataSetClone = [...this.data.datasets];
                for (let l = 0; l < lablesCount; l++) {
                    const labelWiseData = [];
                    for (let s = 0; s < stackCount; s++) {
                        const stackItems = dataSetClone.filter((data) => data.stack === s + 1);
                        const overallStackData = stackItems.reduce((acc, cur) => {
                            acc = acc + cur.data[l];
                            return acc;
                        }, 0);
                        labelWiseData.push(overallStackData);
                    }
                    values.push(labelWiseData);
                }
                this.data.datasets.forEach((dataset, i) => {
                    const meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach((bar, index) => {
                        if ((i + 1) % 3 === 0) {
                            ctx.fillText(values[index][0], bar._model.x, bar._model.y - 0);
                            values[index].splice(0, 1);
                        }
                    });
                });
            }
        }
    }
};

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

/** LineChartOptions property */
export const LineChartOptionsForFMR = {
    title: {
        display: true,
        text: 'No of Ports',
        position: 'left'
    },
    elements: {
        line: {
            tension: 0
        }
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
                beginAtZero: false
            }
        }]
    }
};

/** DoughnutChartOptions property */
export const DoughnutChartOptions = {
    animation: false,
    legend: { display: false }
};
/** PiesChartOptions property */
export const PieChartOptions = {
    legend: { display: false },
    animation: false,
    plugins: {
        // Change options for pie chart labels
        datalabels: {
            font: {
                size: 0,
            }
        }
    },
};

