import { Octokit } from '@octokit/core';
/* config.js 상위에서 생성 뒤 깃헙 token을 발급받아서 객체형식으로 생성해줘야합니다.*/
import config from '../../config';

const octokit = new Octokit({ auth: config.githubToken });

export const getUserList = async ($username, $page, $perPage) => {
  try {
    const response = await octokit.request('GET /search/users', {
      q: `${$username} in:login`,
      per_page: `${$perPage}`,
      page: `${$page}`,
    });

    return response.data;
  } catch (e) {
    throw new Error(`${e.message}`);
  }
};
