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
      <button class="btn btn-outline-dark d-flex justify-content-end" data-bs-toggle="modal"
        data-bs-target="#postFormModal">Create Post
      </button>
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
        <button class="btn btn-small btn-white text-muted selectable" onclick="app.AuthController.logout()">
        <i class="mdi mdi-logout-variant f-16 text-white"></i></button>
  `
    : /* html */ `
    <button class="btn btn-dark selectable" onclick="app.AuthController.login()">login</button>
  `
}

function avatarTemplate(account) {
  return account
    ? /* html */ `
    <div class="mr-2">
      <img class="rounded-circle" src="${account.picture}" alt="${account.name}" height="45"/>
      <span class="mx-1">${account.name}</span>
      </div>`
    : AuthService.loading
      ? /* html */ `
      <div class="skeleton-loader dark avatar"></div>
      <div class="skeleton-loader dark text sm mx-2"></div>`
      : /* html */`
      <div></div>
      `
}
