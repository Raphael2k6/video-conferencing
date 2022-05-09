import React, {useEffect} from 'react'
import styles from '../styles/Home.module.scss';
import { getPosts } from '../request';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'


const HomePage = () => {
   const {isLoading, isError, data} = useQuery('posts', getPosts)
   console.log(data)
   if (isLoading) {
     return (
       <div>loading...</div>
     )
   }
   if (isError) {
     return (
       <p>something went wrong</p>
     )
   }
   if (data) {
    return (
      <div className={styles.homePage}>{data.map((datum, i) => {
        return (
          <div key={datum.id}>
          <h2>{datum.title}</h2>
          <p>{datum.body}</p>
          </div>
        )
      })}</div>
    )
   }
  
}

export default HomePage