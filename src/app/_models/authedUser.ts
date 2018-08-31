export default  interface AuthedUser {
    email: string,
    name: string,
    token: string,
    roles: Array<string>,
}