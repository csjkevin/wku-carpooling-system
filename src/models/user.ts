import { useState } from 'react';

export default () => {
  const [user, setUser] = useState(null);
  return { user, setUser };
};
