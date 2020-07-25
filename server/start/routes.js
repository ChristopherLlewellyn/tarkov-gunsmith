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

//! THROTTLING HAS BEEN REMOVED AS IT WAS NOT WORKING AS INTENDED
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
      .middleware(['verifyCaptchaV3', 'profanityFilterUser'])

    // confirm email address
    Route
      .get('auth/register/confirm/:token', 'UserController.confirmEmail')

    // request password reset
    Route
      .post('auth/password/email', 'UserController.sendPasswordResetEmail')
      .validator('PasswordResetEmail')
      .middleware('verifyCaptchaV3')

    // confirm password reset
    Route
      .post('auth/password/reset', 'UserController.resetPassword')
      .validator('PasswordReset')
      .middleware('verifyCaptchaV3')

    // login
    Route
      .post('auth/login', 'UserController.login')
      .validator('LoginUser')
      .middleware('verifyCaptchaV3')

    // social sign up/log in 
    // 'provider' is the 3rd party authenticator's name, e.g. 'google' or 'facebook'
    Route
      .post('auth/social/:provider', 'UserController.socialLogin')

    // change username
    Route
      .patch('auth/change-username', 'UserController.changeUsername')
      .validator('ChangeUsername')
      .middleware('profanityFilterUser')

    // get profile data
    Route
      .get('auth/profile', 'UserController.profile')
      
    // ----- Gunbuilds -----
    // get all
    Route
      .get('gunbuilds', 'GunbuildController.index')

    // get all for logged in user
    Route
      .get('gunbuilds/mine', 'GunbuildController.indexMine')
      .middleware(['auth'])

    // get all by gun (DEPRECATED - we can now make queries using parameters on the /gunbuilds endpoint)
    Route
      .get('gunbuilds/indexbygun/:id', 'GunbuildController.indexByGun')
      .middleware(['findGun'])

    // get one
    Route
      .get('gunbuilds/:id', 'GunbuildController.show')
      .middleware(['findGunbuild'])

    // create one
    Route
      .post('gunbuilds', 'GunbuildController.create')
      .validator('Gunbuild')
      .middleware(['auth', 'profanityFilterGunbuild', 'verifyCaptchaV3'])

    // update one
    Route
      .patch('gunbuilds/:id', 'GunbuildController.update')
      .validator('Gunbuild')
      .middleware(['auth', 'findGunbuild', 'profanityFilterGunbuild', 'verifyCaptchaV3'])

    // delete one
    Route
      .delete('gunbuilds/:id', 'GunbuildController.delete')
      .middleware(['auth', 'findGunbuild'])

    // vote
    Route
      .patch('gunbuilds/:id/vote', 'GunbuildController.vote')
      .middleware(['verifyCaptchaV2', 'findGunbuild']) // add captcha verification middleware

    // ----- Attachments -----
    // get all
    Route
      .get('attachments', 'AttachmentController.index')

    // ----- Guns -----
    // get all
    Route
      .get('guns', 'GunController.index')

  })
  .prefix('api')
