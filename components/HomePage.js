import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss';
import { getPosts, addPosts } from '../request';
import { useQuery, useMutation } from 'react-query'
import { showToast } from '../utils/index';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'



// set refetchOnWindowFocus: false if you want to disable refetching on window focus
// if a query fails, by default, it is retried 3 times, setting a retry to false deactivates the retry
//setting the retry to a number retries the number of times it is set to

const HomePage = () => {
  const [post, setPost] = useState('');
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const {mutate} = useMutation(addPosts, {
    onError: (error) => {
      console.log(error.message)
    }, 
    onSuccess: (data) => {
      showToast("Post Added", "success");
      localStorage.setItem("token", data)
      },
    retry: 0,
    }
  )

  // const responseFacebook = (response) => {
  //   console.log(response);
  // }

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }


  const handleChange = (e) => {
    setPost(e.target.value)
  }
  const handlePost = (e) => {
    e.preventDefault()
    mutate(post)
  }
   const { isLoading, isError, data } = useQuery('posts', getPosts, { refetchOnWindowFocus: false, retry: 3 });
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

    return (
      <div className={styles.homePage}>
        <form onSubmit={handlePost}>
          <input
            type='text' 
            onChange={handleChange}
            value={post}
          />
          <button>submit</button>
        </form>
        <div className={''}>{data.map((datum, i) => {
          return (
              <div key={datum.id}>
                <h2>{datum.title}</h2>
                <p>{datum.body}</p>
              </div>
              )
            })
          }
          </div>
          <FacebookLogin
            appId="1833707013488812"
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook"
          />
      </div>
    )
}

export default HomePage