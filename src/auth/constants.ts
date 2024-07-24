import { Environment } from './../../environment/environment';

const environment:Environment = new Environment;

export const jwtConstants = {
    secret: environment.secret
};