import { useQuery, UseQueryOptions } from 'react-query'
import dayjs from 'dayjs'
import { api } from '../api'

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUsersResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<GetUsersResponse>('users', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data?.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: dayjs(user.createdAt).format('DD/MM/YYYY')
    }
  })

  return {
    users,
    totalCount
  }
}

export const useUsers = (page: number, options: UseQueryOptions) => {
  return useQuery<GetUsersResponse>(
    ['users', page],
    async () => {
      const data = await getUsers(page)
      return data
    },
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      ...options
    } as any
  )
}
