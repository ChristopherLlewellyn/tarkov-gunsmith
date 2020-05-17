'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/* THROTTLING
| 'throttle:10' = 10 requests per 60 seconds
| 'throttle:10,120' = 10 requests per 120 seconds
| 
| We should validate requests BEFORE executing middleware, otherwise users are throttled for
| missing details
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

    // ----- Users -----
    // register
    Route
      .post('auth/register', 'UserController.register')
      .validator('RegisterUser')
      .middleware(['throttle:10', 'verifyCaptchaV3', 'profanityFilterUser'])

    // confirm email address
    Route
      .get('auth/register/confirm/:token', 'UserController.confirmEmail')

    // request password reset
    Route
      .post('auth/password/email', 'UserController.sendPasswordResetEmail')
      .validator('PasswordResetEmail')
      .middleware('throttle:10', 'verifyCaptchaV3')

    // confirm password reset
    Route
      .post('auth/password/reset', 'UserController.resetPassword')
      .validator('PasswordReset')
      .middleware('verifyCaptchaV3')

    // login
    Route
      .post('auth/login', 'UserController.login')
      .validator('LoginUser')
      .middleware('throttle:10', 'verifyCaptchaV3')

    // ----- Gunbuilds -----
    // get all
    Route
      .get('gunbuilds', 'GunbuildController.index')
      .middleware(['throttle:60'])

    // get all for logged in user
    Route
      .get('gunbuilds/mine', 'GunbuildController.indexMine')
      .middleware(['throttle:60', 'auth'])

    // get all by gun (DEPRECATED - we can now make queries using parameters on the /gunbuilds endpoint)
    Route
      .get('gunbuilds/indexbygun/:id', 'GunbuildController.indexByGun')
      .middleware(['throttle:60', 'findGun'])

    // get one
    Route
      .get('gunbuilds/:id', 'GunbuildController.show')
      .middleware(['throttle:60', 'findGunbuild'])

    // create one
    Route
      .post('gunbuilds', 'GunbuildController.create')
      .validator('Gunbuild')
      .middleware(['throttle:3', 'auth', 'profanityFilterGunbuild', 'verifyCaptchaV3'])

    // update one
    Route
      .patch('gunbuilds/:id', 'GunbuildController.update')
      .validator('Gunbuild')
      .middleware(['throttle:60', 'auth', 'findGunbuild', 'profanityFilterGunbuild', 'verifyCaptchaV3'])

    // delete one
    Route
      .delete('gunbuilds/:id', 'GunbuildController.delete')
      .middleware(['throttle:60', 'auth', 'findGunbuild'])

    // vote
    Route
      .patch('gunbuilds/:id/vote', 'GunbuildController.vote')
      .middleware(['throttle:20', 'verifyCaptchaV2', 'findGunbuild']) // add captcha verification middleware

    // ----- Attachments -----
    // get all
    Route
      .get('attachments', 'AttachmentController.index')
      .middleware(['throttle:60'])

    // ----- Guns -----
    // get all
    Route
      .get('guns', 'GunController.index')
      .middleware(['throttle:60'])

  })
  .prefix('api')
