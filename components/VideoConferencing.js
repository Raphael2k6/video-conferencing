import React, {useState, useEffect} from 'react';
//import Image from 'next/image';
//import { channelLists } from '../mockData';
// import styles from '../styles/VideoConferencing.module.scss';
// import { showToast } from '../utils/index';
// import { sendUserInfo } from '../request';
// import VideoCall from './AgoraVideoConferencing/VideoCall';
// import ChannelForm from './AgoraVideoConferencing/ChannelForm';


//import { useQuery, useMutation } from 'react-query'
import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
    ClientConfig,
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
  IMicrophoneAudioTrack,
  } from 'agora-rtc-sdk-ng';


// const useClient = createClient(config);
// const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

// const VideoConferencing = () => {
//     const [showDialog, setShowDialog] = useState(false);
//     const [clicked, setClicked] = useState(0);
//     const [nickName, setNickName] = useState('');
//     const [sdkParam, setSDKParams] = useState(null);

//     const [inCall, setInCall] = useState(false);
//     const [channelName, setChannelName] = useState('');


    // const {mutate} = useMutation(sendUserInfo, {
    //     onError: (error) => {
    //       console.log(error.message)
    //     }, 
    //     onSuccess: (data) => {
    //       showToast("success", "success");
    //       setSDKParams(data)
    //       },
    //     retry: 0,
    //     }
    //   )
    
    // const handleShowDailog = (id, channel) => {
    //     if (clicked === id) {
    //         setClicked(null);
    //     }
    //     setClicked(id);
    //     setShowDialog(true);
    //     setChannelName(channel)
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const payload = {
    //         nickname: nickName,
    //         channelName
    //     }
    //     mutate(payload)
    // }

    // const channels = channelLists.map((channel, i) => {
    //     return (
    //         <div key={i} className={styles.projects} onClick={() => handleShowDailog(channel.id, channel.name)}>
    //             <div>
    //                 <p>{channel.name}</p>
    //             </div>

    //             {
    //                 showDialog === true && clicked === channel.id && (
    //                     <div>
    //                         <form onSubmit={handleSubmit}>
    //                             <input
    //                                 type="string"
    //                                 value={nickName}
    //                                 onChange={(e) => setNickName(e.target.value)}
    //                                 placeholder="Enter your nickName"
    //                             />
    //                             <input
    //                                 type="string"
    //                                 value={channelName}
    //                                 readOnly
    //                             />
    //                             <button type="submit">Join</button>
    //                         </form>
    //                     </div>
    //                 )
    //             }
                    
    //                 {/* <Link href={channel.route}>
    //                      <a href={project.url} target="_blank" rel="noopener nofollow noreferrer">
    //                      <Image
    //                             className={''}
    //                             height={250}
    //                             width={420}
    //                             src={channel.img}
    //                         />
    //                     </a>
    //                 </Link> */}

    //             </div>
    //     )
    // })

//     return (
//         <div className={styles.projectContainer}>
//             {/* <div className={styles.glass}>
//                 <h1>Welcome to KConferencing</h1>
//                 <p>An interactive channel for realtime video conferencing for teams, family and friends</p>
//                 <h2>Channels</h2>
//                 <div className={styles.projectCard}>{channels}</div>
//             </div> */}
//             <div>
//             <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
//                 {inCall ? (
//                     <VideoCall setInCall={setInCall} channelName={channelName} />
//                 ) : (
//                     <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />  
//                 )}
//             </div>
//         </div>
//     )
// }


//export default VideoConferencing;

  const appId = "68cbc921c7864a3ea47f976b1346afab"; //ENTER APP ID HERE
  let token = "0061431b247adcb480880cf0b4fd24e0c03IADG0UrG1Fjf+VvU0yDtWZgspaJiwlTtMBes1rzKiWHC9JAcxRkjTXRBIgAmMBcoGyCSYgQAAQCr3JBiAgCr3JBiAwCr3JBiBACr3JBi";  

const config = { 
  mode: "rtc", codec: "vp8", appId: appId, token: token 
  };
  
  

const useClient = () => createClient(config);
console.log("here",  useClient)
const useMicrophoneAndCameraTracks =  () => createMicrophoneAndCameraTracks();

const VideoConferencing = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  

  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};


const VideoCall = ({ setInCall, channelName }) => {
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
      console.log("here",  useClient)
        // function to initialise the SDK
        let init = async (name) => {
          console.log("init", name);
          client.on("user-published", async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            console.log("subscribe success");
            if (mediaType === "video") {
              setUsers((prevUsers) => {
                return [...prevUsers, user];
              });
            }
            if (mediaType === "audio") {
              user.audioTrack?.play();
            }
          });
    
          client.on("user-unpublished", (user, type) => {
            console.log("unpublished", user, type);
            if (type === "audio") {
              user.audioTrack?.stop();
            }
            if (type === "video") {
              setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
              });
            }
          });
    
          client.on("user-left", (user) => {
            console.log("leaving", user);
            setUsers((prevUsers) => {
              return prevUsers.filter((User) => User.uid !== user.uid);
            });
          });
    
          await client.join(config.appId, name, config.token, null);
          if (tracks) await client.publish([tracks[0], tracks[1]]);
          setStart(true);
    
        };
    
        if (ready && tracks) {
          console.log("init ready");
          init(channelName);
        }
    
      }, [channelName, client, ready, tracks]);

      return (
        <div className="App">
          {ready && tracks && (
            <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
          )}
          {console.log('check', start, users, tracks)}
          {start && tracks && <Videos users={users} tracks={tracks} />}
          {"Hello I am here"}
        </div>
      );
    };

    const Videos = (props) => {
      const { users, tracks } = props;
    
      return (
        <div>
          <div id="videos">
            <AgoraVideoPlayer className='vid' videoTrack={tracks[1]} style={{height: '95%', width: '95%'}} />
            {users.length > 0 &&
              users.map((user) => {
                if (user.videoTrack) {
                  return (
                    <AgoraVideoPlayer className='vid' videoTrack={user.videoTrack} style={{height: '95%', width: '95%'}} key={user.uid} />
                  );
                } else return null;
              })}
          </div>
        </div>
      );
    };


    const Controls = ({tracks, setStart,setInCall}) => {
        const client = useClient();
        const [trackState, setTrackState] = useState({ video: true, audio: true });
      
        const mute = async (type) => {
          if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
              return { ...ps, audio: !ps.audio };
            });
          } else if (type === "video") {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
              return { ...ps, video: !ps.video };
            });
          }
        };
      
        const leaveChannel = async () => {
          await client.leave();
          client.removeAllListeners();
          tracks[0].close();
          tracks[1].close();
          setStart(false);
          setInCall(false);
        };
      
        return (
          <div className="controls">
            <p className={trackState.audio ? "on" : ""}
              onClick={() => mute("audio")}>
              {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
            </p>
            <p className={trackState.video ? "on" : ""}
              onClick={() => mute("video")}>
              {trackState.video ? "MuteVideo" : "UnmuteVideo"}
            </p>
            {<p onClick={() => leaveChannel()}>Leave</p>}
          </div>
        );
      };

      export const ChannelForm = ({setInCall, setChannelName}) => {
  
        return (
          <form className="join">
          {config.appId === '' && <p style={{color: 'red'}}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
            <input type="text"
              placeholder="Enter Channel Name"
              onChange={(e) => setChannelName(e.target.value)}
            />
            <button onClick={(e) => {
              e.preventDefault();
              setInCall(true);
            }}>
              Join
            </button>
          </form>
        );
      };

      export default VideoConferencing;


