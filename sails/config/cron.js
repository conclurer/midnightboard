/*
  Cron Tasks
  Scheduled start automatically on hook:loaded
*/
var dueTimes = require('../../config/default-display-times.js')

module.exports.cron = {

    // Deletes all posts that have exceeded the maximum overdue time.
    // Task runs every day at 2am local time. (  '0 0 2 */1 * *' )
    //    where */1 in this case means every 1 day
    // To change the time, change the schedule:
    //    'sec  min  hour  dayOfMonth  month  dayIfWeek'

  cleanupOverduePosts: {
    schedule: '0 0 2 */1 * *',
    onTick: async function () {
      sails.log.debug('SCHEDULE::: Running schedule, cleaning up overdue posts . . .');
      var overdue = Date.now() - dueTimes.MaxOverdueTime*(60*60*1000)
      var idList = await Post.find({
        where: {dueDate: { '<' : overdue }},
        select: ['id']
      });
      sails.log.debug('SCHEDULE::: Deleting ' + idList.length + ' posts . . . ');

      for(i=0;i<idList.length;i++){
        await Post.destroy({id: idList[i].id});
      }
      sails.log.debug('SCHEDULE::: Finished task!');
    },
    onComplete: function () {
      sails.log.warn('SCHEDULE::: Cron task has stopped.');
    },
    start: true
  }
};
