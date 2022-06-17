
import dynamic from "next/dynamic";

const ClientSideControls = dynamic(
  () => {
    return import("../components/VideoConferencing.js");
  },
  { ssr: false }
);


export default function Home() {
  return (
    <div className={"container"}>
      {/* <Login /> */}
      <ClientSideControls />
    </div>
  )
}
