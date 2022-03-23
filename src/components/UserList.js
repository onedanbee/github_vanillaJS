import { getUserList } from '../api/index.js';

export default function UserList({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement('ul');
  this.$target.className = 'userList_box';
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const option = {
    //null로 지정하면 viewport가 된다.
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };
  const makeUserListEl = (userInfo) => {
    const $li = document.createElement('li');
    $li.className = 'user_info';
    $li.key = userInfo.login;
    $li.textContent = `${userInfo.login}님`;
    this.$target.appendChild($li);
  };

  this.render = () => {
    if (this.state.userList && this.state.currentPage === 1) {
      this.state.userList.map((userInfo) => {
        return makeUserListEl(userInfo);
      });
    }

    let allUserList = document.querySelectorAll('.user_info');

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (allUserList[allUserList.length - 1] === entry.target) {
            setTimeout(() => {
              observer.unobserve(entry.target);
              if (this.state.currentPage < this.state.totalPage) {
                addUserInfo().then(() => {
                  observeLastChild(observer);
                });
              }
            }, 1000);
          }
        }
      });
    }, option);


    !this.state.isLoading &&
      allUserList.forEach((allUserListEl) => {
        io.observe(allUserListEl);
      });

    const observeLastChild = (intersectionObserver) => {
      allUserList.forEach((el) => {
        if (!el.nextSibling && this.state.currentPage < this.state.totalPage) {
          intersectionObserver.observe(el);
        } else if (
          !el.nextSibling &&
          this.state.currentPage >= this.state.totalPage
        ) {
          intersectionObserver.disconnect();
          console.log('더 이상 페이지가 없습니다.');
        }
      });
    };

    const addUserInfo = async () => {
      const nextPageCount = ++this.state.currentPage;
      if (!this.state.isLoading) {
        this.setState({
          ...this.state,
          isLoading: !this.state.isLoading,
        });
      }

      const res = await getUserList(
        this.state.searchId,
        nextPageCount,
        this.state.perPage
      );

      res.items.map((i) => {
        return makeUserListEl(i);
      });

      this.setState({
        ...this.state,
        userList: this.state.userList.concat(res.items),
        isLoading: !this.state.isLoading,
        currentPage: nextPageCount,
      });
    };
  };

  this.render();
}