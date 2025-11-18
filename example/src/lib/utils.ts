import { AuthProvider, AuthScopes } from '$api';
import { QB_CLIENT_ID, QB_CLIENT_SECRET } from '$env/static/private';

export const authProvider = new AuthProvider(
    QB_CLIENT_ID,
    QB_CLIENT_SECRET,
    "http://localhost:4000/callback",
    "sandbox",
    [
        AuthScopes.Accounting,
    ]
);