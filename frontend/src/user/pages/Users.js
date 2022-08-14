import React from "react";

import UsersList from "../components/UsersList";

function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Denizcan Yilmaz",
      image:
        "https://the18.com/sites/default/files/styles/featured_mobile__621x709_/public/photo-story-images/20200407-The18-Image-Soccer-Cat-Feature2.jpg?itok=rPtx78i7",
      places: 2,
    },
  ];

  return <UsersList items={USERS} />;
}

export default Users;
