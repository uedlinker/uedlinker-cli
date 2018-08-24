import Authorization from './Authorization'
import AuthorizedRoute from './Route'
import check from './CheckPermissions'

Authorization.AuthorizedRoute = AuthorizedRoute
Authorization.check = check

export { setCurrentAuthority } from './CheckPermissions'

export default Authorization
