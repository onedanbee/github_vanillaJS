import { debounce } from '../utils/index.js';

export default function SearchInput({ $app, initialState, onChange }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  this.$target.className = 'search_box';
  $app.appendChild(this.$target);

  const createSearchInputEl = document.createElement('input');
  createSearchInputEl.type = 'serach';
  createSearchInputEl.placeholder = '유저 아이디를 입력해주세요.';
  document.querySelector('.search_box').appendChild(createSearchInputEl);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onChange = onChange;

  const onKeyupUserName = (event) => {
    if (event.target.value) {
      this.onChange(event.target.value);
    }
  };

  this.render = () => {
    console.log('render InputForm');
  };

  createSearchInputEl.addEventListener('keyup', debounce(onKeyupUserName));
  this.render();
}
