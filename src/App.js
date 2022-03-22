console.log('start!');
import SearchInput from './components/SearchInput';
import { getUserList } from './api';
import { sortUserId, calculateTotalPage } from './utils/index';

export default function App($app) {
  this.state = {
    searchId: null,
    userList: [],
    currentPage: 1,
    totalPage: null,
    perPage: 50,
    isLoading: false,
  };

  const searchInput = new SearchInput({
    $app,
    initialState: '',
    onChange: async (searchUserName) => {
      console.log('change!!!');
      if (!this.state.isLoading) {
        this.setState({
          ...this.state,
          isLoading: !this.state.isLoading,
        });
      }

      const res = await getUserList(
        searchUserName,
        this.state.currentPage,
        this.state.perPage
      );
      const sortData = sortUserId(res.items);
      const totalPage = calculateTotalPage(res.total_count, this.state.perPage);
      this.setState({
        ...this.state,
        userList: [...sortData],
        totalPage: totalPage,
        searchId: searchUserName,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    console.log('this.state', this.state);
    if (this.state === nextState) {
    }
  };
}
