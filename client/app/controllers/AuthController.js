import { AppState } from '../AppState.js'
import { AuthService } from '../services/AuthService.js'
import { logger } from '../utils/Logger.js'

function drawUser() {
  const user = AppState.user
  const account = AppState.account
  const userAvatar = avatarTemplate(account)
  const button = authButton(user)
  const template = /* html */ `
    <div class="d-block">
      <div class="d-flex mb-2">${userAvatar}${button}</div>
      
    </div>
  `
  // @ts-ignore
  document.getElementById('authstate').innerHTML = template
}

export class AuthController {
  constructor() {
    AppState.on('account', drawUser)
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, drawUser)
    drawUser()
  }

  async login() {
    try {
      await AuthService.loginWithRedirect()
    } catch (e) {
      logger.error(e)
    }
  }

  logout() {
    try {
      AuthService.logout()
    } catch (e) {
      logger.error(e)
    }
  }
}

function authButton(user) {

  if (AuthService.loading) { return '' }
  return user && user.isAuthenticated
    ? /* html */ `
    <div class="d-inline">
    <img class="rounded-circle" src="${user.picture}" alt="${user.nickname}" height="45"/>
    <span class="mx-1">${user.nickname}</span>
        <button class="btn btn-small btn-white selectable rounded-circle" onclick="app.AuthController.logout()">
        <i class="mdi mdi-logout-variant f-16 text-secondary"></i></button>
    
        <button class="btn btnGrey d-flex form-control justify-content-center mt-2" data-bs-toggle="modal"
        data-bs-target="#postFormModal">Create Post
      </button>
    </div>
  `
    : /* html */ `
    <button class="btn btn-dark selectable" onclick="app.AuthController.login()">login</button>
  `
}

function avatarTemplate(account) {
  return account
    ? /* html */ `
    <div class="mr-2">

      </div>`
    : AuthService.loading
      ? /* html */ `
      <div class="skeleton-loader dark avatar"></div>
      <div class="skeleton-loader dark text sm mx-2"></div>`
      : /* html */`
      <div></div>
      `
}
