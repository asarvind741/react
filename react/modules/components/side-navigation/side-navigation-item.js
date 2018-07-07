import React from 'react';

const SideNaviationItem = ({item}) => {
const id = item._id;
  return <a href="/listQuiz">
    { item.quizname }
  </a>
}

export default SideNaviationItem;
