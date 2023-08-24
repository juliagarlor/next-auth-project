export interface UserRepresentation{
    id: string,
    createdTimestamp: number,
    username: string,
    enabled: boolean,
    totp: boolean,
    emailVerified: boolean,
    firstName: string,
    lastName: string,
    email: string,
    disableableCredentialTypes: [],
    requiredActions: [],
    notBefore: number,
    access: {
        manageGroupMembership: boolean,
        view: boolean,
        mapRoles: boolean,
        impersonate: boolean,
        manage: boolean
    }
}