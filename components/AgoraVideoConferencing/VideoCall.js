import React, { useEffect, useState } from "react";
// const AgoraRTC = (await import('agora-rtc-sdk-ng')).default

import {
    AgoraVideoPlayer,
    createClient,
    createMicrophoneAndCameraTracks,
    ClientConfig,
    IAgoraRTCRemoteUser,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
  } from 'agora-rtc-sdk-ng'

  const config = { 
    mode: "rtc", codec: "vp8",
  };
  import Videos from "./Videos";
  // import Controls from "./Controls";

const appId = "68cbc921c7864a3ea47f976b1346afab"; //ENTER APP ID HERE
const token = null;  

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

// const VideoCall = ({ setInCall, channelName }) => {
//     const [users, setUsers] = useState([]);
//     const [start, setStart] = useState(false);
//     const client = useClient();
//     const { ready, tracks } = useMicrophoneAndCameraTracks();

//     useEffect(() => {
//         // function to initialise the SDK
//         let init = async (name) => {
//           console.log("init", name);
//           client.on("user-published", async (user, mediaType) => {
//             await client.subscribe(user, mediaType);
//             console.log("subscribe success");
//             if (mediaType === "video") {
//               setUsers((prevUsers) => {
//                 return [...prevUsers, user];
//               });
//             }
//             if (mediaType === "audio") {
//               user.audioTrack?.play();
//             }
//           });
    
//           client.on("user-unpublished", (user, type) => {
//             console.log("unpublished", user, type);
//             if (type === "audio") {
//               user.audioTrack?.stop();
//             }
//             if (type === "video") {
//               setUsers((prevUsers) => {
//                 return prevUsers.filter((User) => User.uid !== user.uid);
//               });
//             }
//           });
    
//           client.on("user-left", (user) => {
//             console.log("leaving", user);
//             setUsers((prevUsers) => {
//               return prevUsers.filter((User) => User.uid !== user.uid);
//             });
//           });
    
//           await client.join(config.appId, name, config.token, null);
//           if (tracks) await client.publish([tracks[0], tracks[1]]);
//           setStart(true);
    
//         };
    
//         if (ready && tracks) {
//           console.log("init ready");
//           init(channelName);
//         }
    
//       }, [channelName, client, ready, tracks]);

//       return (
//         <div className="App">
//           {ready && tracks && (
//             <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
//           )}
//           {start && tracks && <Videos users={users} tracks={tracks} />}
//         </div>
//       );
//     };

    //export default VideoCall;


    // export const Controls = ({tracks, setStart,setInCall}) => {
    //   const client = useClient();
    //   const [trackState, setTrackState] = useState({ video: true, audio: true });
    
    //   const mute = async (type) => {
    //     if (type === "audio") {
    //       await tracks[0].setEnabled(!trackState.audio);
    //       setTrackState((ps) => {
    //         return { ...ps, audio: !ps.audio };
    //       });
    //     } else if (type === "video") {
    //       await tracks[1].setEnabled(!trackState.video);
    //       setTrackState((ps) => {
    //         return { ...ps, video: !ps.video };
    //       });
    //     }
    //   };
    
    //   const leaveChannel = async () => {
    //     await client.leave();
    //     client.removeAllListeners();
    //     tracks[0].close();
    //     tracks[1].close();
    //     setStart(false);
    //     setInCall(false);
    //   };
    
    //   return (
    //     <div className="controls">
    //       <p className={trackState.audio ? "on" : ""}
    //         onClick={() => mute("audio")}>
    //         {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
    //       </p>
    //       <p className={trackState.video ? "on" : ""}
    //         onClick={() => mute("video")}>
    //         {trackState.video ? "MuteVideo" : "UnmuteVideo"}
    //       </p>
    //       {<p onClick={() => leaveChannel()}>Leave</p>}
    //     </div>
    //   );
    // };

    // const ChannelForm = ({setInCall, setChannelName}) => {
  
    //   return (
    //     <form className="join">
    //     {config.appId === '' && <p style={{color: 'red'}}>Please enter your Agora App ID in App.tsx and refresh the page</p>}
    //       <input type="text"
    //         placeholder="Enter Channel Name"
    //         onChange={(e) => setChannelName(e.target.value)}
    //       />
    //       <button onClick={(e) => {
    //         e.preventDefault();
    //         setInCall(true);
    //       }}>
    //         Join
    //       </button>
    //     </form>
    //   );
    // };
    