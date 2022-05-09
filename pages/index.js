import styles from '../styles/Home.module.scss'
import Layout from '../components/Layout'
import HomePage from '../components/HomePage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient()

export default function Home() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <HomePage />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} panelProps={{className: 'black'}} position="top-right"/>
      </QueryClientProvider>
    </>
  )
}
