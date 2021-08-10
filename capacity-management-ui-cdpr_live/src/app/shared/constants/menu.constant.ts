import { url } from 'inspector';

export const MenuConstants = {
    menuMapping: {
        PROD_CE_ADMIN: {
            userName: 'Capacity Planning Admin',
            menuOptions: [
                {
                    menuName: 'Dashboard',
                    child: [{ menuName: 'Capacity Dashboard', url: './capacity-dashboard' },
                    { menuName: 'Reservation Dashboard', url: './reservation-dashboard' },
                    { menuName: 'Shortfall Automation Dashboard', url: '/shortfall-automation-dashboard' }
                    ]
                },
                {
                    menuName: 'New Plan',
                    child: [
                        { menuName: 'Card In-fill', url: './chassis-viewer' },
                        { menuName: 'Rack', url: '/capacitybuildplanRack' },
                       // { menuName: 'Card Move', url: 'plancardmove' },
                       // { menuName: 'Device Recovery', url: 'devicerecovery' }
                    ]
                },
                {
                    menuName: 'Report',
                    child: [{ menuName: 'Cable & Rack Capacity Report', url: '/cabling-and-rack-shortfall-capacity-report' },
                    { menuName: 'Capacity Demand Prediction Report', url: '/capacity-summary-report' },
                    { menuName: 'Detailed ADVA Chassis Report', url: '/detailed-adva-chassis-report' },
                    { menuName: 'Detailed Patch Panel Report', url: '/detailed-patch-panel-report' },
                    { menuName: 'Detailed Reservation Report Site', url: '/detail-reservation-report' },
                    // { menuName: 'Detailed Site Report', url: '/detailed-site-report' },
                    {
                        menuName: 'Detailed Site Report',
                        child: [
                            { menuName: 'Edge RT', url: '/detailed-site-reportEdgeRT' },
                            { menuName: 'Core RT', url: '/detailed-site-reportCoreRT' }
                        ]
                    },
                    { menuName: 'Shortfall Automation Detailed Report', url: '/shortfall-automation-detailed-report' }
                    ]
                },
                {
                    menuName: 'Tools',
                    child: [{ menuName: 'Diversity Group Forecast', url: './diversity-report' },
                    ]
                },
                {
                    menuName: 'Visualization',
                    child: [{ menuName: '3D Chassis Viewer', url: './chassis-viewer' },
                    { menuName: '360 Site Viewer', url: '/three60-twod' }
                    ]
                },
                {
                    menuName: 'Capacity Build Plan Status',
                    child: [
                        { menuName: 'Capacity Build Plan - Card', url: '/capacitybuildplan' },
                        { menuName: 'Capacity Build Plan - Cable', url: '/capacitybuildplancable' },
                        { menuName: 'Capacity Build Plan - Rack', url: '/capacitybuildplanRack' }
                    ]
                },
                // {
                //     menuName: 'Track page', url: 'trackpage',
                // },
            ]
        },
        PROD_CE_VIEWER: {
            userName: 'Capacity Planning User',
            menuOptions: [
                {
                    menuName: 'Dashboard',
                    child: [{ menuName: 'Capacity Dashboard', url: './capacity-dashboard' },
                    { menuName: 'Reservation Dashboard', url: './reservation-dashboard' },
                    { menuName: 'Shortfall Automation Dashboard', url: '/shortfall-automation-dashboard' }
                    ]
                },
                {
                    menuName: 'New Plan',
                    child: [
                        { menuName: 'Card In-fill', url: './chassis-viewer' },
                        { menuName: 'Rack', url: '/capacitybuildplanRack' },
                       // { menuName: 'Card Move', url: 'plancardmove' },
                       // { menuName: 'Device Recovery', url: 'devicerecovery' }
                    ]
                },
                {
                    menuName: 'Report',
                    child: [{ menuName: 'Cable & Rack Capacity Report', url: '/cabling-and-rack-shortfall-capacity-report' },
                    { menuName: 'Capacity Demand Prediction Report', url: '/capacity-summary-report' },
                    { menuName: 'Detailed ADVA Chassis Report', url: '/detailed-adva-chassis-report' },
                    { menuName: 'Detailed Patch Panel Report', url: '/detailed-patch-panel-report' },
                    { menuName: 'Detailed Reservation Report Site', url: '/detail-reservation-report' },
                    // { menuName: 'Detailed Site Report', url: '/detailed-site-report' },
                    // { menuName: 'Detailed Site Report New', url: '/detailed-site-report-new' },
                    {
                        menuName: 'Detailed Site Report',
                        child: [
                            { menuName: 'Edge RT', url: '/detailed-site-reportEdgeRT' },
                            { menuName: 'Core RT', url: '/detailed-site-reportCoreRT' }
                        ]
                    },
                    { menuName: 'Shortfall Automation Detailed Report', url: '/shortfall-automation-detailed-report' }
                    ]
                },
                {
                    menuName: 'Tools',
                    child: [{ menuName: 'Diversity Group Forecast', url: './diversity-report' },
                    ]
                },
                {
                    menuName: 'Visualization',
                    child: [{ menuName: '3D Chassis Viewer', url: './chassis-viewer' },
                    { menuName: '360 Site Viewer', url: './three60-twod' }
                    ]
                },
                {
                    menuName: 'Capacity Build Plan Status',
                    child: [
                        { menuName: 'Capacity Build Plan - Card', url: '/capacitybuildplan' },
                        { menuName: 'Capacity Build Plan - Cable', url: '/capacitybuildplancable' },
                        { menuName: 'Capacity Build Plan - Rack', url: '/capacitybuildplanRack' }
                    ]
                },
                // {
                //     menuName: 'Track page', url: 'trackpage',
                // }
            ]
        },
        PROD_CE_DESIGNER: {
            userName: 'Capacity Planning Accounting User',
            menuOptions: [
                {
                    menuName: 'Product Line Forecast',
                    child: [
                        // { menuName: 'Edge RT', url: '/product-line-forecast' },
                        { menuName: 'Edge RT', url: '/product-line-forecastEdgeRT' },
                        { menuName: 'Core RT', url: '/product-line-forecastCoreRT' }
                    ]
                },
                {
                    menuName: 'Trend and Forecast',
                    child: [
                        { menuName: 'Forecast Management Report', url: '/forecast-management-report' },
                        { menuName: 'Forecast Analysis', url: '/forecast-analysis' }
                    ]
                }
            ]
        },
        PRE_PROD_CP_ADMIN: {
            userName: 'Capacity Planning Admin',
            menuOptions: [
                {
                    menuName: 'Dashboard',
                    child: [{ menuName: 'Capacity Dashboard', url: '/capacity-dashboard' },
                    { menuName: 'Reservation Dashboard', url: '/reservation-dashboard' },
                    { menuName: 'Shortfall Automation Dashboard', url: '/shortfall-automation-dashboard' }
                    ]
                },
                {
                    menuName: 'New Plan',
                    child: [
                        { menuName: 'Card In-fill', url: './chassis-viewer' },
                        { menuName: 'Rack', url: '/capacitybuildplanRack' },
                      //  { menuName: 'Card Move', url: 'plancardmove' },
                      //  { menuName: 'Device Recovery', url: 'devicerecovery' }
                    ]
                },
                {
                    menuName: 'Report',
                    child: [{ menuName: 'Cable & Rack Capacity Report', url: '/cabling-and-rack-shortfall-capacity-report' },
                    { menuName: 'Capacity Demand Prediction Report', url: '/capacity-summary-report' },
                    { menuName: 'Detailed ADVA Chassis Report', url: '/detailed-adva-chassis-report' },
                    { menuName: 'Detailed Patch Panel Report', url: '/detailed-patch-panel-report' },
                    { menuName: 'Detailed Reservation Report Site', url: '/detail-reservation-report' },
                    // { menuName: 'Detailed Site Report', url: '/detailed-site-report' },
                    {
                        menuName: 'Detailed Site Report',
                        child: [
                            { menuName: 'Edge RT', url: '/detailed-site-reportEdgeRT' },
                            { menuName: 'Core RT', url: '/detailed-site-reportCoreRT' }
                        ]
                    },
                    { menuName: 'Shortfall Automation Detailed Report', url: '/shortfall-automation-detailed-report' }
                    ]
                },
                {
                    menuName: 'Tools',
                    child: [{ menuName: 'Diversity Group Forecast', url: './diversity-report' },
                    ]
                },
                {
                    menuName: 'Visualization',
                    child: [{ menuName: '3D Chassis Viewer', url: './chassis-viewer' },
                    { menuName: '360 Site Viewer', url: './three60-twod' }
                    ]
                },
                {
                    menuName: 'Capacity Build Plan Status',
                    child: [
                        { menuName: 'Capacity Build Plan - Card', url: '/capacitybuildplan' },
                        { menuName: 'Capacity Build Plan - Cable', url: '/capacitybuildplancable' },
                        { menuName: 'Capacity Build Plan - Rack', url: '/capacitybuildplanRack' }
                    ]
                },
                // {
                //     menuName: 'Track page', url: 'trackpage',
                // }
            ]
        },
        PRE_PROD_CE_DESIGNER: {
            userName: 'Capacity Planning Accounting User',
            menuOptions: [
                {
                    menuName: 'Product Line Forecast',
                    child: [
                        { menuName: 'Edge RT', url: '/product-line-forecastEdgeRT' },
                        { menuName: 'Core RT', url: '/product-line-forecastCoreRT' }
                    ]
                },
                {
                    menuName: 'Trend and Forecast',
                    child: [
                        { menuName: 'Forecast Management Report', url: '/forecast-management-report' },
                        { menuName: 'Forecast Analysis', url: '/forecast-analysis' }
                    ]
                }
            ]
        },
        PRE_PROD_CP_USER: {
            userName: 'Capacity Planning User',
            menuOptions: [
                {
                    menuName: 'Dashboard',
                    child: [{ menuName: 'Capacity Dashboard', url: './capacity-dashboard' },
                    { menuName: 'Reservation Dashboard', url: './reservation-dashboard' },
                    { menuName: 'Shortfall Automation Dashboard', url: '/shortfall-automation-dashboard' }
                    ]
                },
                {
                    menuName: 'New Plan',
                    child: [
                        { menuName: 'Card In-fill', url: './chassis-viewer' },
                        { menuName: 'Rack', url: '/capacitybuildplanRack' },
                      //  { menuName: 'Card Move', url: 'plancardmove' },
                      //  { menuName: 'Device Recovery', url: 'devicerecovery' }
                    ]
                },
                {
                    menuName: 'Report',
                    child: [{ menuName: 'Cable & Rack Capacity Report', url: '/cabling-and-rack-shortfall-capacity-report' },
                    { menuName: 'Capacity Demand Prediction Report', url: '/capacity-summary-report' },
                    { menuName: 'Detailed ADVA Chassis Report', url: '/detailed-adva-chassis-report' },
                    { menuName: 'Detailed Patch Panel Report', url: '/detailed-patch-panel-report' },
                    { menuName: 'Detailed Reservation Report Site', url: '/detail-reservation-report' },
                    // { menuName: 'Detailed Site Report', url: '/detailed-site-report' },
                    {
                        menuName: 'Detailed Site Report',
                        child: [
                            { menuName: 'Edge RT', url: '/detailed-site-reportEdgeRT' },
                            { menuName: 'Core RT', url: '/detailed-site-reportCoreRT' }
                        ]
                    },
                    // { menuName: 'Detailed Site Report New', url: '/detailed-site-report-new' }
                    { menuName: 'Shortfall Automation Detailed Report', url: '/shortfall-automation-detailed-report' }
                    ]
                },
                {
                    menuName: 'Tools',
                    child: [{ menuName: 'Diversity Group Forecast', url: './diversity-report' },
                    ]
                },
                {
                    menuName: 'Visualization',
                    child: [{ menuName: '3D Chassis Viewer', url: './chassis-viewer' },
                    { menuName: '360 Site Viewer', url: './three60-twod' }
                    ]
                },
                {
                    menuName: 'Capacity Build Plan Status',
                    child: [
                        { menuName: 'Capacity Build Plan - Card', url: '/capacitybuildplan' },
                        { menuName: 'Capacity Build Plan - Cable', url: '/capacitybuildplancable' },
                        { menuName: 'Capacity Build Plan - Rack', url: '/capacitybuildplanRack' }
                    ]
                },
                // {
                //     menuName: 'Track page', url: 'trackpage',
                // }
            ]
        },
        PRE_PROD_CP_ACCOUNTING_USER: {
            userName: 'Capacity Planning Accounting User',
            menuOptions: [
                {
                    menuName: 'Product Line Forecast',
                    child: [
                        { menuName: 'Edge RT', url: '/product-line-forecastEdgeRT' },
                        { menuName: 'Core RT', url: '/product-line-forecastCoreRT' }
                    ]
                },
                {
                    menuName: 'Trend and Forecast',
                    child: [
                        { menuName: 'Forecast Management Report', url: '/forecast-management-report' },
                        { menuName: 'Forecast Analysis', url: '/forecast-analysis' }
                    ]
                }
            ]
        }
    }
};
