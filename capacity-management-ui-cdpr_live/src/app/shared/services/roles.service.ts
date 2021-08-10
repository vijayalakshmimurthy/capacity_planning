import { Router, ActivatedRoute } from '@angular/router';
import { RoleConstants } from '../constants/roles.constant';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


/**
 * to load a service
 * @export
 * @class RoleService
 */
@Injectable()
export class RoleService {
    /**
     * Creates an instance of RoleService.
     * @param {Router} router
     * @param {ActivatedRoute} route
     * @memberof RoleService
     */
    private _ein;
    // tslint:disable-next-line:variable-name
    private _groupName;
    // tslint:disable-next-line:variable-name
    private _name;
    public userProfileRole;
    constructor(private router: Router, private route: ActivatedRoute) { }
    /** called from Header component
     */
    switchRole(role, currentRoute) {
        this.setCurrentRole(role);
        this.checkEligibility(this.getCurrentRole(), currentRoute);
    }
    /** called from app component
     */
    setRoles(currentRoles, currentRoute) {
        // if (this.getCurrentRole() == null) {
        this.setCurrentRole(currentRoles);
        // }
        this.checkEligibility(this.getCurrentRole(), currentRoute);
    }
    /**
     * converts the  array of roles to string
     * @returns returns all the roles
     * @memberof RoleService
     */
    getSession() {
        const roles = sessionStorage.SRIMS_SESSION && sessionStorage.SRIMS_SESSION.split(',');
        return roles;
    }
    /**
     * returns the current role from the backend storage
     * @returns returns the current role
     * @memberof RoleService
     */
    getCurrentRole() {
        const roles = sessionStorage.SRIMS_CURRENT_SESSION && sessionStorage.SRIMS_CURRENT_SESSION.split(',');
        return roles;
    }
    /**
     * sets the current role
     * @param {*} role
     * @memberof RoleService
     */
    setCurrentRole(currentRoles) {
        sessionStorage.SRIMS_CURRENT_SESSION = currentRoles;
    }
    /**
     * checks for the valid role and valid route according to the role
     * @param {*} role
     * @param {*} route
     * @returns returns the state of the current route
     * @memberof RoleService
     */
    checkEligibility(currentRoles, route) {
        if (currentRoles[0] === 'no user') {
            console.log(currentRoles);
            sessionStorage.ROUTE = route;
            this.router.navigate([route]);
        } else {
            const sessionRoles = this.getSession();
            const hasEligibleRoles = currentRoles && currentRoles.filter(role => sessionRoles.indexOf(role) !== -1);
            if (hasEligibleRoles.length > 0) {
                const accessibleRoutes = [];
                let acceptedRoutes: any;
                currentRoles.forEach(role => { accessibleRoutes.push(RoleConstants.rolesMapping[role].default); });
                acceptedRoutes = accessibleRoutes.join().split(',');
                if (acceptedRoutes) {
                    this.router.navigate(acceptedRoutes);
                } else {
                    window.location.href = environment.logout_url;
                }
            } else {
                window.location.href = environment.logout_url;
            }
        }
    }
}

