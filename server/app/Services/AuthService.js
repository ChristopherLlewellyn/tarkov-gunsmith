const InvalidAccessException = use('App/Exceptions/InvalidAccessException')

class AuthService {
  verifyPermission(resource, user) {
    if (resource.user_id !== user.id) {
      throw new InvalidAccessException()
    }
  }
}

module.exports = new AuthService()