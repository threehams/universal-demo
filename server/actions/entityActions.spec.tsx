import { List, Map, Set } from 'immutable';
import { expect } from '../../__test__/configureExpect';

import { Entity, State } from '../records';
import { move } from './entityActions';
import { SetServerState } from './messageActions';

describe('entityActions', () => {
  describe('move', () => {
    context('when items exist', () => {
      it('sends a SET_STATE action with entity delta', () => {
        const state = new State(Map({
          entities: Map({
            1: new Entity({
              components: Set(['creature', 'player']),
              entities: List(['2']),
              id: '1',
              name: 'player',
            }),
            2: new Entity({
              id: '2',
              name: 'thing',
            }),
            3: new Entity({
              components: Set(['location']),
              entities: List(['1', '4', '5']),
              id: '3',
              name: 'location',
            }),
            4: new Entity({
              entities: List(['6']),
              id: '4',
              name: 'container',
            }),
            5: new Entity({
              components: Set(['creature', 'player']),
              id: '5',
              name: 'player2',
            }),
            6: new Entity({
              id: '6',
              name: 'thing2',
            }),
          }),
        }));

        const thunk = move('1', 'self/thing', 'floor/container');
        let result: SetServerState;
        const getState = () => {
          return state;
        };
        thunk((action: SetServerState) => {
          result = action;
        }, getState);
        expect(result.payload.entities).to.equal(Map({
          1: new Entity({
            components: Set(['creature', 'player']),
            entities: List([]),
            id: '1',
            name: 'player',
          }),
          4: new Entity({
            entities: List(['6', '2']),
            id: '4',
            name: 'container',
          }),
        }));
        expect(result.payload.messages).to.equal(Map({
          owner: 'You moved thing to container.',
          viewer: '1 moved thing to container.',
        }));
        expect(result.payload.observers).to.equal(List(['5']));
        expect(result.payload.owner).to.equal('1');
      });
    });
  });
});
