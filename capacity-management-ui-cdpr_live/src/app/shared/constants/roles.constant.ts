/**
 * Roles Constants
 */
export const RoleConstants = {
    rolesMapping: {
        PROD_CE_ADMIN: {
            default: '/capacity-summary-report',
            routes: ['/capacity-summary-report', '/detailed-site-report', '/shortfall-automation-dashboard', '/reservation-dashboard', '/capacitybuildplan',
                '/capacity-dashboard', '/diversity-report', '/detail-reservation-report', '/cabling-and-rack-shortfall-capacity-report'
            ,'/trackprogress', '/sne-recovery-overview', '/sne-recovery']
        },
        PROD_CE_VIEWER: {
            default: '/capacity-summary-report',
            routes: ['/capacity-summary-report', '/detailed-site-report', '/shortfall-automation-dashboard', '/reservation-dashboard', '/capacitybuildplan',
                '/capacity-dashboard', '/diversity-report', '/detail-reservation-report', '/cabling-and-rack-shortfall-capacity-report',
                '/trackprogress']
        },
        PROD_CE_DESIGNER: {
            default: '/product-line-forecastEdgeRT',
            routes: ['/product-line-forecastEdgeRT', '/forecast-management-report', '/forecast-analysis']
        },
        PRE_PROD_CP_ADMIN: {
            default: '/capacity-summary-report',
            routes: ['/capacity-summary-report', '/detailed-site-report', '/shortfall-automation-dashboard', '/reservation-dashboard', '/capacitybuildplan',
                '/capacity-dashboard', '/diversity-report', '/detail-reservation-report', '/cabling-and-rack-shortfall-capacity-report'
            ,'/trackprogress', '/sne-recovery',  '/sne-recovery-overview']
        },
        PRE_PROD_CE_DESIGNER: {
            default: '/product-line-forecastEdgeRT',
            routes: ['/product-line-forecastEdgeRT', '/forecast-management-report', '/forecast-analysis']
        },
        PRE_PROD_CP_USER: {
            default: '/capacity-summary-report',
            routes: ['/capacity-summary-report', '/detailed-site-report', '/shortfall-automation-dashboard', '/reservation-dashboard', '/capacitybuildplan',
                '/capacity-dashboard', '/diversity-report', '/detail-reservation-report', '/cabling-and-rack-shortfall-capacity-report']
        },
        PRE_PROD_CP_ACCOUNTING_USER: {
            default: '/product-line-forecastEdgeRT',
            routes: ['/product-line-forecastEdgeRT', '/forecast-management-report', '/forecast-analysis']
        },
    }
};
