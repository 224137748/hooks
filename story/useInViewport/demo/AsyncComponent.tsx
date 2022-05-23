import React from 'react';

const RankList = () => {
  return (
    <ul>
      {Array(5).fill(1).map((_,index) => (<li key={index}>这是排行榜{index}</li>))}
    </ul>
  )
}

export const Skeleton = () => {
  return (
    <div className="list-wrapper">
       {Array(5).fill(1).map((_,index) => (<div key={index} className="list-item"></div>))}
    </div>
  )
}

export default RankList;