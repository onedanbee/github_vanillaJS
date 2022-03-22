console.log('start!');
import SearchInput from './components/SearchInput';

export default function App($app) {
  this.state = {
    searchId: null,
  };

  const searchInput = new SearchInput({
    $app,
    initialState: '',
    onChange: async (userList) => {
      console.log('change!!!');
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    if (this.state === nextState) {
      searchInput.setState({
        searchId: this.state.searchId,
      });
    }
  };
}
