export default {
  entities: {
    18: {
      components: ['container', 'lockable', 'openable'],
      entities: ['19'],
      id: '18',
      name: 'usb-drive',
      states: ['unlocked', 'opened'],
    },
    19: {
      components: ['item'],
      description: '```andy; I’m just doing my job, nothing personal, sorry,```',
      id: '19',
      name: 'mydoom.js',
    },
  },
  message: 'You plug the [usb-drive](/items/18) into your head.',
};
