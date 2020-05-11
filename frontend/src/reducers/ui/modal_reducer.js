import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../../actions/modal_actions';

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal
    case CLOSE_MODAL:
      return null
    default:
      return state;
  }
}