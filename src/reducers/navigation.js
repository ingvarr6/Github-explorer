import { NavigationActions } from 'react-navigation';

import { RootNavigator } from '../navigators/AppNavigator';

const firstAction = RootNavigator.router.getActionForPathAndParams('WebView');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const secondAction = RootNavigator.router.getActionForPathAndParams('Explore');
const initialNavState = RootNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

export function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Explore':
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    // case 'WebView':
    //   nextState = RootNavigator.router.getStateForAction(
    //     NavigationActions.navigate({ routeName: 'WebView' }),
    //     state
    //   );
    //   break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
