import { chain } from "lodash";
import { useEffect, useState } from "react";
import localstore from "./localstore";

const useConfData = () => {
  const [eventData, setEventData] = useState(null as any);
  const [talks, setTalks] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    localstore.getConf().then(data => {
      setEventData(data);
    });
    localstore.getTalks().then(data => setTalks(data));
    localstore.getRooms().then(data => setRooms(data));
  }, [localstore, setEventData, setTalks, setRooms]);

  const talksGroupBySlotStart = chain(talks)
    .sortBy(talk => talk.slot.start)
    .groupBy(talk => talk.slot.start)
    .value();

  return { eventData, talks, rooms, talksGroupBySlotStart };
};

export default useConfData;
