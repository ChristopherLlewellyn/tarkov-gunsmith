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

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {

// Users
  //login + register
  Route.post('auth/register', 'UserController.register')
  Route.post('auth/login', 'UserController.login')

  // get all
  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
  

// Gunbuilds
  // get all
  Route.get('gunbuilds', 'GunbuildController.index')
  // get one
  Route.get('gunbuilds/:id', 'GunbuildController.show')

  // create one
  Route.post('gunbuilds', 'GunbuildController.create').middleware('auth')
  // update one
  Route.patch('gunbuilds/:id', 'GunbuildController.update').middleware('auth')
  // delete one
  Route.delete('gunbuilds/:id', 'GunbuildController.delete').middleware('auth')

})
  .prefix('api')
  