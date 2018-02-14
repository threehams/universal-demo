export default {
  availableCommands: [
    {
      name: 'take',
      parts: [
        {
          allowed: [
            {
              components: ['item', 'container'],
              owners: ['floor'],
            },
          ],
        },
      ],
    },
    {
      name: 'drop',
      parts: [
        {
          allowed: [
            {
              components: ['item', 'container'],
              owners: ['self'],
            },
          ],
        },
      ],
    },
    {
      name: 'transfer',
      parts: [
        {
          allowed: [
            {
              components: ['item', 'container'],
              owners: ['self', 'floor'],
            },
          ],
        },
        {
          allowed: [
            {
              names: ['to'],
            },
          ],
        },
        {
          allowed: [
            {
              components: ['container'],
              owners: ['self', 'floor'],
            },
          ],
        },
      ],
    },
    {
      name: 'move',
      parts: [
        {
          allowed: [
            {
              components: ['item', 'container'],
              owners: ['self', 'floor'],
            },
          ],
        },
        {
          allowed: [
            {
              names: ['to'],
            },
          ],
        },
        {
          allowed: [
            {
              components: ['container'],
              owners: ['self', 'floor'],
            },
          ],
        },
      ],
    },
    {
      name: 'say',
      parts: [],
    },
    {
      name: 'help',
      parts: [],
    },
    {
      name: 'walk',
      parts: [
        {
          allowed: [
            {
              types: ['exit'],
            },
          ],
        },
      ],
    },
    {
      name: 'look',
      parts: [
        {
          allowed: [
            {
              owners: ['self', 'floor'],
              types: ['entity'],
            },
            {
              types: ['exit'],
            },
          ],
        },
      ],
    },
    {
      name: 'tell',
      parts: [
        {
          allowed: [
            {
              components: ['creature', 'player'],
              types: ['entity'],
            },
          ],
        },
      ],
    },
    {
      name: 'attack',
      parts: [
        {
          allowed: [
            {
              components: ['creature', 'player'],
              types: ['entity'],
            },
          ],
        },
      ],
    },
    {
      name: 'kill',
      parts: [
        {
          allowed: [
            {
              components: ['creature', 'player'],
              types: ['entity'],
            },
          ],
        },
      ],
    },
    {
      name: 'open',
      parts: [
        {
          allowed: [
            {
              components: ['container'],
              states: ['closed'],
              types: ['entity'],
            },
          ],
        },
      ],
    },
    {
      name: 'unlock',
      parts: [
        {
          allowed: [
            {
              components: ['container', 'lockable'],
              states: ['locked'],
              types: ['entity'],
            },
          ],
        },
      ],
    },
  ],
  entities: {
    1: {
      components: ['container'],
      entities: ['2', '3'],
      id: '1',
      name: 'scripts',
    },
    2: {
      components: ['item'],
      description: 'Remove a file',
      id: '2',
      name: 'rm.js',
    },
    3: {
      components: ['item'],
      description: `Scans the target system for open ports.

        > The Ares Technology Portscanner is designed for performance, but has some security and reliability concerns.`,
      id: '3',
      name: 'portscan.js',
      quantity: 4,
    },
    4: {
      components: ['container'],
      entities: ['5', '6'],
      id: '4',
      name: 'hacks',
    },
    5: {
      components: ['item'],
      id: '5',
      name: 'portscan1.js',
    },
    6: {
      components: ['container'],
      entities: ['7', '8'],
      id: '6',
      name: 'portscans',
    },
    7: {
      components: ['item'],
      description: 'Hacks a thing',
      id: '7',
      name: 'hack.js',
    },
    8: {
      components: ['item'],
      id: '8',
      name: 'hack-more.js',
    },
    9: {
      components: ['container'],
      entities: ['10', '11'],
      id: '9',
      name: 'docs',
    },
    10: {
      components: ['item'],
      id: '10',
      name: 'readme.txt',
    },
    11: {
      components: ['item'],
      id: '11',
      name: 'commands.txt',
    },
    13: {
      components: ['container', 'openable'],
      id: '13',
      name: 'small-mailbox',
      states: ['closed'],
    },
    14: {
      components: ['item'],
      description: 'WELCOME TO **REVERIE FORGE**!',
      id: '14',
      name: 'leaflet.txt',
    },
    17: {
      components: ['player'],
      currentHealth: 100,
      currentStorage: 100,
      entities: ['1', '4', '9'],
      id: '17',
      maxHealth: 100,
      maxStorage: 100,
      name: 'Big McLargeHuge',
    },
    18: {
      components: ['container', 'lockable'],
      id: '18',
      name: 'usb-drive',
      states: ['locked', 'closed'],
    },
    74: {
      components: ['creature'],
      currentHealth: 200,
      description: `Last of the freelance hackers
        Greatest sword fighter in the world
        Stringer, Central Intelligence Corporation
        Specializing in software-related intel
        (music, movies & microcode)`,
      id: '74',
      maxHealth: 200,
      name: 'Hiro',
    },
    75: {
      components: ['creature'],
      currentHealth: 400,
      description: 'A large man with a tattoo on his forehead which reads "Poor Impulse Control"',
      id: '75',
      maxHealth: 400,
      name: 'Raven',
    },
    76: {
      components: ['creature'],
      currentHealth: 40,
      description: 'A large swarm of bees. They seem uninterested in your presence.',
      id: '76',
      maxHealth: 40,
      name: 'Bees',
    },
  },
  location: {
    description: 'This is a field. No big deal.',
    entities: ['13', '18'],
    exits: ['north'],
    name: 'Field',
  },
  message: `# West of House

  You are standing in an open field west of a white house, with a boarded front door.

  - There is a [small-mailbox](/items/13) here.
  - There is a [usb-drive](/items/18) here.

  - [Hiro](/creatures/74) is here.
  - [Raven](/creatures/75) is here.
  - A swarm of [Bees](/creatures/76) is here.

  Exits:
  - [North](/exits/north)`,

  player: '17',
};
