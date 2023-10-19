/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginLoginGet({
        afterLogin,
    }: {
        afterLogin?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/login',
            query: {
                'after_login': afterLogin,
            },
            errors: {
                302: `Redirecting to authentication server`,
                422: `Validation Error`,
                504: `Authentication server timed out`,
            },
        });
    }

    /**
     * Get Current User
     * @returns User Successful Response
     * @throws ApiError
     */
    public static getCurrentUserUserGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
            errors: {
                401: `User unauthorized or authentication problem`,
            },
        });
    }

}
