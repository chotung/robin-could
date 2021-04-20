import { useEffect, useState } from "react";
import key from "../../secrets";
export default function LiveFeedPage() {
  const [test, setTest] = useState({});
  const ws = new WebSocket("ws://echo.websocket.org");
  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      setTest({ dataFromServer: message });
      console.log(message);
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
  }, []);

  return <div>Live Feed</div>;
}
