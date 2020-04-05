const knex            = require('knex'),
      configuration   = require('../../knexfile'),
      connection      = knex(
                            process.env.NODE_ENV === 'test' ?
                            configuration.test :
                            configuration.development
                        );

module.exports = connection;