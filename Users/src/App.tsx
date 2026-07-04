import { useEffect, useState } from 'react'
import axios, { type AxiosResponse } from 'axios'
import './App.css'
import type { IUser } from './interfaces'

function App() {
  const [users, setUsers] = useState<IUser[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      .then((response: AxiosResponse<IUser[]>) => {
        setUsers(response.data)
      })
      .catch((error: unknown) => {
        console.error('Failed to fetch users:', error)
      })
  }, [])

  const filteredUsers = users.filter((user) => {
    const text = search.toLowerCase()
    return user.name.toLowerCase().includes(text)
  })

  return (
    <div className="app">
      <h1>Users</h1>
      <input
        type="text"
        placeholder="search: "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="cards">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p><b>email: </b>{user.email}</p>
            <p><b>phone: </b>{user.phone}</p>
            <p><b>company name: </b>{user.company.name}</p>
            <p><b>website: </b>{user.website}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
