/**
 * Bootstrap configuration
 * (sails.config.bootstrap)
 *
 * Bootstrap functions are executed before the app is lifted.
 * Do not get confused by this name, no similarities with the CSS framework!
 *
 * For more information, see:
 * https://sailsjs.com/documentation/reference/configuration/sails-config-bootstrap
 */


module.exports.bootstrap = async function(done) {

  // Initializes the Default Board, when none is detected
  const brd = await Board.find({boardType: 0}).limit(1);
  if(!brd[0]){
    sails.log.info('No boards available. Creating default board...')
    await Board.create({boardName:'Default Board', boardType:0})
  }

  return done();
}
