import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />

export const CreateNewObject = shopers => {
  const newShopers = [];
  shopers.map(shoper => {
    newShopers.push({user: { _id: shoper._id, avatar: shoper.avatar, username: shoper.username }});
    return shoper
  })
  return newShopers
};
