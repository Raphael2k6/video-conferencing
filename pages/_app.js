import '../styles/globals.scss'
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

//This is done to disable global refetching in the background on window focus.
// const queryClient = new QueryClient({
//    defaultOptions: {
//      queries: {
//        refetchOnWindowFocus: false,
//      },
//    },
//  })


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} panelProps={{className: 'black'}} position="top-right"/>
      </QueryClientProvider>
    </Layout>
  ); 
}

export default MyApp
