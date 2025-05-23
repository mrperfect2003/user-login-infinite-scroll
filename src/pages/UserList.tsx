import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sampleDara from './user'
import '../index.css';

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    const res = sampleDara;
    const data: User[] = res;
    const newUsers = data.slice((page - 1) * 5, page * 5);
    setUsers((prev) => [...prev, ...newUsers]);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  return (
    <div className="user-list-wrapper">
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`}
              alt="avatar"
              style={{ borderRadius: '50%', width: 60, height: 60, marginBottom: '10px' }}
            />
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
            <p>@{user.username}</p>
          </div>
        ))}
        <div ref={observerRef}></div>
        {loading && <div className="spinner"></div>}
      </div>

      <div className="bottom-bar">
        <button onClick={() => navigate('/')}>Logout</button>
      </div>
    </div>
  );
};

export default UserList;
