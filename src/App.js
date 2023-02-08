import axios from 'axios';
import Loader from 'react-loader';
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([]);
  const [card, setCard] = useState({});
  const [loaded, setLoaded] = useState(false);

  async function fetchUsers() {
    let { data } = await axios.get('https://reqres.in/api/users');
    if (data) {
      setLoaded(true);
      let _users = data.data;
      setUsers(_users);
    }
  }

  async function fetchUser(id) {
    setLoaded(false);
    let response = await axios.get(`https://reqres.in/api/users/${id}`);
    if (response) {
      setLoaded(true);
      setCard(response.data.data);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <Loader loaded={loaded}>
      <div className="App">
        <div className='card'>
          {
            card.id
              ?
              <>
                <div>
                  <img src={card.avatar} alt={card.first_name} />
                </div>
                <div>
                  {card.first_name} {card.last_name}
                </div>
                <div>
                  {card.email}
                </div>
              </>
              : <div> Please click on any Button </div>

          }
        </div>
        <div className='buttons'>
          {
            users.map(user => {
              return (
                <button key={user.email} onClick={() => fetchUser(user.id)}>
                  {user.id}
                </button>
              )
            })
          }
        </div>
      </div>
    </Loader>
  )
}

export default App
